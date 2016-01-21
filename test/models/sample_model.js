//dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GeneratorModel = mongoose.model('IdGenerator');

var idAutoGenerator = require('../../index');

//sample schema
var SampleSchema = new Schema({
    name: {
        type: String
    },
    //field to auto-increment
    code: {
        type: String
    }
});

//activate id generator plugin
SampleSchema.plugin(idAutoGenerator, {
    field: 'code',
    idName: 'SAMPLE_CODE',
    startAt: '99-ZX',
    generatorModel: GeneratorModel
});

module.exports = mongoose.model('Sample', SampleSchema);
