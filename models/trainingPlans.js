import mongoose from 'mongoose';
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
export default mongoose.model('TrainingPlan', trainingPlanSchema);