var express = require('express');
var sql = require('mysql')
require('dotenv').config() // load .env file into process

var router = express.Router()

function createSQLConnection() {
    // return a sql connection from values in .env file
    return sql.createConnection({
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });
}
function getSQLQuery(connection, res, query) {
    // execute a sql query and send result as response to the caller
    connection.query(query, function (error, results, fields) {

        if (error) {
            res.send(error)
        }

        let patients = Object.values(JSON.parse(JSON.stringify(results)));
        res.send(patients);
        connection.end()
    });
}

router.get('/employees', function (req, res) {
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from EMPLOYEE');
})

router.get('/employees/:id', function (req, res) {
    
    var employee_id = req.params['id']
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from EMPLOYEE where EmployeeID=' + employee_id);
})

router.get('/admins', function (req, res) {
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from EMPLOYEE e, ADMIN a where e.EmployeeID=a.EmployeeID');
})

router.get('/doctors', function (req, res) {
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from EMPLOYEE e, DOCTOR d where e.EmployeeID=d.EmployeeID');
})

router.get('/doctors/:id', function (req, res) {
    var doctor_id = req.params['id']
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from EMPLOYEE e JOIN DOCTOR d ON e.EmployeeID = d.EmployeeID WHERE d.EmployeeID=' + doctor_id);
})

router.get('/doctors/:id/patients', function (req, res) {
    var doctor_id = req.params['id']
    var connection = createSQLConnection('select * from ');
    getSQLQuery(connection, res, 'select p.* from vwPATIENTDOCTOR pd JOIN PATIENT p ON pd.PatientID = p.PatientID WHERE DoctorID=' + doctor_id);
})

router.get('/nurses', function (req, res) {
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from EMPLOYEE e, NURSE n where e.EmployeeID=n.EmployeeID');
})

router.get('/pharmacists', function (req, res) {
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from EMPLOYEE e, PHARMACIST p where e.EmployeeID=p.EmployeeID');
})


module.exports = router;