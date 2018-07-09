const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  password: {
    type: String,
    require: true
  },

  username: {
    type: String,
    unique: true,
    required: true
  },

  location: String,
  goals: {},
  trainingPlans: {
    type: Array
  },
  
  numTrainingPlans: Number,
  numWorkouts: Number,
  hash: String,
  salt: String
});

// export our module to use in server.js
module.exports = User = mongoose.model('users', userSchema);