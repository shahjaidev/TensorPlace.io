const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PluginSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  githubRepoUrl: {
    type: String,
  },
  codebase: [{
    type: String
  }],
  language: [{
    type: String
  }],
  shortDesc: {
    type: String,
  },
  longDesc: {
    type: String,
  },
  inputType: {
    type: String,
  },
  outputType: {
    type: String
  },
  price: {
    type: String,
  },
  image: {
    type: String,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
  }
});

PluginSchema.set('timestamps', true);

module.exports = User = mongoose.model('plugins', PluginSchema);