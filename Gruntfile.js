module.exports = function (grunt) {
  "use strict";
  var files = ['Gruntfile.js', 'tasks/**/*.js'];
  //var files = ['Gruntfile.js', 'tasks/**/*.js', 'test/**/*.js'];

  var path = require('path');

  grunt.initConfig({
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
    },
    wrap: {
      basics: {
        cwd: 'test/fixtures/',
        src: ['**/basic*.js', 'nonexisting.js'],
        dest: 'test/tmp/',
        expand: true,
        options: {
          seperator:'\n',
          indent:'/* indent */',
          wrapper: [grunt.file.read('test/fixtures/header.txt'), grunt.file.read('test/fixtures/footer.txt')]
        }
      },
      func: {
        cwd: 'test/fixtures/',
        src: ['extra.js'],
        dest: 'test/tmp/wrapfunction',
        expand: true,
        rename: function(dest, src) {
          return path.join(dest, src.replace(/(\.[\w]+)$/g, '.tagged$1'));
        },
        options: {
          seperator:'\n',
          testValue: 'yo!',
          wrapper: function(filepath, options){
            var name = path.basename(filepath);

            return [
              '// ' + name + ' start ' +  options.testValue,
              '// ' + name + ' end'
            ];
          }
        }
      }
    },
    clean: {
      test: ['test/tmp']
    },
    nodeunit: {
      all: ['test/**/*_test.js']
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['test']);
  grunt.registerTask('test', ['clean', 'jshint', 'wrap', 'nodeunit']);

  //editor buttons
  grunt.registerTask('edit_01', ['test']);
  grunt.registerTask('edit_02', ['clean']);
};
