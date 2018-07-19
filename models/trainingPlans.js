const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainingPlanSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  workouts: {
    type: Array
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
});

// export our module to use in server.js
module.exports = TrainingPlan = mongoose.model('TrainingPlan', trainingPlanSchema);