'use strict';
//dependencies
var mongoose = require('mongoose');
//load all modules
require('../mongoose.js');
var Sample = mongoose.model('Sample');
var expect = require('chai').expect;
var async = require('async');
var samples;


describe('test the id generator', function() {

    before(function() {
        samples = [{
            name: 'Sample1'
        }, {
            name: 'Sample2'
        }, {
            name: 'Sample3'
        }, {
            name: 'Sample4'
        }];
    });

    it('should auto increment id on model creation', function(done) {

        Sample.gcreate(samples.slice(0, 3), function(err, samples) {
            expect(err).to.not.exist;
            expect(samples.length).to.equal(3);
            done();
        });
    });

    it('id should remain constant when it get to the greatest number possible', function(done) {
        Sample.gcreate(samples, function(err, samples) {
            expect(err).to.exist;
            done();
        });
    });

    after(function(done) {
        var cleanups = mongoose.modelNames()
            .map(function(modelName) {
                //grab mongoose model
                return mongoose.model(modelName);
            })
            .map(function(Model) {
                return async.series.bind(null, [
                    //clean up all model data
                    Model.remove.bind(Model),
                    //drop all indexes
                    Model.collection.dropAllIndexes.bind(Model.collection)
                ]);
            });

        //run all clean ups parallel
        async.parallel(cleanups, function(error) {
            if (error && error.message !== 'ns not found') {
                done(error);
            } else {
                done(null);
            }
        });
    });
});
