const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Location = require('./Location');

const Ending = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
  },
  _location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },

})

const ending = mongoose.model('ending', Ending, 'ending');

module.exports = ending
