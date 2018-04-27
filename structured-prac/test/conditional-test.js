// console.log usually needs to be silenced in LE
// console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('conditional.js', 'utf8');

describe('file', function () {
  it('has if and for loops with stuff in them', function() {

    // This structure doesn't care what's in the for loop
    let structure1 = function() {

      let $small = 14;
      let $big = 31;

      if (_) {
        for (let $ind = $start; $ind < $check; $ind += _) {
        }
      }

    };

    // This structure does care what's in the for loop
    let structure2 = function() {

      let $small = 14;
      let $big = 31;

      if (_) {
        for (let $ind = $start; $ind < $check; $ind += _) {
          $small++;
        }
      }

    };

    const varCallbacks = [
      function($small, $big, $ind, $start, $check) {
        if ($small.name !== 'x') {
          return {failure: 'Expected first variable to be called x'};
        } else if ($big.name !== 'y') {
          return {failure: 'Expected second variable to be called y'};
        } else if ($check.value !== 5) {
          return {failure: 'Expected for loop to end at 5'};
        } else {
          return true;
        }
      }
    ];

    let isMatch1 = Structured.match(code, structure1, {varCallbacks: varCallbacks});
    let isMatch2 = Structured.match(code, structure2, {varCallbacks: varCallbacks});
    let failureMessage = varCallbacks.failure || 'Expected for loop nested in if statement' ;

    assert.isOk(isMatch1 || isMatch2, failureMessage);
  })
})
