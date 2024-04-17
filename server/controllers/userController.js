// controllers/userController.js
const userModel = require('../models/userModel');
const transporter = require('../config/nodemailer'); // Import nodemailer transporter
const { Email } = require('../env.js');

// Controller function for user registration
async function registerUser(req, res) {
    const { email } = req.body;

    try {
        const otp = await userModel.registerUser(email);

        // Send OTP to user's email
        const mailOptions = {
            from: Email,
            to: email,
            subject: 'Email Verification OTP',
            text: `Your OTP for email verification is: ${otp}`
        };

        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully.');
        res.status(200).send('OTP sent successfully.');
    } catch (error) {
        if (error.response) {
            console.error('Error sending OTP:', error);
            res.status(500).send('Failed to send OTP.');
        } else {
            console.error('Error registering user:', error);
            res.status(500).send('Failed to register user.');
        }
    }
}

// Controller function for verifying user email
async function verifyUser(req, res) {
    const { email, otp } = req.body;

    try {
        const result = await userModel.verifyUser(email, otp);
        res.status(200).send(result);
    } catch (error) {
        console.error('Error verifying user:', error);
        res.status(500).send(error);
    }
}

async function fetchEmailByUserId(req, res) {
    const { userId } = req.params; // assuming userId is sent as a URL parameter

    try {
        const email = await userModel.fetchEmailByUserId(userId);
        if (email) {
            res.status(200).send({ email });
        } else {
            res.status(404).send('No user found with the given ID.');
        }
    } catch (error) {
        console.error('Error fetching email:', error);
        res.status(500).send(error);
    }
}

module.exports = { registerUser, verifyUser, fetchEmailByUserId };
