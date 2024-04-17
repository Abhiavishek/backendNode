const mysql = require('mysql2');

// Using createPool for better performance in a production environment
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'crud', // Specify the database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Export the pool's promise interface
module.exports = pool.promise();
