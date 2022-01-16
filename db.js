var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'node'
});

connection.connect((err)=>{
    if(err) throw err;
    console.log('Database Connected..')
});

module.exports = connection;