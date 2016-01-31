'use strict';

//dependencies
var GeneratorUtil = require('./generator_util');
var async = require('async');
var _ = require('lodash');
var mongoose = require('mongoose');
var Model = mongoose.Model;

//remember actual Model.prototype.save
var previousSave = Model.prototype.save;


/**
 * @name idGenerator
 * @description
 * @type {Function}
 */
var sequenceGenerator = function(schema, options) {

    //extend default options
    options = _.merge({
        maxSaveRetries: 1000,
        startAt: '0000-0000-0000-0001',
        field: 'sequence'
    }, options || {});

    //defende max retries to obey optimistic nature
    if (options.maxSaveRetries > 1000) {
        options.maxSaveRetries = 1000;
    }

    //corrent path definitions
    var pathOpt = _.merge({},
        _.get(schema.path(options.field), 'options', {}), {
            unique: true,
            type: String,
            required:false
        });

    schema.path(options.field, pathOpt);


    /**
     * @name save
     * @description override schema save to accommodate sequence value generation
     *              optimistically
     * @param {Object} [option] valid mongoose model save options
     * @param {Function} [fn] callback to invoke on success or error
     * @type {Function}
     */
    schema.methods.save = function($options, callback) {

        //check if its update then dont generate next value in the sequence
        if (!this.isNew) {
            return previousSave.call(this, callback);
        }

        //normalize arguments
        if ($options && _.isFunction($options)) {
            callback = $options;
            $options = {};
        }

        //normalize options
        $options = _.merge({
            retryTimes: 1
        }, $options || {});

        //save a current instance
        async.waterfall([

            function findLastInsertedDoc(next) {
                this.constructor.find().hint({
                    $natural: -1
                }).limit(1).exec(function(error, doc) {
                    next(error, doc);
                });
            }.bind(this),

            function setId(doc, next) {

                if (_.isEmpty(doc)) {
                    this[options.field] =
                        GeneratorUtil.affixId(
                            options.startAt, options.prefix, options.suffix);
                } else {
                    this[options.field] =
                        GeneratorUtil.incId(
                            doc[0][options.field], options.prefix, options.suffix);
                }

                previousSave.call(this, function(error, savedDoc) {
                    next(error, savedDoc);
                });

            }.bind(this)
        ], function(error, doc) {
            //success save
            if (!doc) {

                //TODO add comment what are they doing
                if (GeneratorUtil.isLastId(this[options.field], options.prefix, options.suffix)) {
                    error.customMessage = 'The maximum ID has been reached,' +
                        'id generator can no longer work' +
                        'unless the id format is updated';
                    return callback(error, doc);
                }

                //TODO fix to use maxRetries
                if ($options.retryTimes > options.maxSaveRetries) {
                    return callback(error, doc);
                }

                //increment save retries times
                ++$options.retryTimes;

                return this.save.call(this, $options, callback);
            }

            //fail to save complete
            else {
                return callback(error, doc);
            }

        }.bind(this));

    };
};

module.exports = exports = sequenceGenerator;
