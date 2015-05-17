// api/models/user.js

var shortid = require('shortid');
var uuid = require('node-uuid');
var mongoose = require('mongoose');

// define our schema
var schema = mongoose.Schema({
    _id: { type: String, unique: true, 'default': shortid.generate},
    token: { type: String, 'default': uuid.v1()},
    email: { type: String, unique: true, required: true },
    firstName: {type: String},
	 	lastName : String,
    dob: Date,
    gender: String,
    country: String,
    registered: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    device: String,
	 	wallet : []	
})

// validation before saving
.pre('save', function (next) {
  var self = this;
  User.find({email: this.email}, function (err, data) {
    if (err) {
      return next(err);
    } else if (data.length > 0) {
        self.invalidate('email', 'email is already registered');
        next(new Error('email is already registered'));
    }
    else {
      next();
    }   
  });
});

// define the model
var User = mongoose.model('User', schema);

// validation
User.schema.path('gender').validate(function (value) {
  return /m|f|/i.test(value);
}, 'Invalid gender');

module.exports = User;