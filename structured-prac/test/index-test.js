// console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('index.js', 'utf8');

describe('', function () {
  it('', function() {

    // assert that function notation is not used
    assert.notMatch(code, /function/, 'Use arrow notation `() =>` to define functions.');

    let structure1 = function(){
      const Calculate = {
        sum($arr) {}
      };
    };

    let structure2 = function(){
      const Calculate = {
        sum: ($arr) => {}
      };
    };

    let structure3 = function(){
      Calculate.sum = ($arr) => { const x = $ten; };
    };

    const varCallbacks = [
      function($arr, $ten) {
        if ($arr.name !== 'arr') {
          return {failure: 'Expected parameter of `.sum` to be `arr`'};
        } else {
          return true;
        }
      }
    ];

    let isMatch1 = Structured.match(code, structure1, {varCallbacks: varCallbacks});
    let isMatch2 = Structured.match(code, structure2, {varCallbacks: varCallbacks});
    let isMatch3 = Structured.match(code, structure3, {varCallbacks: varCallbacks});
    let failureMessage = varCallbacks.failure || 'Did you declare a method named `sum` that takes one argument in the `Calculate` object?' ;

    assert.isOk(isMatch1 || isMatch2 || isMatch3, failureMessage);
  })
})
