const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Gold = new Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },

})

const gold = mongoose.model('Gold', Gold, 'gold');

module.exports = gold
