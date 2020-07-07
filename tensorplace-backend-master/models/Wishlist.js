const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let wishlist = new Schema({
  user:{
    type: ObjectId,
    ref:'users'
  },
  plugins: [
    {
      type: ObjectId,
      ref: 'plugins'
    }
  ]
});

module.exports = mongoose.model('wishlist', wishlist);