// console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('index.js', 'utf8');

describe('', function () {
  it('', function() {

    // assert that function notation is not used
    assert.notMatch(code, /function/, 'Use arrow notation `() =>` to define functions.');
    /*
    let codeMatch = code.match(/function/);
    assert.isNotOk(codeMatch, '');
    */

    let structureSelector1 = function(){
      const Calculate = {
        sum($arr) {}
      };
    };

    let structureSelector2 = function(){
      const Calculate = {
        sum: ($arr) => {}
      };
    };

    let structureSelector3 = function(){
      Calculate.sum = ($arr) => {};
    };


    let isMatchSelector1 = Structured.match(code, structureSelector1);
    let isMatchSelector2 = Structured.match(code, structureSelector2);
    let isMatchSelector3 = Structured.match(code, structureSelector3);
    let failureMessage = 'Did you declare a method named `sum` that takes one argument in the `Calculate` object?' ;


  assert.isOk(isMatchSelector1 || isMatchSelector2 || isMatchSelector3, failureMessage);
})
})
