const express = require('express');
const router = express.Router();
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const localStrategy = require('passport-local').Strategy;
const bCrypt = require('bcryptjs');

const Users = require('../models/User');

//===USE PASSPORT===//

router.use(passport.initialize());
router.use(passport.session());

//==================//

// Need to grab and return information from the session to validate the user.
passport.serializeUser(function(user, next) {
  next(null, user.id);
});

passport.deserializeUser(function(id, next) {
  Users.findOne({_id: id}).then(function(user) {
    if (user) {
      next(null, user);
    } else {
      next(user.errors, null);
    }
  });
});


// taken and slightly modified from -
// https://github.com/jaredhanson/passport-http
// AND
// https://www.npmjs.com/package/bcryptjs
// Passport for signing in an existing user
passport.use('local-signin', new localStrategy (
  function(username, password, next) {
    let isValid = (usrPass, pass) => {
      return bCrypt.compareSync(pass, usrPass);
    }
    Users.findOne({
        username: username
      }).then(function(data) {
        if (!data) {
          return next(null, false, {message: 'username does not exist'});
        }
        // console.log(data);

        if (!isValid(data.password, password)) {
          return next(null, false, {message: 'password is not correct'});
        }

        return next(null, data);
      }).catch(function(err) {
        console.log('ERROR:', err);
        return next(null, false, {message: 'Error on signon'});
      });
  }
));


router.post('/signup', function(req, res) {
  // Take an api request with username and password, add them to the DB if
  // they are not already there.
  // console.log('request body', req.body);
  var newUser = new Users({
    "username": req.body.username,
    "password": req.body.password,
  })
  newUser.save().then(function(user) {
    res.redirect('thanks');
  }).catch(function(err) {
    console.log('ERROR', err);
    res.render('asignup', { signMessage: err });
  })
})

router.post('/login',
  passport.authenticate('local-signin', {
    failureRedirect: '/signup',
    successRedirect: '/start'
  })
);


//====RENDER HOME PAGE===//

router.get('/home', function(req, res) {
  res.render('home')
});

//==========================//

//====RENDER START PAGE===//

router.get('/start', function(req, res) {
  res.render('astart', {
    username: req.user.username
  });
});

//==========================//

//====RENDER SIGNUP PAGE===//

router.get('/signup', function(req, res) {
  res.render('asignup')
});

//==========================//

//====TEST THE CONNECTION/ROOT DIR===//

router.get('/', function(req, res) {
  res.redirect('/home');
});

//==========================//

//====POST LOGIN FOR USER===//
// TODO: Implement passport
// Iimplment passport to ensure that you can't access pages
//    if you are not logged in.
router.post('/login', function(req, res) {
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

//==== LOGOUT ===//

router.post('/logout', function(req, res) {
  req.session.destroy(function(err) {})
  res.redirect('/home');
  console.log(req.session);
});

//==========================//

module.exports = router;
