const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const employeeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required:true
    },
    department: {
        type: String,
        required: true
    },
    manager:{
        type: String
    }
})

employeeSchema.plugin(passportLocalMongoose);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;