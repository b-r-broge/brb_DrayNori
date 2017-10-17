const express = require('express');
const router = express.Router();

//===IMPORT MONGOOSE MODELS===//

const Checkpoint = require('../models/Checkpoint');
const Endings = require('../models/Endings');
const Gold = require('../models/Gold');
const Location = require('../models/Location');
const Page = require('../models/Page');
const PoI = require('../models/PoI');
const Users = require('../models/User');

//============================//

//====RENDER WELCOME PAGE===//

router.use(function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/signup');
  }
})

router.get('/start', function(req, res) {
  res.render('astart', {
    username: req.user.username
  });
});

//==========================//

//===RENDER START PAGE===//

router.get('/new', function (req, res) {
  // set session information for a story
  req.session.currentPage = "";
  res.render('newStory')
})

//==========================//

module.exports = router;
