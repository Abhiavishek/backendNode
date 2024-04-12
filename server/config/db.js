// config/db.js
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'crud' // Specify the database name
});

module.exports = con;
