/*
 * grunt-wrap
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Chris Talkington, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-contrib-copy/blob/master/LICENSE-MIT
 *
 * rewritten by Bart van der Schoor based on grunt-contrib-copy and code from Ruben Rodriguez's fork
 */


module.exports = function (grunt) {
  'use strict';

  var path = require('path');
  var util = require('util');

  grunt.registerMultiTask('wrap', 'Wrap files.', function () {

    var options = this.options({
      wrapper: ['', ''],
      indent: '',
      separator: grunt.util.linefeed
    });

    grunt.verbose.writeflags(options, 'Options');

    var counter = 0;
    var dest;
    var isExpandedPair;

    this.files.forEach(function (filePair) {
      isExpandedPair = filePair.orig.expand || false;

      filePair.src.forEach(function (src) {
        if (detectDestType(filePair.dest) === 'directory') {
          if (isExpandedPair) {
            dest = filePair.dest;
          } else if (options.rename) {
            dest = options.rename(filePair.dest || '', src);
          } else {
            dest = unixifyPath(path.join(filePair.dest || '', src));
          }
        } else {
          dest = filePair.dest;
        }

        if (grunt.file.isDir(src)) {
          grunt.file.mkdir(dest);
        } else {
          if (options.debug) {
            grunt.log.write('Wrapping ' + src.cyan + ' -> ' + dest.cyan + '...');
          }
          grunt.file.write(dest, wrap(src, options));
          counter++;
        }
      });
    });
    grunt.log.write('Wrapped ' + (counter+'').cyan + ' files');
  });

  var wrap = function (filepath, options) {
    var wrapper = options.wrapper;
    if ('function' === typeof wrapper) {
      wrapper = wrapper(filepath, options);
    }
    var fileContents = grunt.file.read(filepath);
    if (options.indent) {
      fileContents = fileContents.split(/\r?\n/g).map(function(line) {
        return options.indent + line;
      }).join(grunt.util.linefeed);
    }
    if (options.escape) {
      var quoteChar = options.escape;
      var bsRegexp = new RegExp('\\\\', 'g');
      var quoteRegexp = new RegExp('\\' + quoteChar, 'g');
      var nlReplace = '\\n' + quoteChar + ' +\n' + quoteChar;
      var fileContentsEscaped = fileContents.replace(bsRegexp, '\\\\').replace(quoteRegexp, '\\' + quoteChar).replace(/\r?\n/g, nlReplace);
      return wrapper[0] + options.separator + fileContentsEscaped + options.separator + wrapper[1];
    } else {
      return wrapper[0] + options.separator + fileContents + options.separator + wrapper[1];
    }
  };

  var detectDestType = function (dest) {
    if (grunt.util._.endsWith(dest, '/')) {
      return 'directory';
    } else {
      return 'file';
    }
  };

  var unixifyPath = function (filepath) {
    if (process.platform === 'win32') {
      return filepath.replace(/\\/g, '/');
    } else {
      return filepath;
    }
  };
};
