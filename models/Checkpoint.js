const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Page = require('./Page');

const Checkpoint = new Schema({
  name: {
    type: String,
    required: true,
  },
  _page: {
    type: Schema.Types.ObjectId,
    ref: 'Page',
    required: true
  },

})

const Checkpoint = mongoose.model('Checkpoint', userSchema, 'checkpoint');

module.exports = User
