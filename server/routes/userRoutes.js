// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for user registration
router.post('/register', userController.registerUser);

// Route for verifying user email
router.post('/verify', userController.verifyUser);

module.exports = router;
