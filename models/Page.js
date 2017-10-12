const mongoose = require('mongoose');

const Location = require('./Location');
const Checkpoint = require('./Checkpoint');
const Gold = require('./Gold');
const PoI = require('./PoI');

const nextPage = new mongoose.Schema({
  optionText: {
    type: String,
    required: true
  },
  nextPageNum: {
    type: String
  }
})

const pageSchema = new mongoose.Schema({

  pageNum: {
    type: String,
    required: true,
    unique: true
  },
  text: {
    type: String,
    required: true,
  },
  options: [nextPage]
  },
  _location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  _checkpoint: {
    type: Schema.Types.ObjectId,
    ref: 'Checkpoint',
    required: true
  },
  _gold: {
    type: Schema.Types.ObjectId,
    ref: 'Gold',
    required: true
  },
  _PoI: {
    type: Schema.Types.ObjectId,
    ref: 'PoI',
    required: true
  }

})

const Page = mongoose.model('Page', pageSchema, 'Pages');

module.exports = Page;
