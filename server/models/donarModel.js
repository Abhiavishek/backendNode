// models/donarModel.js
const con = require('../config/db');

// Function to create the "donar" table if it doesn't exist
async function createDonarTable() {
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

    try {
        await con.query(createTableQuery);
        console.log("Table created or already exists");
    } catch (err) {
        console.log("Error creating table:", err);
        throw err;  // Throwing the error to be handled by the caller
    }
}

// Function to insert data into the "donar" table
async function insertDonar(data) {
    const { indianCitizen, fullName, email, gender, amount, age, contact, address, city, panCard } = data;
    const insertQuery = `INSERT INTO donar (indianCitizen, fullName, email, gender, amount, age, contact, address, city, panCard) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [indianCitizen, fullName, email, gender, amount, age, contact, address, city, panCard];

    try {
        const result = await con.query(insertQuery, values);
        console.log("1 record inserted");
        return result;
    } catch (err) {
        console.log("Error inserting record:", err);
        throw err;  // Throwing the error to be handled by the caller
    }
}

module.exports = { createDonarTable, insertDonar };
