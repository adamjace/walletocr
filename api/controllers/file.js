var mongoose = require('mongoose');
var SessionController = require('./session');
var ErrorUtils = require('../utils/error');
var User = mongoose.model('User');
var Receipt = mongoose.model('Receipt');
var shortid = require('shortid');

function FileController() {
	
	'use strict';
	
	var session = new SessionController();
	var error = new ErrorUtils();

	// upload file
	this.upload = function(req, res, next) {
			
		// authenticate promise
		session.doAuth(req).then(function(d) {
			
			if (d.length > 0) {
				
				// logic to upload file with OCR
				return res.json({_id: shortid.generate()});	
			}
			else {
				res.status(401); // unauthenticated
				return res.json(error.authError);
			}
		}, function(err) {
			return res.json(error.template(err.toString())); 
		});
	};
}

module.exports = FileController;