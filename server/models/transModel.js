const con = require('../config/db'); // Ensure this uses mysql2 or similar for promise support

// Function to create the transaction table if it doesn't exist
async function createTransactionTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS transactions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            subscription_id INT,
            payment_id VARCHAR(30),
            order_id VARCHAR(30),
            signature_hash VARCHAR(200),
            amount VARCHAR(100),
            status VARCHAR(15),
            bank_name VARCHAR(40),
            response_msg TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            email_count INT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `;
    try {
        await con.query(createTableQuery);
        console.log('Transaction table created or already exists');
    } catch (err) {
        console.error('Error creating transaction table:', err);
        throw err; // Rethrowing the error to be handled by the caller
    }
}

// Function to insert a new transaction
async function insertTransaction(transactionData) {
    const {
        user_id, subscription_id, payment_id, order_id, signature_hash,
        amount, status, bank_name, response_msg, email_count
    } = transactionData;
    const insertQuery = `
        INSERT INTO transactions
        (user_id, subscription_id, payment_id, order_id, signature_hash, amount, status, bank_name, response_msg, email_count)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
        const [result] = await con.query(insertQuery, [
            user_id, subscription_id, payment_id, order_id, signature_hash,
            amount, status, bank_name, response_msg, email_count
        ]);
        return result;
    } catch (err) {
        console.error('Error inserting transaction:', err);
        throw err; // Rethrowing the error to be handled by the caller
    }
}

module.exports = { createTransactionTable, insertTransaction };
