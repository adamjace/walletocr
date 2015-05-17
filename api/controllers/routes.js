var express = require('express');
var errors = require('./errors');

// models
var UserModel = require('../models/user');
var ReceiptModel = require('../models/receipt');

// controllers
var UserController = require('./user');
var FileController = require('./file');

module.exports = exports = function(app) {

   var router = express.Router();           
   var user = new UserController();
   var file = new FileController();
   
   // middleware to use for all requests
   router.use(function(req, res, next) {
       next(); 
   });
   
   // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
   router.get('/', function(req, res) {
       res.send('hello.');   
   });
  
   router.route('/user/get').post(user.get);
   router.route('/user/create').post(user.create);
   router.route('/user/update').post(user.update);
   router.route('/file/upload').post(file.upload);
   
   // register routes /api
   app.use('/api', router);
  
   // error handler
   errors(app);
};