const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Location = require('./Location');
const Checkpoint = require('./Checkpoint');
const Gold = require('./Gold');
const PoI = require('./PoI');

const nextPage = new Schema({
  optionText: {
    type: String,
    required: true
  },
  _nextPage: {
    type: String,
  }
})

const Page = new Schema({

  page: {
    type: String,
    required: true,
    unique: true
  },
  text: {
    type: String,
    required: true,
  },
  options: [nextPage],
  _location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  _checkpoint: {
    type: Schema.Types.ObjectId,
    ref: 'Checkpoint',
  },
  _gold: {
    type: Schema.Types.ObjectId,
    ref: 'Gold',
  },
  _PoI: {
    type: Schema.Types.ObjectId,
    ref: 'PoI',
  }

})

const page = mongoose.model('Page', Page, 'page');

module.exports = page;
