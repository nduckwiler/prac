const rewire = require("rewire");
const assert = require('chai').assert;
const event = require('../request.json');

// A mocked node module called 'alexa-sdk' is created in the node_modules folder
var myModule = rewire("../index.js")


  /*
var handlerObj = {
  APP_ID: 'app_id',
  registerHandlers: function(h) {
    handlers = h;
  },
  execute: function() {
  }
};

var alexaSDKMock = {
  handler: function (event, context, callback) {
    return handlerObj
  }
};
*/

// The `handlers` variable in index.js is an object. We will be using one of 
// its properties, which happens to be a function: `FindVideoByGenreIntent`
var handlers = myModule.__get__("handlers");

// The functions in `handlers` call `this.emit`, `this.reqeuest`, etc.
// This will mock up everything in `this`

// Now you can call `this.event...`
handlers.event = event;

// Now you can call `this.response.speak('blah').listen('blah')`
const listen = function (arg) { return arg; };
const speak = function (arg) { return { listen }; };
handlers.response = { speak };

// Now you can call `this.emit('foo', 'bar', 'baz', 'blah')
// and the args will be stored in `calledEmitWithArgs`
const calledEmitWithArgs = [];
handlers.emit = function(a,b,c,d) {
  calledEmitWithArgs[0] = a;
  calledEmitWithArgs[1] = b;
  calledEmitWithArgs[2] = c;
  calledEmitWithArgs[3] = d;
}

/*
console.log('\nhandlers:')
console.log(handlers);
*/

// Set up your test with the desired conditions
handlers.event.request.dialogState = 'IN_PROGRESS';
handlers.event.request.intent.slots.genre.value = null;

// Then make assertions on calledEmitWithArgs
describe('FindVideoByGenreIntent', () => {
  it('calls this.emit with 4 specific strings', () => {
    const first = ':elicitSlot';
    const second = 'genre';
    const third = 'What genre would you like. You can say drama, horror, comedy, action, ';
    const fourth = 'Please tell me the genre for the video you would like. You can say action, comedy, horror, drama';
    handlers.FindVideoByGenreIntent();
    assert.equal(calledEmitWithArgs[0], first, 'Expected first arg to be :elicitSlot');
    assert.equal(calledEmitWithArgs[1], second, 'Expected second arg to be genre');
    assert.include(calledEmitWithArgs[2], 'What genre', 'Expected third arg to include What genre');
    assert.equal(calledEmitWithArgs[2], third, 'Expected third arg to be What genre would you...');
  });
});

