const rewire = require("rewire");
const assert = require('chai').assert;

// A mocked request.json
const event = require('../request.json');

// A mocked node module called 'alexa-sdk' is created in the node_modules folder
const myModule = rewire("../index.js")

// In index.js, the `handlers` object contains the intent request handlers
// like `LaunchRequest`, `SessionEndedRequest`, etc.
const handlers = myModule.__get__("handlers");

// The handler functions in `handlers` call `this.emit`, `this.event`, etc.
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
handlers.emit = function(a,b,c,d,e) {
  calledEmitWithArgs[0] = a;
  calledEmitWithArgs[1] = b;
  calledEmitWithArgs[2] = c;
  calledEmitWithArgs[3] = d;
  calledEmitWithArgs[4] = e;
}

// In your tests, your inputs will be properties in handlers.event
// like `handlers.event.request.dialogState`
// and your output will be the args passed to `this.emit`
// like `this.emit(':delegate')`
// Make assertions on `calledEmitWithArgs`
describe('FindVideoByGenreIntent', () => {
  it('calls this.emit with 4 specific strings when not completed and no genre collected', () => {
    // Set up your test with the desired conditions
    handlers.event.request.dialogState = 'IN_PROGRESS';
    handlers.event.request.intent.slots.decade.value = '80s'
    handlers.event.request.intent.slots.videoType.value = 'movie'
    delete handlers.event.request.intent.slots.genre.value;

    // Define your expected args to `this.emit`
    const first = ':elicitSlot';
    const second = 'genre';
    const third = 'What genre would you like. You can say';
    const fourth = 'Please tell me the genre for the video you would like. You can say';

    // Call the handler function
    handlers.FindVideoByGenreIntent();

    // Make assertions
    assert.equal(calledEmitWithArgs[0], first, `Expected first arg to be ${first}`);
    assert.equal(calledEmitWithArgs[1], second, `Expected second arg to be ${second}`);
    assert.include(calledEmitWithArgs[2], third, `Expected third arg to include: ${third}`);
    assert.include(calledEmitWithArgs[3], fourth, `Expected fourth arg to include: ${fourth}`);
  });

  it('calls this.emit with delegate when all slots collected', () => {
    // Set up your test with the desired conditions
    handlers.event.request.dialogState = 'IN_PROGRESS';
    handlers.event.request.intent.slots.decade.value = '80s'
    handlers.event.request.intent.slots.videoType.value = 'movie'
    handlers.event.request.intent.slots.genre.value = 'action'

    // Define your expected args to `this.emit`
    const first = ':delegate';

    // Call the handler function
    handlers.FindVideoByGenreIntent();

    // Make assertions
    assert.equal(calledEmitWithArgs[0], first, `Expected first arg to be ${first}`);
  });
});

