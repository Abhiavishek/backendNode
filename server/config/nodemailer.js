// config/nodemailer.js
const nodemailer = require('nodemailer');
const { Email, pass } = require('./env.js');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: Email, // Change this to your Gmail address
        pass: pass // Change this to your Gmail password
    }
});

module.exports = transporter;
