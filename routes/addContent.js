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
//   "help": "<<popup help text>>",
//   "popup": "<<notation popup help text>>",
//   "notation": "<<name of notation"
// }

router.post('/location', function (req, res) {
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

// Expect content to come in JSON format,
// {
//   "name": "<<page name>>",
//   "text": "<<main text of the page>>",
//   "options": [{"option": "<<text of the option>>", "nextPage": "<<name of next page>>"}, ...],
//   "location": "<<name of location this page is in>>",
// }

router.post('/page', function (req, res) {
  Location.findOne({name: req.body.location})
  .then(function(loc) {
    let pageOpt = [];
    for (opt of req.body.options) {
      let newObj = {
        optionText: opt.option,
        _nextPage: opt.nextPage
      }
      pageOpt.push(newObj);
    }
    let page = {
      page: req.body.name,
      text: req.body.text,
      _location: loc._id,
      options: pageOpt
    };
    let newPage = new Page(page);
    newPage.save()
    .then(function(data) {
      return res.status(200).json({
        "success": true,
        "newPage": data.page
      })
    })
    .catch(function(err) {
      console.log('ERROR adding new page', err);
      res.json({
        "success": false,
        "error": err
      })
    })
  })
  .catch(function(err) {
    console.log('ERROR finding location when adding new page', err);
    res.json({
      "success": false,
      "error": err
    })
  })
})

//=================//

//===CREATE ENDINGDS===//
// Expect content to come in JSON format,
// {
//   "title": "<<ending title>>",
//   "text": "<<main text of the ending>>",
//   "location": "<<name of location this ending is in>>",
// }

router.post('/ending', function (req, res) {
  Location.findOne({name: req.body.location})
  .then(function(loc) {
    let ending = new Ending({
      title: req.body.title,
      text: req.body.text,
      _location: loc._id
    });
    ending.save()
    .then(function(data) {
      return res.status(200).json({
        "success": true,
        "newPage": data.title
      })
    })
    .catch(function(err) {
      console.log('ERROR adding new ending', err);
      res.json({
        "success": false,
        "error": err
      })
    })
  })
  .catch(function(err) {
    console.log('ERROR finding location when adding new ending', err);
    res.json({
      "success": false,
      "error": err
    })
  })
})

//=====================//

//===CREATE CHECKPOINT===//
// Expect content to come in JSON format,
// {
//   "name": "<<checkpoint name>>",
//   "page": "<<name of page this checkpoint refers to>>",
// }

router.post('/checkpoint', function (req, res) {
  Page.findOne({page: req.body.page})
  .then(function (page) {
    let newCheckpoint = new Checkpoint({
      name: req.body.name,
      _page: page._id
    })
    newCheckpoint.save()
    .then(function(data) {
      Page.update({_id: page._id}, {_checkpoint: data._id})
      .then(function(data) {
        return res.json({
          "success": true,
          "checkpoint": data.name
        })
      })
      .catch(function(err) {
        console.log('ERROR adding checkpoint to page', err);
        res.json({
          "success": false,
          "error": err
        })
      })
    })
    .catch(function(err) {
      console.log('ERROR adding new checkpoint', err);
      res.json({
        "success": false,
        "error": err
      })
    })
  })
  .catch(function(err) {
    console.log('ERROR finding location when adding new ending', err);
    res.json({
      "success": false,
      "error": err
    })
  })
})

//=======================//

//===CREATE GOLD===//
// Expect content to come in JSON format,
// {
//   "name": "<<gold name>>",
//   "value": "<<value of gold in a string format>>"
//   "page": "<<name of page this gold refers to>>",
// }

router.post('/gold', function (req, res) {
  let newGold = new Gold({
    name: req.body.name,
    value: req.body.value
  })
  newGold.save()
  .then(function(data) {
    Page.update({name: req.body.page}, {_gold: data._id})
    .then(function(data) {
      return res.json({
        "success": true,
        "checkpoint": data.name
      })
    })
    .catch(function(err) {
      console.log('ERROR adding gold to page', err);
      res.json({
        "success": false,
        "error": err
      })
    })
  })
  .catch(function(err) {
    console.log('ERROR adding new gold', err);
    res.json({
      "success": false,
      "error": err
    })
  })
})

//=================//

//===CREATE POI===//
// Expect content to come in JSON format,
// {
//   "name": "<<interest name>>",
//   "icon": "<<source string of the icon>>"
//   "page": "<<name of page this poi refers to>>",
// }

router.post('/gold', function (req, res) {
  let newPoi = new PoI({
    name: req.body.name,
    iconSrc: req.body.icon
  })
  newPoi.save()
  .then(function(data) {
    Page.update({name: req.body.page}, {_PoI: data._id})
    .then(function(data) {
      return res.json({
        "success": true,
        "checkpoint": data.name
      })
    })
    .catch(function(err) {
      console.log('ERROR adding poi to page', err);
      res.json({
        "success": false,
        "error": err
      })
    })
  })
  .catch(function(err) {
    console.log('ERROR adding new poi', err);
    res.json({
      "success": false,
      "error": err
    })
  })
})

//================//

////==========================////

module.exports = router;
