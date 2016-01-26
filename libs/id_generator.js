'use strict';

//dependencies
var GeneratorUtil = require('./generator_util');
var async = require('async');
var _ = require('lodash');

/**
 * @description id_generator
 */
var idAutoGenerator = function(schema, options) {
    // var IdGenerator;
    /**
     * This method create array of objects in series;
     * It force creation of object to be in series
     * @param  {[type]}   doc    
     */
    schema.statics.gcreate = function(doc, callback) {
        var thisModel = this;

        if (Array.isArray(doc)) {
            var args = doc;
            var toExecute = [];
            args.forEach(function(doc) {
                var instance = new thisModel(doc);
                toExecute.push(function(cb) {
                    instance.gsave(function(error, doc) {
                        if (error) {
                            cb(error);
                        } else {
                            cb(null, doc);
                        }
                    });
                });
            });
            async.parallel(toExecute, function(err, docs) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, docs);
                }
            });
        } else {
            var instance = new thisModel(doc);
            instance.gsave(function(error, doc) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, doc);
                }
            });
        }
    };

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
    }


    //add field to hold id 
    var field = {};
    field[options.field] = {
        type: String,
        unique: true
    }

    schema.add(field);


    schema.methods.gsave = function(retryTimes, callback) {
        if (typeof arguments[0] === 'function') {
            retryTimes = 1;
            callback = arguments[0];
        } else {
            callback = arguments[1];
        }
        var instance = this;
        async.waterfall([
            function findLastInsertedDoc(next) {
                instance.constructor.find().hint({
                    $natural: -1
                }).limit(1).exec(function(err, doc) {
                    next(err, doc);
                });
            },
            function setId(doc, next) {
                if (_.isEmpty(doc)) {
                    instance[options.field] = GeneratorUtil
                        .affixId(options.startAt, options.prefix, options.suffix);
                } else {
                    instance[options.field] = GeneratorUtil
                        .incId(doc[0][options.field], options.prefix, options.suffix);
                };
                instance.save(function(error, savedDoc) {
                    next(error, savedDoc)
                })
            }
        ], function(error, doc) {
            if (!doc) {
                if (GeneratorUtil.isLastId(instance[options.field], options.prefix, options.suffix)) {
                    error.customMessage = 'The maximum ID has been reached,' +
                        'id generator can no longer work' +
                        'unless the id format is updated';
                    console.log(error.customMessage)
                    callback(error, doc);
                    return;
                }
                console.log("retry times " + retryTimes);
                if (retryTimes == 1000) {
                    callback(error, doc);
                    return;
                }
                instance.gsave(++retryTimes, callback);
            } else {
                callback(error, doc);
            }
        })
    };
};

module.exports = exports = idAutoGenerator;
