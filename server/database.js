const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin'
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Function to create the database if it doesn't exist
function createDatabase(callback) {
    const databaseName = 'crud';
    const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;

    con.query(createDatabaseQuery, function(err, result) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            console.log("Database created or already exists");
            // Change the user connection to use the created database
            con.changeUser({ database: databaseName }, function(err) {
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    console.log("Connected to database: " + databaseName);
                    callback(null);
                }
            });
        }
    });
}

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

// POST endpoint for inserting data into the "donar" table
app.post('/donar', function(req, res) {
    createDatabase(function(err) {
        if (err) {
            res.status(500).send("Error creating database");
            return;
        }

        createDonarTable(function(err) {
            if (err) {
                res.status(500).send("Error creating table");
                return;
            }

            const { indianCitizen, fullName, email, gender, amount, age, contact, address, city, panCard } = req.body;
            const insertQuery = `INSERT INTO donar (indianCitizen, fullName, email, gender, amount, age, contact, address, city, panCard) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [indianCitizen, fullName, email, gender, amount, age, contact, address, city, panCard];

            con.query(insertQuery, values, function(err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error inserting data");
                } else {
                    console.log("1 record inserted");
                    res.status(201).send("Record inserted successfully");
                }
            });
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
