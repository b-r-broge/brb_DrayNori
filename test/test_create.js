const assert = require("assert");
const request = require("supertest");
const app = require('../app');

const checkpoint = require('../models/Checkpoint');
const endings = require('../models/Endings');
const gold = require('../models/Gold');
const location = require('../models/Location');
const page = require('../models/Page');
const poi = require('../models/PoI');
const user = require('../models/User');

describe('POST /api/signup - add a user to the database', function() {
  // delete all content from the test DB
  before('reset the test database', function(done) {
    checkpoint.remove({}).then(function() {});
    endings.remove({}).then(function() {});
    gold.remove({}).then(function() {});
    location.remove({}).then(function() {});
    page.remove({}).then(function() {});
    poi.remove({}).then(function() {});
    user.remove({}).then(function() {});

    setTimeout(function() {
      return done();
    }, 1000);
  })

  // TODO: figure this out, not going to validate users for 
  // posting locations and pages
  //
  // before('add test user into the database')
  //
  // Add a couple of users to the testdb
  // it('Should add user "Reynard" to the user collection', function(done) {
  //   request(app).post('/signup')
  //     .send({
  //       "username": "rey",
  //       "password": "reyRey"
  //     })
  //     .set('Accept', 'application/json')
  //     .expect(200)
  //     .end(done)
  // });
  // it('Should add user "Seymour" to the user collection', function(done) {
  //   request(app).post('/signup')
  //     .send({
  //       "username": "seymour",
  //       "password": "smellMoo"
  //     })
  //     .expect(200)
  //     .end(done)
  // });

})
