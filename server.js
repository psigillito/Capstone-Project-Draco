// Bring in modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// Initialize app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Test route - DELETE ME LATER
app.get('/', (req, res) => {
	res.send('This is a test');
});

// Port setting for later deployment to Heroku
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));