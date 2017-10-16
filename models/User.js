const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Checkpoint = require('./Checkpoint');
const Gold = require('./Gold');
const PoI = require('./PoI');

let Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    validate: {
      isAsync: true,
      validator: function(value, isValid) {
        const self = this;
        return self.constructor.findOne({ username: value}).exec(function(err, user){
          if(err){
            throw err;
          }
          else if(user) {
            if(self.id === user.id) {
              return isValid(true);
            }
            return isValid(false);
          }
          else{
            return isValid(true);
          }
        })
      },
      message: 'The Username is already taken!'
    },
  },
  password: {
    type: String,
  },
  _checkpoint: {
    type: Schema.Types.ObjectId,
    ref: 'Checkpoint',
  },
  _gold: {
    type: Schema.Types.ObjectId,
    ref: 'Gold',
  },
  _PoI: {
    type: Schema.Types.ObjectId,
    ref: 'PoI',
  }
})

userSchema.pre('save', function(next){
  // if the password hasn't been modified we don't need to (re)hash it
  if (!this.isModified('password')) {
    return next();
  }
  var hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  next();
})


const User = mongoose.model('User', userSchema, 'user');

module.exports = User;
