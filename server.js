
// server.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/walletapp'); 

// call the packages we need
var express = require('express');      
var app = express();                
var bodyParser = require('body-parser');
var receipt = require('./api/models/receipt');
var routes = require('./api/controllers/routes');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 // set our port
var port = process.env.PORT || 8080;       

// set routing
routes(app);

// start the server
app.listen(port);
console.log('listening on port ' + port);
