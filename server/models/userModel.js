// models/userModel.js
const con = require('../config/db');
const randomstring = require('randomstring');

// Function to create the user table if it doesn't exist
function createUserTable(callback) {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) UNIQUE,
            otp VARCHAR(6),
            is_verified BOOLEAN DEFAULT false
        )
    `;

    con.query(createTableQuery, function(err, result) {
        if (err) {
            console.error('Error creating user table:', err);
            callback(err);
        } else {
            console.log('User table created or already exists');
            callback(null);
        }
    });
}

// Function to register a new user
function registerUser(email, callback) {
    const otp = randomstring.generate({ length: 6, charset: 'numeric' });
    const user = { email, otp };

    con.query('INSERT INTO users SET ?', user, function(error, results, fields) {
        if (error) {
            console.error('Error registering user:', error);
            callback(error);
        } else {
            callback(null, otp);
        }
    });
}

// Function to verify user email
function verifyUser(email, otp, callback) {
    con.query('SELECT * FROM users WHERE email = ?', [email], function(error, results, fields) {
        if (error) {
            console.error('Error verifying user:', error);
            callback(error);
        } else {
            if (results.length > 0) {
                const user = results[0];
                if (user.otp === otp) {
                    con.query('UPDATE users SET is_verified = true WHERE email = ?', [email], function(error, results, fields) {
                        if (error) {
                            console.error('Error updating user verification status:', error);
                            callback(error);
                        } else {
                            callback(null, 'Email verified successfully.');
                        }
                    });
                } else {
                    callback('Invalid OTP.');
                }
            } else {
                callback('User not found.');
            }
        }
    });
}

module.exports = { createUserTable, registerUser, verifyUser };
