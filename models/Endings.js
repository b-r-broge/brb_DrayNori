const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Location = require('./Location');

const ending = new Schema({
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

const ending = mongoose.model('ending', userSchema, 'ending');

module.exports = User
