var sql = require('mysql')
require('dotenv').config() // load .env file into process

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
function getSQLQuery(connection, query, callback) {
    // execute a sql query and send result as response to the caller
    connection.query(query, function (error, results, fields) {
        if (error) {
            callback(error)
        }
        let parsedQuery = Object.values(JSON.parse(JSON.stringify(results)));
        connection.end()
        callback(parsedQuery)
    });
}
function executeSQLQuery(connection, query, callback) {
    // execute a sql query and send result as response to the caller
    connection.query(query, function (error, results, fields) {
        if (error) {
            callback(error)
            return
        }
        callback(results)
    })
}

function escapeInput(input) {
    console.log(input)
    var escapedInput = sql.escape(input);
    escapedInput = escapedInput.split("\'")[1]
    return escapedInput;
}

module.exports = { createSQLConnection, getSQLQuery, executeSQLQuery, escapeInput };