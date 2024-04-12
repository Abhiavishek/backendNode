// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const donarRoute = require('./routes/donarRoutes');
const userRoute = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/donar', donarRoute);
app.use('/user', userRoute);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
