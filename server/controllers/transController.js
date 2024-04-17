// controllers/transactionController.js
const transactionModel = require('../models/transModel');

// Controller function to handle request to insert a transaction
async function insertTransaction(req, res) {
    try {
        await transactionModel.createTransactionTable(); // Ensure table exists before insertion
        const transactionData = req.body; // Assuming that all required transaction fields are in the body
        const result = await transactionModel.insertTransaction(transactionData);
        res.status(201).send({ message: "Transaction recorded successfully", transactionId: result.insertId });
    } catch (error) {
        console.error('Error handling transaction:', error);
        res.status(500).send({ error: error.message });
    }
}

module.exports = { insertTransaction };
