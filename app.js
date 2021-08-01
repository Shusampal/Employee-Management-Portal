const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');
const employeeModel = require('./models/employee');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const seedDB = require('./seed');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.use(express.static(path.join(__dirname,'static')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session());



passport.use(new LocalStrategy(employeeModel.authenticate()));


passport.serializeUser(employeeModel.serializeUser());
passport.deserializeUser(employeeModel.deserializeUser());


mongoose.connect('mongodb://127.0.0.1:27017/pharma', { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Db Connected");
        // seedDB();
    })
    .catch((e) => {
        console.log("Some Error Happened : ", e.message);
    })





app.get('/',(req,res)=>{
    try {
        res.render('login');
    } catch (error) {
        res.render('error',{error:error});
    }
})




app.post('/login', passport.authenticate('local', {
    failureRedirect: '/'
}), (req, res) => {
    try {
        
        res.redirect('/employees');

    } catch (error) {
        res.render('error', { error: error });
    }
})



var ceo = 0;
var tech_support = 5;
var dev = 9;

app.get('/employees', async (req, res) => {
    try {

        
        const employees = await employeeModel.find({});
        res.render('employees', { employees: employees, ceo: ceo, tech_support: tech_support, dev: dev});
    } catch (error) {
        res.render('error', { error: error });
    }
})


app.get('/employees/:id', async (req, res) => {

    try {
        const employee = await employeeModel.findById(req.params.id);
        res.render('show', { employee: employee});
    } catch (error) {
        res.render('error', { error: error });
    }

})




app.get('/employees/:id/edit', async (req, res) => {

    try {

        const employee = await employeeModel.findById(req.params.id);
        res.render('edit', { employee: employee});
    } catch (error) {
        res.render('error', { error: error });
    }

})


app.post('/employees/:id', async (req, res) => {

    try {

        await employeeModel.findByIdAndUpdate(req.params.id,req.body);
        res.redirect(`/employees/${req.params.id}`);
    } catch (error) {
        res.render('error', { error: error });
    }

})






app.delete('/employees/:id', async (req, res) => {

    try {

        const employee = await employeeModel.findById(req.params.id);
        await employeeModel.findByIdAndDelete(req.params.id);
        if(employee.designation === "CEO")
        {
            ceo--;
            tech_support--;
            dev--;

        }
        else if (employee.designation.includes("Technical Support"))
        {
            tech_support--;
            dev--;
        }
        else if (employee.designation.includes("Software"))
        {
            dev--;
        }
        res.redirect("/employees");
    } catch (error) {
        res.render('error', { error: error });
    }

})







app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
})