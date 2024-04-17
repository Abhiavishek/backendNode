const razorpay = require('../config/razorpayConfig');
const transactionModel = require('../models/transModel');
const crypto = require('crypto');

exports.createOrder = async (req, res) => {
    const { amount } = req.body;

    const options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: "receipt#" + Math.random()
    };

    try {
        const order = await razorpay.orders.create(options);
        res.status(200).json({
            success: true,
            order,
          });
            } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send("Error creating order");
    }
};

exports.verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature, user_id, subscription_id, amount, bank_name, response_msg, email_count } = req.body;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                    .update((order_id + "|" + payment_id).toString())
                                    .digest('hex');

    if (expectedSignature === signature) {
        const transaction = {
            user_id,
            subscription_id,
            payment_id,
            order_id,
            signature_hash: signature,
            amount,
            status: 'success',
            bank_name,
            response_msg,
            email_count
        };

        try {
            await transactionModel.insertTransaction(transaction);
            res.json({ success: true, message: 'Payment verified successfully' });
            res.redirect(
                `http://localhost:5174/paymentsuccess?reference=${payment_id}`
              );
        } catch (error) {
            console.error("Failed to record transaction:", error);
            res.status(500).send("Failed to record transaction");
        }
    } else {
        res.status(401).send("Invalid signature. Verification failed");
    }
};
