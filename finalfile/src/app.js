const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();
const mongoose = require('mongoose');
require('./connect/connect');
const user = require('./sechma/userSchema');  // Make sure you have the correct path to your user schema
dotenv.config({path: './config.env' });

app.use(express.json());
// Define your middleware function
const middleware = (req, res, next) => {
    console.log("Middleware");
    next();
};

// Use your middleware
app.use(middleware);

// Import and use your router
const authenticateRouter = require('./router/authenticate'); // Replace with the correct path to your router
app.use('/authenticate', authenticateRouter);

app.get('/', (req, res) => {
    res.send('Hello Guys');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
