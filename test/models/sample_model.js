//dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var idAutoGenerator = require('../../index');

//sample schema
var SampleSchema = new Schema({
    name: {
        type: String
    },
    //field to auto-increment
    // code: {
    //     type: String
    // }
});

//activate id generator plugin
SampleSchema.plugin(idAutoGenerator, {
    field: 'code',
    startAt: '99-ZX',
    prefix : 'MNH-'
});

module.exports = mongoose.model('Sample', SampleSchema);
