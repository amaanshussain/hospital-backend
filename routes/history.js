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
    sqlm.getSQLQuery(connection, 'select * from vwAPPOINTMENT', function (result) {
        res.send(result)
    });
})

router.get('/admissions', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from vwADMISSION', function (result) {
        res.send(result)
    });
})

router.get('/currentadmissions', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from vwADMISSION where DischargeDate is null', function (result) {
        res.send(result)
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