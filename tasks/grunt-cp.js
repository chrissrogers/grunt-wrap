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
    var files = grunt.file.expandFiles(this.file.src),
        path = require('path'),
        task = this,
        src;

    // Concat specified files.
    if (files) {
      files.map(function (filepath) {
        src = wrap(filepath, {wrapper: task.data.wrapper});
        grunt.file.write(path.join(task.file.dest, filepath), src);
      });
    }

    // Fail task if errors were logged.
    if (this.errorCount) return false;

    // Otherwise, print a success message.
    grunt.log.writeln('Wrapped files created in "' + this.file.dest + '".');
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
