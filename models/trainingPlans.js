const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainingPlanSchema = new Schema({
  // A string with a descriptive name of the training plan, must be unique
  name: {
    type: String,
    unique: true,
    required: true
  },
  // a user as identified by their mongo assigned ID
  user: {
    type: String,
    required: true
  },
  // an array of workout IDs
  workouts: {
    type: Array
  },
  // a JSON string representing the start date of the training plan
  startDate: {
    type: Date
  },
  // a JSON string representing the end date of the training plan
  endDate: {
    type: Date
  },
  // boolean representing whether plan is active or not
  active: {
    type: Boolean
  }
});

// export our module to use in server.js
module.exports = TrainingPlan = mongoose.model('TrainingPlan', trainingPlanSchema);