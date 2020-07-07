const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String
  },
  zipCode: {
    type: String
  },
  phone: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  plugin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'plugins'
  },
  pluginName: {
    type: String,
  },
  total: {
    type: String,
  },
  payerID: {
    type: String,
  },
  paymentID: {
    type: String,
  },
  payerEmail: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = User = mongoose.model('orders', OrderSchema);