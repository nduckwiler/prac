const rewire = require("rewire");
const assert = require('chai').assert;

// A mocked request.json
const event = require('../request.json');

// A mocked node module called 'alexa-sdk' is created in the node_modules folder
const myModule = rewire("../indexL1E4.js")

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
  it('if dialogState in progress called delegate', () => {
    // Set up your test with the desired conditions
    handlers.event.request.dialogState = 'IN_PROGRESS';

    // Define your expected args to `this.emit`
    const first = ':delegate';

    // Call the handler function
    handlers.FindVideoByGenreIntent();

    // Make assertions
    assert.equal(calledEmitWithArgs[0], first, `Expected first arg to be ${first}`);
  });

  it('if dialogState started called delegate', () => {
    // Set up your test with the desired conditions
    handlers.event.request.dialogState = 'STARTED';

    // Define your expected args to `this.emit`
    const first = ':delegate';

    // Call the handler function
    handlers.FindVideoByGenreIntent();

    // Make assertions
    assert.equal(calledEmitWithArgs[0], first, `Expected first arg to be ${first}`);
  });

  it('if dialogState is completed called main functionality', () => {
    // Set up your test with the desired conditions
    handlers.event.request.dialogState = 'COMPLETED';
    handlers.event.request.intent.slots.decade.value = '80s';
    handlers.event.request.intent.slots.videoType.value = 'movie';
    handlers.event.request.intent.slots.videoType.resolutions.resolutionsPerAuthority[0].values[0].value.name = 'movies';
    handlers.event.request.intent.slots.genre.value = 'action';
    handlers.event.request.intent.slots.genre.confirmationStatus = 'CONFIRMED';
    handlers.event.request.intent.confirmationStatus = 'CONFIRMED';

    // Define your expected args to `this.emit`
    const first = ':responseReady';

    // Call the handler function
    handlers.FindVideoByGenreIntent();

    // Make assertions
    assert.equal(calledEmitWithArgs[0], first, `Expected first arg to be ${first}`);
  });
});

