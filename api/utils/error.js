var mongoose = require('mongoose');
var User = mongoose.model('User');

function ErrorUtils() {
	
	'use strict';
	
	this.template = function(err) {
		return {error: true, message: err};
	};
	
	this.authError = {error: true, message: 'bad authentication'};
}

module.exports = ErrorUtils;