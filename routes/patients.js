var express = require('express');
var sqlm = require('../SQLManager.js')
require('dotenv').config() // load .env file into process

var router = express.Router()

router.get('/', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from PATIENT', function (result) {
        res.send(result)
    });
})

router.post('/create', function (req, res) {
    const body = req.body;
    console.log(body)
    console.log(typeof(body.birthDate))
    if (!body.mInit) {
        body.mInit = ''
    }
    body.birthDate = body.birthDate.split("T")[0]

    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(
        connection,
        'select * from PATIENT',
        function (result) {
            var patientID = result.length
            console.log(patientID)

            // new connection because old connection ended from getting employee count
            var connection = sqlm.createSQLConnection();
            sqlm.executeSQLQuery(
                connection,
                `INSERT INTO PATIENT (PatientID, FName, MInit, LName, BirthDate, Sex, ContactNo) VALUES (${patientID}, "${body['fName']}", "${body['mInit']}", "${body['lName']}", DATE '${body['birthDate']}', "${body['sex']}", "${body['contactNo']}")`,
                function (result) {
                    if (result.hasOwnProperty('code')) {
                        res.send({ 'code': 403, 'message': 'Creating user failed. Please message administrator.' });
                        return;
                    }
                    body.PatientID = patientID;
        
                    res.send(body);
                }
            );
        }
    )
})

router.post('/update', function (req, res) {
    const body = req.body;
    if (!body.mInit) {
        body.mInit = ''
    }
    body.birthDate = body.birthDate.split("T")[0];

    var connection = sqlm.createSQLConnection();
    sqlm.executeSQLQuery(connection, `UPDATE PATIENT SET FName='${body.fName}', MInit='${body.mInit}', LName='${body.lName}', BirthDate= CAST('${body.birthDate}' AS DATETIME), Sex='${body.sex}', ContactNo="${body.contactNo}" WHERE PatientID=${body.patientID}`, function (result) {
        console.log(result)
        res.send(body)
    })
})

router.post('/delete', function (req, res) {
    const body = req.body;
    
    var connection = sqlm.createSQLConnection();
    sqlm.executeSQLQuery(connection, 'DELETE FROM PATIENT WHERE PatientID=' + body.PatientID, function (result) {
        res.send(result);
    })
})


router.get('/:id', function (req, res) {
    var patient_id = req.params['id']
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from PATIENT where PatientID=' + patient_id, function (result) {
        res.send(result)
    });
})

router.get('/:id/history', function (req, res) {
    var patient_id = req.params['id']
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from HISTORY where PatientID=' + patient_id, function (result) {
        res.send(result)
    });
})

router.get('/:id/appointments', function (req, res) {
    var patient_id = req.params['id'];
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from vwPATIENT_APPOINTMENTS WHERE PatientID=' + patient_id, function (result) {
        res.send(result)
    });
})

router.get('/:id/prescriptions', function (req, res) {
    var patient_id = req.params['id'];
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from vwPATIENT_PRESCRIPTIONS WHERE PatientID=' + patient_id, function (result) {
        res.send(result)
    });
})

router.get('/:id/exams', function (req, res) {
    var patient_id = req.params['id'];
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from vwPATIENT_EXAMS where PatientID=' + patient_id, function (result) {
        res.send(result)
    });
})

router.get('/:id/invoices', function (req, res) {
    var patient_id = req.params['id'];
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from vwPATIENT_INVOICES WHERE PatientID=' + patient_id, function (result) {
        res.send(result)
    });
})

router.get('/:id/admissions', function (req, res) {
    var patient_id = req.params['id'];
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from vwPATIENT_ADMISSIONS WHERE PatientID=' + patient_id, function (result) {
        res.send(result)
    });
})

router.get('/:id/doctors', function (req, res) {
    var patient_id = req.params['id'];
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select e.* from vwPATIENTDOCTOR pd JOIN EMPLOYEE e ON pd.DoctorID = e.EmployeeID WHERE PatientID=' + patient_id, function (result) {
        res.send(result)
    });
})

router.get('/balances', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from vwPATIENT_BALANCES', function (result) {
        res.send(result)
    });
})

router.get('/appointments', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from vwPATIENT_APPOINTMENTS', function (result) {
        res.send(result)
    });
})

router.get('/admissions', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from vwPATIENT_ADMISSIONS', function (result) {
        res.send(result)
    });
})

router.get('/invoices', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from vwPATIENT_INVOICES', function (result) {
        res.send(result)
    });
})

router.get('/currentadmissions', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from vwCURRENT_ADMISSIONS', function (result) {
        res.send(result)
    });
})

module.exports = router;