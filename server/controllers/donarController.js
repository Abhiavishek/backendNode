// controllers/donarController.js
const donarModel = require('../models/donarModel');

// Controller function for inserting data into the "donar" table
async function insertDonar(req, res) {
    try {
        // First, ensure the table is created
        await donarModel.createDonarTable();

        // Extract the data from request body
        const { indianCitizen, fullName, email, gender, amount, age, contact, address, city, panCard } = req.body;
        const data = { indianCitizen, fullName, email, gender, amount, age, contact, address, city, panCard };

        // Insert data into the "donar" table
        const result = await donarModel.insertDonar(data);
        res.status(201).send("Record inserted successfully");
    } catch (err) {
        if (err.message.includes("creating table")) {
            res.status(500).send("Error creating table");
        } else {
            res.status(500).send("Error inserting data");
        }
    }
}

module.exports = { insertDonar };
