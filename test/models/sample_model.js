//dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var idAutoGenerator = require('../../index');

//sample schema
var SampleSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    //field to auto-increment
    code: {
        type: String,
        required:true
    }
});

//activate id generator plugin
SampleSchema.plugin(idAutoGenerator, {
    field: 'code',
    startAt: '99-ZX',
    prefix: 'MNH-',
    maxSaveRetries: 2
});

module.exports = mongoose.model('Sample', SampleSchema);
