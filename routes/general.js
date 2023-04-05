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

router.get('/departments', function (req, res) {
    var connection = createSQLConnection();
    getSQLQuery(connection, res, 'select * from DEPARTMENT');
})




module.exports = router;