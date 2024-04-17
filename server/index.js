// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// require('dotenv').config();

// Import routes
const donarRoute = require('./routes/donarRoutes');
const userRoute = require('./routes/userRoutes');
const transRoute = require('./routes/transRoutes')
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/donar', donarRoute);
app.use('/user', userRoute);
app.use('/trans', transRoute);
app.use('/api/payments', paymentRoutes);
app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID })
);
// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
