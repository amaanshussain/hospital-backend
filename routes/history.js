var express = require('express');
var sqlm = require('../SQLManager.js');
require('dotenv').config()

var router = express.Router()

router.get('/', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from HISTORY', function (result) {
        res.send(result)
    });
})

router.get('/appointments', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select a.*, h.PatientID, h.CreationDate from APPOINTMENT a JOIN HISTORY h ON a.HistoryID = h.HistoryID', function (result) {
        res.send(result)
    });
})

router.get('/admissions', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select a.*, h.PatientID, h.CreationDate from ADMISSION a JOIN HISTORY h ON a.HistoryID = h.HistoryID', function (result) {
        res.send(result)
    });
})

router.get('/currentadmissions', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select a.*, h.PatientID, h.CreationDate from ADMISSION a JOIN HISTORY h ON a.HistoryID = h.HistoryID WHERE DischargeDate is null', function (result) {
        res.send(result)
    });
})

router.post('/admit', function (req, res) {
    const body = req.body;

    body.creationDate = body.creationDate.split("T")[0];
    body.admissionDate = body.admissionDate.split("T")[0];

    // get next history id
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'SELECT MAX(HistoryID) as MaxHistoryId FROM HISTORY', function (result) {
        var historyID = result[0].MaxHistoryId + 1;
        
        // create history record
        var connection = sqlm.createSQLConnection();
        sqlm.executeSQLQuery(connection, `INSERT INTO HISTORY(HistoryID, PatientID, CreationDate) VALUES (${historyID}, ${body.patientID}, CAST('${body.creationDate}' AS DATETIME))`, function (result) {
            
            // create admission record
            var connection = sqlm.createSQLConnection();
            sqlm.executeSQLQuery(connection, `INSERT INTO ADMISSION(HistoryID, AdmissionDate, AssignedBed, DischargeDate) VALUES (${historyID}, CAST('${body.admissionDate}' AS DATETIME), ${body.assignedBed}, null)`, function (result) {
                res.send(result)
            });
        }); 
    });   
})

router.post('/discharge', function (req, res) {
    const body = req.body;

    body.dischargeDate = body.dischargeDate.split("T")[0];

    var connection = sqlm.createSQLConnection();
    sqlm.executeSQLQuery(connection, `UPDATE ADMISSION SET DischargeDate=CAST('${body.dischargeDate}' AS DATETIME) WHERE HistoryID=${body.historyID}`, function (result) {
        res.send(result);
    })
})

module.exports = router;