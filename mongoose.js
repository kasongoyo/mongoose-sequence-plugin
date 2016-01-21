//dependencies
var mongoose = require('mongoose');

require('./libs/id_generator_model.js');
require('./test/models/sample_model.js');
mongoose.connect('mongodb://127.0.0.1:27017/id_generator_db');

// var db = mongoose.connection;
// db.on('error', function (err) {
// console.log('connection error', err.message);
// });
// db.once('open', function () {
// console.log('connected.');
// });
/**
 * @description export mongoose
 * @type {Mongoose}
 */
module.exports = mongoose;