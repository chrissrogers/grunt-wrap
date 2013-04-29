var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.gruntwrap = {
  setUp: function(done) {
    done();
  },
  basics: function(test) {
    test.expect(5);

    var expected, actual;

    test.ok(grunt.file.exists('test/tmp/basic.js'), 'should output basic.js');
    test.ok(grunt.file.exists('test/tmp/subfolder/basicSub.js'), 'should respect subfolder');
    test.ok(!grunt.file.exists('test/tmp/ignore.js'), 'should use glob filter');

    expected= grunt.file.read('test/expected/basic.js');
    actual = grunt.file.read('test/tmp/basic.js');
    test.equal(expected, actual, 'should wrap basic.js correctly');

    expected= grunt.file.read('test/expected/subfolder/basicSub.js');
    actual = grunt.file.read('test/tmp/subfolder/basicSub.js');
    test.equal(expected, actual, 'should wrap subfolder/basicSub correctly');

    test.done();
  },
  wrapfunction: function(test) {
    test.expect(2);

    var expected, actual;

    test.ok(grunt.file.exists('test/tmp/wrapfunction/extra.tagged.js'), 'should output extra.tagged.js');

    expected= grunt.file.read('test/expected/wrapfunction/extra.tagged.js');
    actual = grunt.file.read('test/tmp/wrapfunction/extra.tagged.js');
    test.equal(expected, actual, 'should wrap extra.js using function correctly');

    test.done();
  }
};
