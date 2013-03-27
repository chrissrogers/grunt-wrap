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
//     // Or... 
//     wrapper: function(filepath, options) {
//       // ...
//       return ['define(function (require, exports, module) {\n', '\n});'];
//     }
//   }
// }

module.exports = function(grunt) {
  "use strict";

  var wrap;

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('wrap', 'Wrap files.', function () {

	var options = this.options({
      wrapper: ['', ''],
      indent: '',
      separator: grunt.util.linefeed
    });

    // Concat specified files.

    this.files.forEach(function(f) {
      
      var output = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return wrap(filepath, options);
      }).join(grunt.util.normalizelf(options.separator));
      
      grunt.file.write(f.dest, output);
      grunt.log.writeln('File ' + f.dest + ' created.');
    }, this);
    
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  wrap = function (filepath, options) {
    var wrapper = options.wrapper;
    if ('function' === typeof wrapper) {
      wrapper = wrapper(filepath, options);
    }
    var fileContents = grunt.file.read(filepath);
    if (options.indent) {
    	fileContents = fileContents.split('\n').map(function(line) {
    		return options.indent + line;
    	}).join('\n');
    }
    return wrapper[0] + fileContents + wrapper[1];
  };

};
