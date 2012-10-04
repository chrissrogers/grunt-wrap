# grunt-wrap

Wraps text files

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: ``npm install grunt-wrap``

Then add this line to your project's ``grunt.js`` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-wrap');
```

[grunt]: https://github.com/gruntjs/grunt
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## Documentation
Configure which files to be copied in your `initConfig`:

```javascript
grunt.initConfig({

  // ... other configs

  // wrap my modules with define
  wrap: {
    modules: {
      src: ['assets/*.js'],
      dest: 'dist/',
      wrapper: ['define(function (require, exports, module) {\n', '\n});']
    }
  },

  // ... other configs
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests
for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
* 2012 Oct 4 - v0.1.0 - Initial release.

## License
Copyright (c) 2012 Christopher Rogers
Licensed under the MIT license.
