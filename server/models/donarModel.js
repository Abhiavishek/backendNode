// models/donarModel.js
const con = require('../config/db');

// Function to create the "donar" table if it doesn't exist
function createDonarTable(callback) {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS donar (
        id INT AUTO_INCREMENT PRIMARY KEY,
        indianCitizen BOOLEAN,
        fullName VARCHAR(255),
        email VARCHAR(255),
        gender ENUM('male', 'female', 'other'),
        amount DECIMAL(10, 2),
        age INT,
        contact VARCHAR(20),
        address VARCHAR(255),
        city VARCHAR(100),
        panCard VARCHAR(20)
    )`;

    con.query(createTableQuery, function(err, result) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            console.log("Table created or already exists");
            callback(null);
        }
    });
}

// Function to insert data into the "donar" table
function insertDonar(data, callback) {
    const { indianCitizen, fullName, email, gender, amount, age, contact, address, city, panCard } = data;
    const insertQuery = `INSERT INTO donar (indianCitizen, fullName, email, gender, amount, age, contact, address, city, panCard) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [indianCitizen, fullName, email, gender, amount, age, contact, address, city, panCard];

    con.query(insertQuery, values, function(err, result) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            console.log("1 record inserted");
            callback(null, result);
        }
    });
}

module.exports = { createDonarTable, insertDonar };
