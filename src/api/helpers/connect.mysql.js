var mysql = require('mysql2');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'aaaa1111',
    database : 'kltn_qlbh'
});
// connect to database
connection.connect(function(err) {
    if (err) {
        console.log("throw err:::", err);
    }
    console.log("Connected!");
});

module.exports = connection;