// controllers/userController.js
const userModel = require('../models/userModel');
const nodemailer = require('nodemailer');
const { Email, pass } = require('../env.js');

// Initialize nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: Email, // Change this to your Gmail address
        pass: pass // Change this to your Gmail password
    }
});

// Controller function for user registration
function registerUser(req, res) {
    const { email } = req.body;

    userModel.registerUser(email, (error, otp) => {
        if (error) {
            console.error('Error registering user:', error);
            res.status(500).send('Failed to register user.');
            return;
        }

        // Send OTP to user's email
        const mailOptions = {
            from: 'shownothing925@gmail.com',
            to: email,
            subject: 'Email Verification OTP',
            text: `Your OTP for email verification is: ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending OTP:', error);
                res.status(500).send('Failed to send OTP.');
                return;
            }
            console.log('OTP sent successfully.');
            res.status(200).send('OTP sent successfully.');
        });
    });
}

// Controller function for verifying user email
function verifyUser(req, res) {
    const { email, otp } = req.body;

    userModel.verifyUser(email, otp, (error, result) => {
        if (error) {
            console.error('Error verifying user:', error);
            res.status(500).send(error);
            return;
        }
        res.status(200).send(result);
    });
}

module.exports = { registerUser, verifyUser };
