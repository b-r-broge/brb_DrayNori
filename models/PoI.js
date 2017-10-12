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

const PoI = mongoose.model('PoI', userSchema, 'poi');

module.exports = User
