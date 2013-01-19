/**
 * grunt-wrap
 * https://github.com/chrissrogers/grunt-wrap
 *
 * Copyright (c) 2012 Christopher Rogers
 * Licensed under the MIT license.
 */

// wrap: {
//   modules: {
//     src: ['assets/*.js'],
//     dest: 'dist/',
//     wrapper: ['define(function (require, exports, module) {\n', '\n});']
//   }
// }

module.exports = function(grunt) {

  var wrap;

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('wrap', 'Wrap files.', function () {
    var path = require('path'),
        src;

    // Concat specified files.

    this.files.forEach(function(file) {
      if (!file.src) return;
      
      file.src.map(function(filepath) {
        src = wrap(filepath, { wrapper: this.data.wrapper });
        grunt.file.write(path.join(this.data.dest, filepath), src);
      }, this);
    }, this);

    // Fail task if errors were logged.
    if (this.errorCount) return false;

    // Otherwise, print a success message.
    grunt.log.writeln('Wrapped files created in "' + this.data.dest + '".');
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  wrap = function (filepath, options) {
    options = grunt.util._.defaults(options || {}, {
      wrapper: ['', '']
    });
    return options.wrapper[0] + grunt.file.read(filepath) + options.wrapper[1];
  }

};
