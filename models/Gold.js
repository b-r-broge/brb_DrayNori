const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Gold = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
  },

})

const Gold = mongoose.model('Gold', userSchema, 'poi');

module.exports = User
