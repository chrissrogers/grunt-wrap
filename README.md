# grunt-wrap

Wraps text files

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: ``npm install grunt-wrap``

Then add this line to your project's ``grunt.js`` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-wrap');
```

## Documentation
Configure which files to be copied in your `initConfig`:

```javascript
grunt.initConfig({

  // ... other configs

  // wrap my modules with define
  wrap: {
    basic: {
      src: ['assets/*.js'],
      dest: 'dist/',
      options: {
        wrapper: ['define(function (require, exports, module) {\n', '\n});']
      }
    },
    advanced: {
      cwd: 'files/'
      expand: true,
      src: ['**/*.js', '**/*.css'],
      dest: 'dist/',
      options: {
        seperator: '\n',
        indent: '\t',
        wrapper: function(filepath, options) {
          return ['// ' + filepath, ''];
        },
        rename: function(dest, src) {
           return path.join(dest, src.replace(/(\.[\w]+)$/g, '.tagged$1'));
        }
      }
    }
  },

  // ... other configs
});
```

## Grunt 0.3.x support
v0.1.0 is the last version to support grunt 0.3.x. This version is frozen and available [here][legacy_grunt3]

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests
for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
* 2013 Apr 30 - v0.3.0 - Rewrite with grunt file/option convention, unit test (Bartvds), grunt version to 0.4.1
* 2013 Jan 31 - v0.2.0 - Implements grunt 0.4 compatibility measures, breaking support for grunt 0.3.x
* 2012 Oct 4  - v0.1.0 - Initial release.

## License
Copyright (c) 2013 Christopher Rogers
Licensed under the MIT license.

[grunt]: https://github.com/gruntjs/grunt
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md
[legacy_grunt3]: https://github.com/chrissrogers/grunt-wrap/tree/legacy/grunt-0.3.x
