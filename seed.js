const mongoose = require('mongoose');
const employeeModel = require('./models/employee');

const employees = [
    {
        username: "Sloan, Constance",
        designation: "Chief Executive Officer",
        department: "CEO",
        manager: ""
    },
    {
        username: "Adinolfi, Wilson K",
        designation: "Technical Support Engineer",
        department: "Tech Support",
        manager: "Rhoads, Thomas"
    },
    {
        username: "Ait Sidi, Karthikeyan",
        designation: "Technical Support Engineer",
        department: "Tech Support",
        manager: "Rhoads, Thomas"
    },
    {
        username: "Ozark, Travis",
        designation: "Senior Technical Support Engineer",
        department: "Tech Support",
        manager: "Rhoads, Thomas"
    },
    {
        username: "Rhoads, Thomas",
        designation: "Manager Technical Support",
        department: "Tech Support",
        manager: "Newman, Richard"
    },
    {
        username: "Newman, Richard",
        designation: "Senior Manager Technical Support",
        department: "Tech Support",
        manager: "Sloan, Constance"
    },
    {
        username: "Morway, Tanya",
        designation: "Software Engineer",
        department: "Tech",
        manager: "Jacobi, Hannah"
    },
    {
        username: "Lynch, Lindsay",
        designation: "Senior Software Engineer",
        department: "Tech",
        manager: "Jacobi, Hannah"
    },
    {
        username: "Jacobi, Hannah",
        designation: "Lead Software Engineer",
        department: "Tech",
        manager: "Gill, Whitney"
    },
    {
        username: "Gill, Whitney",
        designation: "Manager Software Department",
        department: "Tech",
        manager: "Sloan, Constance"
    },
    {
        username: "Vega, Vincent",
        designation: "Business associate",
        department: "BUSINESS AND SALES",
        manager: "Williams, Jacquelyn"
    },
    {
        username: "Williams, Jacquelyn",
        designation: "Business executive",
        department: "BUSINESS AND SALES",
        manager: "Stansfield, Norman"
    },
    {
        username: "Ruiz, Ricardo",
        designation: "Business executive",
        department: "BUSINESS AND SALES",
        manager: "Stansfield, Norman"
    },
    {
        username: "Stansfield, Norman",
        designation: "Manager business and Sales",
        department: "BUSINESS AND SALES",
        manager: "Sloan, Constance"
    }
]

const seedDB = async () => {

    for(var i = 0 ; i<employees.length ; i++)
    {
        await employeeModel.register(employees[i],"123");
    }
    
    console.log("Db Seeded");
}

module.exports = seedDB;