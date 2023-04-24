var express = require('express');
var sqlm = require('../SQLManager.js')
require('dotenv').config() // load .env file into process

var router = express.Router()

// login endpoint
router.post('/', function (req, res) {
    const body = req.body

    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(
        connection,
        // 'select * from EMPLOYEE where LoginUser="' + body['username'] + '" and LoginPass="' + body['password'] + '"',
        sqlm.prepare_bind("select * from EMPLOYEE where LoginUser=? and LoginPass=?", [body.username, body.password]),
        function (result) {

            if (result.length == 0) {
                console.log("signin error");
                res.status(404).send({ 'code': 401, 'error': 'Invalid Login, please try again.' });
                return;
            }
            res.cookie('user', result[0]['EmployeeID'])

            delete result[0].LoginUser
            delete result[0].LoginPass

            res.send({
                'code': 201,
                'message': 'Successfully logged in.',
                'data': result[0]
            })
        });
})

// logout endpoint
router.post('/logout', function (req, res) {
    res.clearCookie('user')
    res.send({ 'code': 202, 'message': 'Successfully logged out.' })
})

// create user endpoint
router.post('/create', function (req, res) {
    body = req.body
    // fName: string
    // mInit: string
    // lName: string
    // deptId: number
    // username: string
    // password: string

    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(
        connection,
        'select * from EMPLOYEE',
        function (result) {
            var employeeID = result.length

            for (let i = 0; i < result.length; i++) {
                const employee = result[i];
                if (body['username'] == employee.LoginUser) {
                    res.status(410).send({ 'code': 410, 'message': 'Creating user failed. Username already exists.' });
                    return;
                }
            }

            // new connection because old connection ended from getting employee count
            var connection = sqlm.createSQLConnection();
            sqlm.executeSQLQuery(
                connection,
                `INSERT INTO EMPLOYEE (EmployeeID, FName, MInit, LName, DeptID, LoginUser, LoginPass) VALUES (${employeeID}, "${body['fName']}", "${body['mInit']}", "${body['lName']}", ${body['deptId']}, "${body['username']}", "${body['password']}")`,
                function (result) {
                    if (result.hasOwnProperty('code')) {
                        res.send({ 'code': 403, 'message': 'Creating user failed. Please message administrator.' });
                        return;
                    }

                    delete body.username;
                    delete body.password;
                    body.EmployeeID = employeeID;
        
                    res.send({
                        'code': 203,
                        'message': 'Successfully created user.',
                        'data': body
                    });
                }
            );
        }
    )
})



module.exports = router;