var mongoose = require('mongoose');
var q = require('q');
var SessionController = require('./session');
var ErrorUtils = require('../utils/error');
var User = mongoose.model('User');
var Receipt = mongoose.model('Receipt');


function UserController() {
	
	'use strict';
	
	var session = new SessionController();
	var error = new ErrorUtils();
	
	// get
	this.get = function(req, res, next) {
		
		setTimeout(function() {
			
			// authenticate promise
			session.doAuth(req).then(function(d) {
				if (d.length > 0) {
					return res.json(d[0]); 
				}
				else {
					res.status(401);
					return res.json(error.authError);
				}
			}, function(err) {
				return res.json(error.template(err.toString())); 
			});
		
		}, 2000);
	};

	// create a new user
	this.create = function(req, res, next) {
		
		// bind our new user
		var user = new User(req.body);
		
		// save
		user.save(function(err, data) {
			if (err) return res.json(error.template(err.toString())); 
			return res.json(data); 
		});
	}; 

	// save
	this.update = function(req, res, next) {
		
		// defaults
		var model = req.body;
		var receipt = null;
		delete model.updated;
		
		// authenticate promise
		session.doAuth(req).then(function(d) {
			
			if (d.length > 0) {
				
				// bind user
				var user = new User(model).toObject();
				
				// bind each receipt in the users wallet
				for (var i in user.wallet) {
					receipt = new Receipt(user.wallet[i]);
					user.wallet[i] = receipt.toObject();
				}
				
				// update
				User.update({_id: user._id, token: user.token}, user, function(err, data) {
					if (err) return next(err);
					return res.json(data); 
				});
			}
			else {
				res.status(401);
				return res.json(error.authError);
			}
		}, function(err) {
			return res.json(error.template(err.toString())); 
		});
	};
}

module.exports = UserController;