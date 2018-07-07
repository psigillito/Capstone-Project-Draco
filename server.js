// Bring in modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
// Connect to the db
const getSecret = require('./secrets').getSecret;
const userSchema = require('./models/users').User;
const trainingPlanSchema = require('./models/trainingPlans').TrainingPlan;
const workoutSchema = require('./models/workouts').Workout;

var User = mongoose.model('User', userSchema);
var TrainingPlan = mongoose.model('TrainingPlan', trainingPlanSchema);
var Workout = mongoose.model('Workout', workoutSchema);

// Initialize app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// React build middleware
app.use(express.static(path.join(__dirname, "client", "build")));

mongoose.connect(process.env.MONGODB_URI.toString(), {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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