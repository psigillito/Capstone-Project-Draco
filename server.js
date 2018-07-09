// Bring in modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// Connect to the db
const userSchema = require('./models/users').User;
const trainingPlanSchema = require('./models/trainingPlans').TrainingPlan;
const workoutSchema = require('./models/workouts').Workout;

//var User = mongoose.model('User', userSchema);
var TrainingPlan = mongoose.model('TrainingPlan', trainingPlanSchema);
var Workout = mongoose.model('Workout', workoutSchema);

// Import routes
const users = require('./routes/users');

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

// Port setting for later deployment to Heroku
const port = process.env.PORT || 5000;
//const secret = process.env.SECRET || "some secret passphrase here for local development"

app.get('/workouts', (req, res) => {
    var query = Workout.find();
    query.exec((err, docs) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: docs });
    });
});
  
app.post('/workouts', (req, res) => {
    const Workout = new Workout();
    // body parser lets us use the req.body
    const { author, text } = req.body;
    if (!author || !text) {
        // we should throw an error. we can do this check on the front end
        return res.json({
            success: false,
            error: 'You must provide an author and comment'
        });
    }
    comment.author = author;
    comment.text = text;
    comment.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

app.get("*", (req, res) => {  
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => console.log(`Server listening on port ${port}`));