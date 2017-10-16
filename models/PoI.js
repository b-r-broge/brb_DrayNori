const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PoI = new Schema({
  name: {
    type: String,
    required: true,
  },
  iconSrc: {
    type: String,
  },

})

const poi = mongoose.model('PoI', PoI, 'poi');

module.exports = poi
