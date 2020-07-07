const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let review = new Schema({
  user: {
    type: ObjectId,
    ref: 'users'
  },
  plugin: {
    type: ObjectId,
    ref: 'plugins'
  },
  docRating: {
    type: Number,
  },
  codeRating: {
    type: Number,
  },
  devRating: {
    type: Number,
  },
  codebaseUsageDetail: {
    type: String,
  },
  reviewMsg: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('review', review);