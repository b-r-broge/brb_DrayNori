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

//===PASSPORT CONFIG===//
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

//====================//


//===PASSPORT STRATEGY===//

// taken and slightly modified from -
// https://github.com/jaredhanson/passport-http
// AND
// https://www.npmjs.com/package/bcryptjs
// Passport for signing in an existing user
passport.use('local-signin', new localStrategy ({ },
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
          console.log('incorrect password');
          return next(null, false, {message: 'password is not correct'});
        }

        return next(null, data);
      }).catch(function(err) {
        console.log('ERROR:', err);
        return next(null, false, {message: 'Error on signon'});
      });
  }
));

//=======================//

//===SIGNUP AND LOGIN POSTS===//

router.post('/signup', function(req, res) {
  // Take an api request with username and password, add them to the DB if
  // they are not already there.
  // console.log('request body', req.body);
  var newUser = new Users({
    "username": req.body.username,
    "password": req.body.password,
  })
  newUser.save().then(function(user) {
    res.redirect('/thanks');
  }).catch(function(err) {
    console.log('ERROR', err);
    res.render('asignup', { signMessage: err });
  })
})

router.post('/login', passport.authenticate('local-signin', {
     failureRedirect: '/signup',
     successRedirect: '/story/start'
   })
 );

//============================//

//====RENDER HOME PAGE===//

router.get('/home', function(req, res) {
  res.render('home')
});

//==========================//

//====RENDER THANKS PAGE===//

router.get('/thanks', function(req, res) {
  res.render('thanks')
});

//==========================//

//====RENDER SIGNUP PAGE===//

router.get('/signup', function(req, res) {
  // console.log('request user:', req.user);
  res.render('asignup')
});

//==========================//

//==== LOGOUT ===//

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {})
  res.redirect('/home');
  console.log('session should be destroyed', req.session);
});

//==========================//

//====TEST THE CONNECTION/ROOT DIR===//

router.get('/', function(req, res) {
  res.redirect('/home');
});

//==========================//

//===AUTHENTICATED ROUTES===//

const storyRoutes = require('./storyRoutes');
const userRoutes = require('./userRoutes');

router.use('/story', storyRoutes);
router.use('/user', userRoutes);

//==========================//

module.exports = router;
