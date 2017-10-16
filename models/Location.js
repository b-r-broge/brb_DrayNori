const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const Location = new Schema({
  name: {
    type: String,
    required: true,
  },
  backgroundSrc: {
    type: String,
  },
  helpText: {
    type: String
  },
  popupText: {
    type: String
  },
  notation: {
    type: String
  }
})


const location = mongoose.model('Location', Location, 'location');

module.exports = location;
