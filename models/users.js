import mongoose from 'mongoose';
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
  username: {
    type: String,
    required: true
  },
  location: String,
  hash: String,
  salt: String
});

// export our module to use in server.js
export default mongoose.model('User', userSchema);