// console.log usually needs to be silenced in LE
// console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('index.js', 'utf8');

describe('', function () {
  it('', function() {

    // assert that function notation is not used
    assert.notMatch(code, /function/, 'Use arrow notation `() =>` to define functions.');

    // Using single const declaration
    let structure1 = function() {
      const Calculate = {
        add($x) { return $x + $five; }
      };
    };

    // Using key: value notation 
    let structure2 = function() {
      const Calculate = {
        add: ($x) => { return $x + $five; }
      };
    };

    // Using dot notation 
    let structure3 = function() {
      Calculate.add = ($x) => { return $x + $five; };
    };

    const varCallbacks = [
      function($x, $five) {
        if ($x.name !== 'arg') {
          return {failure: 'Expected parameter of `.add` to be `arg`'};
        } else if ($five.value !== 5) {
          return {failure: 'Expected function to add 5 to argument'};
        } else {
          return true;
        }
      }
    ];

    let isMatch1 = Structured.match(code, structure1, {varCallbacks: varCallbacks});
    let isMatch2 = Structured.match(code, structure2, {varCallbacks: varCallbacks});
    let isMatch3 = Structured.match(code, structure3, {varCallbacks: varCallbacks});
    let failureMessage = varCallbacks.failure || 'Did you declare a method named `add` that takes one argument in the `Calculate` object?' ;

    assert.isOk(isMatch1 || isMatch2 || isMatch3, failureMessage);
  })
})
