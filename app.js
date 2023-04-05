var express = require('express');
var sql = require('mysql')
require('dotenv').config() // load .env file into process

// routes for endpoints
const staff = require('./routes/staff.js')
const general = require('./routes/general.js')
const patients = require('./routes/patients.js')

var app = express();

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

// add routes to express app
app.use('/api/general', general)
app.use('/api/staff', staff)
app.use('/api/patients', patients)


app.get('/', function (req, res) {

    var connection = createSQLConnection();

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);
        res.send('connected as id ' + connection.threadId)

        connection.end()
    });

});


var server = app.listen(6969, function () {
    console.log('Server is running..');
});

