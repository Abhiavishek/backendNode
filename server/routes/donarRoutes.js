// routes/donarRoute.js
const express = require('express');
const router = express.Router();
const donarController = require('../controllers/donarController');

// Route for inserting data into the "donar" table
router.post('/', donarController.insertDonar);

module.exports = router;
