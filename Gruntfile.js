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
        }
    });

    grunt.registerTask('default', ['mochaTest']);
}
