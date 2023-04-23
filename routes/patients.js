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

router.get('/', function (req, res) {
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from PATIENT');
})

router.get('/:id', function (req, res) {
    var patient_id = req.params['id']
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from PATIENT where PatientID=' + patient_id);
})

router.get('/:id/history', function (req, res) {
    var patient_id = req.params['id']
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from HISTORY where PatientID=' + patient_id);
})

router.get('/:id/appointments', function (req, res) {
    var patient_id = req.params['id'];
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from vwPATIENT_APPOINTMENTS WHERE PatientID=' + patient_id);
})

router.get('/:id/prescriptions', function (req, res) {
    var patient_id = req.params['id'];
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from vwPATIENT_PRESCRIPTIONS WHERE PatientID=' + patient_id);
})

router.get('/:id/exams', function (req, res) {
    var patient_id = req.params['id'];
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from vwPATIENT_EXAMS WHERE PatientID=' + patient_id);
})

router.get('/:id/invoices', function (req, res) {
    var patient_id = req.params['id'];
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from vwPATIENT_INVOICES WHERE PatientID=' + patient_id);
})

router.get('/:id/admissions', function (req, res) {
    var patient_id = req.params['id'];
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from vwPATIENT_ADMISSIONS WHERE PatientID=' + patient_id);
})

router.get('/:id/doctors', function (req, res) {
    var patient_id = req.params['id'];
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select e.* from vwPATIENTDOCTOR pd JOIN EMPLOYEE e ON pd.DoctorID = e.EmployeeID WHERE PatientID=' + patient_id);
})

router.get('/balances', function (req, res) {
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from vwPATIENT_BALANCES');
})

router.get('/appointments', function (req, res) {
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from vwPATIENT_APPOINTMENTS')
})

router.get('/admissions', function (req, res) {
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from vwPATIENT_ADMISSIONS')
})

router.get('/invoices', function (req, res) {
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from vwPATIENT_INVOICES')
})

router.get('/currentadmissions', function (req, res) {
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from vwCURRENT_ADMISSIONS');
})

module.exports = router;