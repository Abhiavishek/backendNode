// controllers/donarController.js
const donarModel = require('../models/donarModel');

// Controller function for inserting data into the "donar" table
function insertDonar(req, res) {
    donarModel.createDonarTable(function(err) {
        if (err) {
            res.status(500).send("Error creating table");
            return;
        }

        const { indianCitizen, fullName, email, gender, amount, age, contact, address, city, panCard } = req.body;
        const data = { indianCitizen, fullName, email, gender, amount, age, contact, address, city, panCard };

        donarModel.insertDonar(data, function(err, result) {
            if (err) {
                res.status(500).send("Error inserting data");
            } else {
                res.status(201).send("Record inserted successfully");
            }
        });
    });
}

module.exports = { insertDonar };
