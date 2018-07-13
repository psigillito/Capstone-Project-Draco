const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true
  },
  date: [{
  	type: Date
  }]
});

// export our module to use in server.js
module.exports = Workout = mongoose.model('Workout', workoutSchema);