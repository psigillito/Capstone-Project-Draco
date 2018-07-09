const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainingPlanSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },

  name: {
    type: String,
    unique: true,
    required: true
  },
  
  workouts: {
    type: Array
  }
});

// export our module to use in server.js
module.exports = TrainingPlan = mongoose.model('TrainingPlan', trainingPlanSchema);