'use strict';

module.exports = function(grunt) {

    //load all grunt task
    require('load-grunt-tasks')(grunt);
    //projec configuration
    grunt.initConfig({
         //------------------------------------------------------------
        // mocha test task configuration
        //------------------------------------------------------------
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                },
                src: [
                    'test/*.js'
                ]
            },
        },


        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: ['Gruntfile.js', 'libs/**/*.js', 'test/**/*.js']
            }
        }
    });

    grunt.registerTask('default', ['jshint:all', 'mochaTest']);
};
