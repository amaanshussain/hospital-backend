var express = require('express');
var sqlm = require('../SQLManager.js')
require('dotenv').config() // load .env file into process

var router = express.Router()

router.get('/employees', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from EMPLOYEE', function (result) {
        res.send(result);
    });
})

router.get('/employees/:id', function (req, res) {
    
    var employee_id = req.params['id']
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from EMPLOYEE where EmployeeID=' + employee_id, function (result) {
        res.send(result);
    });
})

router.get('/admins', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from EMPLOYEE e, ADMIN a where e.EmployeeID=a.EmployeeID', function (result) {
        res.send(result);
    });
})

router.get('/doctors', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from EMPLOYEE e, DOCTOR d where e.EmployeeID=d.EmployeeID', function (result) {
        res.send(result);
    });
})

router.get('/doctors/:id', function (req, res) {
    var doctor_id = req.params['id']
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from EMPLOYEE e JOIN DOCTOR d ON e.EmployeeID = d.EmployeeID WHERE d.EmployeeID=' + doctor_id, function (result) {
        res.send(result);
    });
})

router.get('/doctors/:id/patients', function (req, res) {
    var doctor_id = req.params['id']
    var connection = sqlm.createSQLConnection('select * from ');
    sqlm.getSQLQuery(connection, 'select p.* from vwPATIENTDOCTOR pd JOIN PATIENT p ON pd.PatientID = p.PatientID WHERE DoctorID=' + doctor_id, function (result) {
        res.send(result);
    });
})

router.get('/nurses', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from EMPLOYEE e, NURSE n where e.EmployeeID=n.EmployeeID', function (result) {
        res.send(result);
    });
})

router.get('/pharmacists', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from EMPLOYEE e, PHARMACIST p where e.EmployeeID=p.EmployeeID', function (result) {
        res.send(result);
    });
})


module.exports = router;