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
  duration: {
    type: Number
  },
  /* exercises will be used exclusively for strength training
   * exercises : {
   *    squats: {
   *       sets: 3,
   *       reps: 6,
   *       intensity: {
   *          weight: 200,
   *          units: "lbs"
   *       }
   *    }
   * }
   */
  exercises: {
    type: Array
  },
  /* intverals will be used exclusively for endurance training
   * intervals : {
   *    sets: 3,
   *    reps: 4,
   *    interval: 400,
   *    unit: "m",
   *    intensity: "5k pace",
   *    rest: {
   *       duration: 2,
   *       unit: "min",
   *       intensity: "jog"
   *    },
  *     setRest: {
   *       duration: 4,
   *       unit: "min",
   *       intensity: "jog"
   *    },
   * }
   */
  intervals: {
    type: Array
  },
  date: [{
  	type: Date
  }],
  dayOfWeek: {
    type: String
  },
  user: {
    type: String,
    required: true
  },
  trainingPlan: {
    type: String,
    required: true
  }
});

// export our module to use in server.js
module.exports = Workout = mongoose.model('Workout', workoutSchema);