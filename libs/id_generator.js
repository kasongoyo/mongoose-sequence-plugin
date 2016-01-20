'use strict';

//dependencies
var mongoose = require('mongoose');
require('./id_generator_model.js')
var IdGenerator = mongoose.model('IdGenerator');
var async = require('async');

/**
 * @description id_generator
 */
var idAutoGenerator = function(schema, options) {
    /**
     * This method create array of objects in series;
     * It force creation of object to be in series
     * @param  {[type]}   doc    
     */
    schema.statics.createSeries = function(doc, callback) {
        var thisModel = this;

        if (Array.isArray(doc)) {
            var args = doc;
            var toExecute = [];
            args.forEach(function(doc) {
                toExecute.push(function(cb) {
                    thisModel.create(doc, function(error, doc) {
                        if (error) {
                            cb(error);
                        } else {
                            cb(null, doc);
                        }
                    });
                });
            });
            async.series(toExecute, function(err, docs) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, docs);
                }
            });
        } else {
            thisModel.create(doc, function(error, doc) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, doc);
                }
            });
        }
    };

    //add generator name, same as the one in generator model
    schema.add({
        generatorName: String
    });

    var generator = {};

    if (options) {
        if (!options.field) {
            throw new Error('field to increment must be specified');
        }
        if (options.startAt) {
            generator.value = options.startAt;
        } else {
            throw new Error('start id must be provided');
        }
        if (options.idName) {
            generator.name = options.idName;
        } else {
            throw new Error('generator id name must be provided');
        }
    }

    schema.path('generatorName').default(generator.name);

    IdGenerator.create(generator, function(error) {
        if (error) {
            throw new Error('id model fail to initialize '+error);
        }
    });

    //prevent concurrency update using optimistic lock
    schema.pre('validate', function(next) {
        if (this.isNew) {
            var schemaInstance = this;
            IdGenerator.findOne({
                    name: schemaInstance.generatorName
                },
                function(err, genDoc) {
                    if (err) {
                        next(new Error(err));
                    }
                    schemaInstance[options.field] = genDoc.value;
                    genDoc.incId();
                    genDoc.save(function(err) {
                        if (err) {
                            next(new Error(err));
                        }
                        next();
                    });
                });
        } else {
            next();
        }
    });
};

module.exports = exports = idAutoGenerator;
