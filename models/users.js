const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // email address
  email: {
    type: String,
    unique: true,
    required: true
  },
  // string representing a user's name
  name: {
    type: String,
    required: true
  },
  // a user's password
  password: {
    type: String,
    require: true
  },

  stravaToken:{
    type: String,
    require: false
  },
  // a unique string representation for each user
  username: {
    type: String,
    unique: true,
    required: true
  },
  // a user's geographical location, OPTIONAL
  location: String,
  /* an object used for the recommendation engine
  * primaryGoal is the user's primary goal, with a number between 1 and 5
  * health contains an array representing the area(s) of health the user wishes to improve, only populated if the user's primary goal is improving health
  * loseWight is an object containing data around the user's weight loss goals, only populated if the user's primary goal is weight loss
  * fitness contains an array representing the area(s) of fitness the user wishes to improve, only populated if the user's primary goal is improving fitness
  * sport is an integer representing the user's primary sport, only populated if the user selected sport performance as their primary goal
  * */ 
  goals: {
    primaryGoal: Number,
    health: Array,
    loseWeight: {
      currentWeight: Number,
      goalWeight: Number,
      time: Number,
      autoSelectTime: Boolean
    },
    fitness: Array,
    sport: Number
  },
  logistics: {
    daysPerWeek: Number,
    hoursPerDay: Array
  },
  trainingPlans: {
    type: Array
  },
  // Integer to represent the TOTAL number of training plans (including deleted or no longer active plans)
  numTrainingPlans: Number,
  // The number of workouts a user has created (including deleted and past workouts)
  numWorkouts: Number,
  // Used to securely store the password
  hash: String,
  salt: String
});

// export our module to use in server.js
module.exports = User = mongoose.model('users', userSchema);