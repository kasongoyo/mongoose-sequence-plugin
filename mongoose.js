//dependencies
var mongoose = require('mongoose');

require('./test/models/id_generator_model.js');
require('./test/models/sample_model.js');
mongoose.connect('mongodb://127.0.0.1:27017/id_generator_db');
module.exports = mongoose;