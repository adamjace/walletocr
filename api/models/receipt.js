// api/models/receipt.js

var mongoose = require('mongoose');
var shortid = require('shortid');

var schema = mongoose.Schema({
    _id: { type: String },
    vendor: String,
    amount: String,
    purchaseDate: { type: Date, default: Date.now },
    createdDate: { type: Date, default: Date.now },
    terms: String,
    text: String,
    file: String,
    deleted: {type: Boolean, default: false},
    location: String	
});

// define the model
var Receipt = mongoose.model('Receipt', schema);

module.exports = Receipt;