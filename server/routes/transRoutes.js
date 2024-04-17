const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transController');

// Route for inserting a transaction
router.post('/', transactionController.insertTransaction);

module.exports = router;
