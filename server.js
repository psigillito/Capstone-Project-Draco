// Bring in modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// Import routes
const users = require('./routes/users');
const workouts = require('./routes/workouts');

// Initialize app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// React build middleware
app.use(express.static(path.join(__dirname, "client", "build")));

//const db1 = 'mongodb://heroku_qb31c6fv:a383e16v1dvi0gq8735a1mm3mg@ds229701.mlab.com:29701/heroku_qb31c6fv';

// Connect to db
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Use routes
app.use('/users', users);
app.use('/workouts', workouts);

// Port setting for later deployment to Heroku
const port = process.env.PORT || 5000;
//const secret = process.env.SECRET || "some secret passphrase here for local development"

app.get("*", (req, res) => {  
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => console.log(`Server listening on port ${port}`));