const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
    // unique: true,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  githubId: {
    type: String,
  },
  githubToken: {
    type: String,
  },
  profileImg: {
    type: String,
  },
});

module.exports = User = mongoose.model('users', UserSchema);