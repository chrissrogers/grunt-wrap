module.exports = function(grunt) {
  "use strict";

  var files = ['Gruntfile.js', 'tasks/**/*.js'];
  //var files = ['Gruntfile.js', 'tasks/**/*.js', 'test/**/*.js'];

  // Project configuration.
  grunt.initConfig({
    //test: {
    //  files: ['test/**/*.js']
    //},
    watch: {
      files: files,
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      all: files
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'jshint');

};
