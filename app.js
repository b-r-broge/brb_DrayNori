//====LIST DEPENDENCIES===//
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const env = process.env.NODE_ENV || "dev";
const config = require('./config/config.json')[env]
const app = express();

const url = config.mongoUrl;

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
app.use(expressValidator());

//=========================//

//====START SESSION===//

app.use(session({
  secret: config.secret,
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

let publicRoutes = require('./routes/publicRoutes');

//========================//

//===CALL PUBLIC ROUTES HERE===//

app.use(publicRoutes);

//=============================//
//
// //====CREATE Notation===//
//
// app.post('/ifelse', function(req, res) {
//   Ifelse.create({
//     number: req.body.number,
//     text: req.body.text,
//   }).then(ifelse => {
//   res.json(ifelse)
// });
// });
//
// //==========================//
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
// //====RENDER PAGE 0 PAGE===//
// // game reset page
//
// app.get('/page0', function(req, res) {
//   User.find({username: req.session.username}).then(function(users){
//     Kuku.findOne({user: req.session.username}).then(function(kukus){
//       Snag.findOne({user: req.session.username}).then(function(snags){
//         Mount.findOne({user: req.session.username}).then(function(mounts){
//           Mine.findOne({user: req.session.username}).then(function(mines){
//             res.render('page0', {
//               users: users,
//               kukus: kukus,
//               snags: snags,
//               mounts: mounts,
//               mines: mines,
//             });
//           });
//         });
//       });
//     });
//   });
// });
//
// //==========================//
//
// //====RENDER PAGE 01 PAGE===//
// // Intro page
//
// app.get('/page01', function(req, res) {
//   User.find({username: req.session.username}).then(function(users){
//     res.render('page01', {
//       users: users,
//     });
//   });
// });
//
// //==========================//
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
// //====POST ENDINGS===//
//
// app.post('/endings', function(req, res) {
//   Ending.create({
//     beginning: req.body.beginning,
//     text: req.body.text,
//     end: req.body.end,
//   }).then(endings => {
//     res.json(endings)
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
//
// // TODO: Add a put so that we can update pages as necessary


//====APP LISTEN ON ENVIRONMENT PORT===//

app.listen(process.env.PORT || 3000);
console.log('starting applicaiton.  Good job!');

//==========================//
