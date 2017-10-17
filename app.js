//====LIST DEPENDENCIES===//
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const env = process.env.NODE_ENV || "dev";
const url = process.env.MONGOLAB_URI || "mongodb://localhost:27017/draynori" + env;
const secret = process.env.SECRET || "This is the session secret!";
const app = express();

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

// TODO: figure out if Validator is actually being used, and remove if not
// app.use(expressValidator());

//=========================//

//====START SESSION===//

app.use(session({
  secret: secret,
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

//===IMPORT ROUTES HERE===//

const publicRoutes = require('./routes/publicRoutes');
const addContent = require('./routes/addContent');

//========================//

//===CALL PUBLIC ROUTES HERE===//

app.use(publicRoutes);
app.use('/api', addContent);

//=============================//
//
// //====CREATE NEW GOLD PAGE 5===//
//
// app.post('/gold1', function(req, res) {
//   Gold1.create({
//     gold1: req.body.gold1,
//     user: req.session.username,
//   }).then(gold1 => {
//   res.redirect('/page5')
// });
// });
//
// //==========================//
//
// //====CREATE NEW Location===//
//
// app.post('/newLocation/:locationName', function(req, res) {
//   Kuku.create({
//     kuku: req.body.kuku,
//     user: req.session.username,
//   }).then(kukus => {
//     res.redirect('/page1')
//   });
// });
//
// //==========================//
//
//
// //==========================//
//
//
//
// //====RENDER ENDINGS===//
// // TODO: figure out the different endings
// app.get('/endings', function(req, res) {
//   Ending.find({}).then(function (ending)  {
//     res.json(ending);
//   });
// });
//
// //==========================//
//
// //====RENDER PAGE===//
// // TODO: Change this so current page is tracked through the session
// //   so a user can't just go to a page by entering a URL
// app.get('/page/:pageNum', function(req, res) {
//   Page1.find({}).then(page1 => {
//     Ifelse.aggregate().sample(1).then(function(ifelses){
//       res.render('page1', {
//         ifelses: ifelses,
//         page1: page1,
//       });
//     });
//   });
// });
//
// //==========================//
//
//

//====APP LISTEN ON ENVIRONMENT PORT===//

app.listen(process.env.PORT || 3000);
console.log('starting applicaiton.  Good job!');

//==========================//
