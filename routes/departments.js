var express = require('express');
var sqlm = require('../SQLManager.js')

var router = express.Router()


// DEPARTMENTS

// get departments
router.get('/', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from DEPARTMENT', function (result) {
        res.send(result)
    });
})

// create department
router.post('/createdepartment', function (req, res) {

    var body = req.body

    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(
        connection,
        'select * from DEPARTMENT',
        function (result) {

            var deptId = result.length

            // new connection because old connection ended from getting employee count
            var connection = sqlm.createSQLConnection();
            sqlm.executeSQLQuery(
                connection,
                `INSERT INTO DEPARTMENT (DeptID, DName) VALUES (${deptId}, "${body['name']}")`,
                function (result) {
                    if (result.hasOwnProperty('code')) {
                        res.send({ 'code': 421, 'message': 'Creating department failed. Please message administrator.' });
                        return;
                    }

                    body.deptId = deptId;
        
                    res.send({
                        'code': 221,
                        'message': 'Successfully created department.',
                        'data': body
                    });
                }
            );
        }
    )
})

// get all rooms
router.get('/rooms', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from ROOM', function (result) {
        res.send(result)
    });
})

// get rooms for given department
router.get('/department/:id', function (req, res) {
    var deptId = req.params.id

    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(
        connection,
        `select * from vwROOM_DETAILS where DeptID=${deptId}`,
        function (result) {
            res.send(result)
        }
    )
})

// create room
router.post('/createroom', function (req, res) {

    var body = req.body

    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(
        connection,
        `select * from ROOM where DeptID=${body['department']}`,
        function (result) {

            var roomNo = result.length

            // new connection because old connection ended from getting employee count
            var connection = sqlm.createSQLConnection();
            sqlm.executeSQLQuery(
                connection,
                `INSERT INTO ROOM (RoomNo, DeptID) VALUES (${(body['department'] * 100) + roomNo}, ${body['department']})`,
                function (result) {
                    if (result.hasOwnProperty('code')) {
                        res.send({ 'code': 431, 'message': 'Creating room failed. Please message administrator.' });
                        return;
                    }

                    body.room = (body['department'] * 100) + roomNo
        
                    res.send({
                        'code': 231,
                        'message': 'Successfully created room.',
                        'data': body
                    });
                }
            );
        }
    )
})


// BEDS

// get all beds
router.get('/beds', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select * from BED', function (result) {
        res.send(result)
    });
})

// get available beds
router.get('/availablebeds', function (req, res) {
    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(connection, 'select b.* from BED b LEFT JOIN ADMISSION a ON b.BedNo = a.AssignedBed WHERE a.AssignedBed IS NULL', function (result) {
        res.send(result)
    });
})

// get beds for given room number
router.get('/beds/:rno', function (req, res) {
    var roomNo = req.params.rno

    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(
        connection,
        `select * from BED where RoomNo=${roomNo}`,
        function (result) {
            res.send(result)
        }
    )
})

// create bed
router.post('/createbed', function (req, res) {

    var body = req.body

    var connection = sqlm.createSQLConnection();
    sqlm.getSQLQuery(
        connection,
        `select * from BED`,
        function (result) {

            var bedNo = result.length

            // new connection because old connection ended from getting employee count
            var connection = sqlm.createSQLConnection();
            sqlm.executeSQLQuery(
                connection,
                `INSERT INTO BED (BedNo, RoomNo) VALUES (${bedNo}, ${body['room']})`,
                function (result) {
                    if (result.hasOwnProperty('code')) {
                        res.send({ 'code': 441, 'message': 'Creating bed failed. Please message administrator.' });
                        return;
                    }

                    body.bed = bedNo
        
                    res.send({
                        'code': 241,
                        'message': 'Successfully created bed.',
                        'data': body
                    });
                }
            );
        }
    )
})

// move bed
router.post('/movebed', function (req, res) {

    var body = req.body

    var connection = sqlm.createSQLConnection();
    
    sqlm.executeSQLQuery(
        connection,
        `UPDATE BED SET RoomNo=${body['room']} where BedNo=${body['bed']}`,
        function (result) {
            if (result.hasOwnProperty('code')) {
                res.send({ 'code': 442, 'message': 'Failed to move bed. Please message administrator.' });
                return;
            }

            res.send({
                'code': 242,
                'message': 'Successfully moved bed.',
                'data': body
            });
        }
    )
})

// delete bed
router.post('/deletebed', function (req, res) {
    var body = req.body

    var connection = sqlm.createSQLConnection();
    
    sqlm.executeSQLQuery(
        connection,
        `DELETE FROM BED where BedNo=${body['bed']}`,
        function (result) {
            if (result.hasOwnProperty('code')) {
                res.send({ 'code': 443, 'message': 'Failed to delete bed. Please message administrator.' });
                return;
            }

            res.send({
                'code': 243,
                'message': 'Successfully deleted bed.',
                'data': body
            });
        }
    )
})

module.exports = router;