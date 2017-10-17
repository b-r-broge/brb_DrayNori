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


////======CREATE CONTENT======////

//===CREATE LOCATION===//

// Expect content to come in JSON format,
// {
//   "name": "<<location name>>",
//   "background": "<<background source>>",
//    "help": "<<popup help text>>",
//    "popup": "<<notation popup help text>>",
//    "notation": "<<name of notation"
// }

router.post('/location', function (req, res) {
  // TODO: take in JSON POST and add it to the DB
  let newLocation = new Location({
    name: req.body.name,
    backgroundSrc: req.body.background,
    helpText: req.body.help,
    popup: req.body.popup,
    notation: req.body.notation
  })
  newLocation.save()
  .then(function(data) {
    return res.status(200).json({
      "success": true,
      "newLocation": data.name
    })
  })
  .catch(function(err) {
    console.log('ERROR adding new location', err);
    res.json({
      "success": false,
      "error": err
    })
  })
})

//=====================//

//===CREATE PAGE===//

// //====POST PAGE===//
// // TODO: Make it so it can post any page
// app.post('/newPage/:pageNum', function(req, res) {
//   Page1.create({
//     text: req.body.text,
//     option1: req.body.option1,
//     option2: req.body.option2,
//     option3: req.body.option3,
//     option4: req.body.option4,
//     option5: req.body.option5,
//   }).then(page => {
//     res.render('page1')
//   });
// });
//
// //==========================//

router.post('/page', function (req, res) {
  // TODO: take in JSON via POST and add it to DB with an upsert
  // add any next pages to make tracking page id's easier
})

//=================//

//===CREATE ENDINGDS===//

//=====================//

//===CREATE CHECKPOINT===//

//=======================//

//===CREATE GOLD===//

//=================//

//===CREATE POI===//

//================//

////==========================////

module.exports = router;
