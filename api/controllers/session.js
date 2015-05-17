var mongoose = require('mongoose');
var User = mongoose.model('User');

function SessionController() {
	
	'use strict';
	
	// get
	// our session returns a user object by token and id
	this.doAuth = function (req, res, next) {
		var model = req.body;	
		return User.find({_id : model._id, token: model.token}).exec();
	};
}

module.exports = SessionController;