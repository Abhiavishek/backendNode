// models/userModel.js
const con = require('../config/db');
const randomstring = require('randomstring');

// Function to create the user table if it doesn't exist
async function createUserTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) UNIQUE,
            otp VARCHAR(6),
            is_verified BOOLEAN DEFAULT false
        )
    `;
    try {
        await con.query(createTableQuery);
        console.log('User table created or already exists');
    } catch (err) {
        console.error('Error creating user table:', err);
        throw err; // Rethrowing the error to be handled by the caller
    }
}

// Function to register a new user
async function registerUser(email) {
    const otp = randomstring.generate({ length: 6, charset: 'numeric' });
    const user = { email, otp };
    try {
        await con.query('INSERT INTO users SET ?', user);
        return otp;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // Rethrowing the error to be handled by the caller
    }
}

// Function to verify user email
async function verifyUser(email, otp) {
    try {
        const [results] = await con.query('SELECT * FROM users WHERE email = ?', [email]);
        if (results.length > 0) {
            const user = results[0];
            if (user.otp === otp) {
                await con.query('UPDATE users SET is_verified = true WHERE email = ?', [email]);
                return 'Email verified successfully.';
            } else {
                throw new Error('Invalid OTP.');
            }
        } else {
            throw new Error('User not found.');
        }
    } catch (error) {
        console.error('Error verifying user:', error);
        throw error; // Rethrowing the error to be handled by the caller
    }
}

async function fetchEmailByUserId(userId) {
    try {
        const [results] = await con.query('SELECT email FROM users WHERE id = ?', [userId]);
        if (results.length > 0) {
            return results[0].email;
        } else {
            throw new Error('User not found.');
        }
    } catch (error) {
        console.error('Error fetching email:', error);
        throw error; // Rethrowing the error to be handled by the caller
    }
}

module.exports = { createUserTable, registerUser, verifyUser, fetchEmailByUserId };
