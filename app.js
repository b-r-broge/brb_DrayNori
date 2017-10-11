//====LIST DEPENDENCIES===//
const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
// const cors = require('cors')
const app = express();

// TODO: Move mongoURL to config file that isn't pushed to git
const url = 'mongodb://EthanJarrell:EJ3102nl1@ds147884.mlab.com:47884/draynori2';

// add tests?
// add local test db?
//=========================//

//====SET APP ENGINE===//

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());

//=========================//

//====START SESSION===//

app.use(session({
  // TODO: Change secret, move it to a config file that doesn't get pushed to git
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

//==========================//

//====MONGOOSE===//

mongoose.Promise = require('bluebird');
mongoose.connect(url, function (err, db) {
 if (err) {
   console.log('Unable to connect to the mongoDB server. Error:', err);
 } else {
   console.log('Connection established to', url);
 }
});

//==========================//

//====TEST THE CONNECTION/ROOT DIR===//

app.get('/', function(req, res) {
  res.redirect('/home');
});

//==========================//

//====RENDER HOME PAGE===//

app.get('/home', function(req, res) {
  res.render('home')
});

//==========================//

//====RENDER START PAGE===//

app.get('/start', function(req, res) {
  User.find({username: req.session.username}).then(function(users) {
  res.render('astart', {
    users: users,
   });
});
});

//==========================//

//====RENDER SIGNUP PAGE===//

app.get('/signup', function(req, res) {
  res.render('asignup')
});

//==========================//

//====RENDER LOGIN PAGE===//

app.get('/login', function(req, res) {
  res.render('login')
});

//==========================//

//====RENDER LOGIN PAGE2===//

app.get('/login', function(req, res) {
  if (req.session && req.session.authenticated) {
    User.findOne({
        username: req.session.username,
        password: req.session.password
      }).then(function(user) {
      if (user) {
        req.session.username = req.body.username;
        var username = req.session.username;
        var userid = req.session.userId;
        res.render('login', {
          user: user
        });
      }
    })
  } else {
    res.redirect('/signup')
  }
})

//==========================//

//====POST LOGIN FOR USER===//
// TODO: Implement passport
// Iimplment passport to ensure that you can't access pages
//    if you are not logged in.
app.post('/login', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({
      username: username,
      password: password,
  }).then(user => {
    console.log(user);
    if (user.password == password) {
      req.session.username = username;
      req.session.authenticated = true;
      console.log(req.session);

      res.redirect('/start');
    } else {
      res.redirect('/login');
      console.log("This is my session", req.session)
    }
  })
})

//==========================//

//====POST TO SIGNUP PAGE===//

app.post('/signup', function(req, res) {
  User.create({
    username: req.body.username,
    password: req.body.password,
  }).then(function(user) {
    req.username = user.username;
    req.session.authenticated = true;
}).then(user => {
  res.redirect('/thanks')
});
});

//==========================//

//====CREATE Notation===//

app.post('/ifelse', function(req, res) {
  Ifelse.create({
    number: req.body.number,
    text: req.body.text,
  }).then(ifelse => {
  res.json(ifelse)
});
});

//==========================//

//====CREATE NEW GOLD PAGE 5===//

app.post('/gold1', function(req, res) {
  Gold1.create({
    gold1: req.body.gold1,
    user: req.session.username,
  }).then(gold1 => {
  res.redirect('/page5')
});
});

//==========================//

//====CREATE NEW Location===//

app.post('/newLocation/:locationName', function(req, res) {
  Kuku.create({
    kuku: req.body.kuku,
    user: req.session.username,
  }).then(kukus => {
    res.redirect('/page1')
  });
});

//==========================//

//====RENDER THANKS PAGE===//

app.get('/thanks', function(req, res) {
  res.render('thanks')
});

//==========================//

//====RENDER PAGE 0 PAGE===//
// game reset page

app.get('/page0', function(req, res) {
  User.find({username: req.session.username}).then(function(users){
    Kuku.findOne({user: req.session.username}).then(function(kukus){
      Snag.findOne({user: req.session.username}).then(function(snags){
        Mount.findOne({user: req.session.username}).then(function(mounts){
          Mine.findOne({user: req.session.username}).then(function(mines){
            res.render('page0', {
              users: users,
              kukus: kukus,
              snags: snags,
              mounts: mounts,
              mines: mines,
            });
          });
        });
      });
    });
  });
});

//==========================//

//====RENDER PAGE 01 PAGE===//
// Intro page

app.get('/page01', function(req, res) {
  User.find({username: req.session.username}).then(function(users){
    res.render('page01', {
      users: users,
    });
  });
});

//==========================//

//====RENDER ENDINGS===//
// TODO: figure out the different endings
app.get('/endings', function(req, res) {
  Ending.find({}).then(function (ending)  {
    res.json(ending);
  });
});

//==========================//

//====POST ENDINGS===//

app.post('/endings', function(req, res) {
  Ending.create({
    beginning: req.body.beginning,
    text: req.body.text,
    end: req.body.end,
  }).then(endings => {
    res.json(endings)
  });
});

//==========================//

//====RENDER PAGE===//
// TODO: Change this so current page is tracked through the session
//   so a user can't just go to a page by entering a URL
app.get('/page/:pageNum', function(req, res) {
  Page1.find({}).then(page1 => {
    Ifelse.aggregate().sample(1).then(function(ifelses){
      res.render('page1', {
        ifelses: ifelses,
        page1: page1,
      });
    });
  });
});

//==========================//

//====POST PAGE===//
// TODO: Make it so it can post any page
app.post('/newPage/:pageNum', function(req, res) {
  Page1.create({
    text: req.body.text,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    option5: req.body.option5,
  }).then(page => {
    res.render('page1')
  });
});

//==========================//

// TODO: Add a put so that we can update pages as necessary

//==== LOGOUT ===//

app.post('/logout', function(req, res) {
  req.session.destroy(function(err) {})
  res.redirect('/home');
  console.log(req.session);
});

//==========================//

//====APP LISTEN ON ENVIRONMENT PORT===//

app.listen(process.env.PORT || 3000);
console.log('starting applicaiton.  Good job!');

//==========================//
