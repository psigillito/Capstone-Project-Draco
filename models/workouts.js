import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true
  },
});

// export our module to use in server.js
export default mongoose.model('Workout', workoutSchema);