'use strict';

/**
 * IdGenerator model
 *
 * @description :: Server-side model for managing IdGenerator
 */

//dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Util = require('../../libs/generator_util');


//IdGenerator Schema
var IdGeneratorSchema = new Schema({

    /**
     * @name name
     * @description name 
     * @type {Object}
     * @private
     */
    name: {

        type: String,
        index: {
            unique: true
        }

    },

    /**
     * @name value
     * @description value 
     * @type {Object}
     * @private
     */
    value: {

        type: String

    },

    /**
     * @name version
     * @description version 
     * @type {Object}
     * @private
     */
    version: {

        type: Number

    }

});


//apply IdGeneratorSchema level plugins

//schema methods
IdGeneratorSchema.methods.incId = function(){
    this.value = Util.incId(this.value);
};

//exports IdGenerator model
module.exports = mongoose.model('IdGenerator', IdGeneratorSchema);
