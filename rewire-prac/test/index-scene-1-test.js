const rewire = require("rewire");
const assert = require('chai').assert;

// A mocked request.json
const event = require('../request-scenes.json');

// A mocked node module called 'alexa-sdk' is created in the node_modules folder
const myModule = rewire("../index-scene-1.js")

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
describe('BookFlightIntent-Scene 1', () => {
  it('elicits slot when dialog not completed and arrivalCity not collected', () => {
    // Set up your test with the desired conditions
    handlers.event.request.dialogState = 'IN_PROGRESS';
    delete handlers.event.request.intent.slots.arrivalCity.value;
    handlers.event.request.intent.slots.arrivalCity.confirmationStatus = 'NONE';
    handlers.event.request.intent.confirmationStatus = 'NONE';

    // Define your expected args to `this.emit`
    const first = ':elicitSlot';
    const second = 'arrivalCity';
    const third = 'miami, san francisco, seattle, new york';
    const fourth = third;

    // Call the handler function
    handlers.BookFlightIntent();

    // Make assertions
    assert.equal(calledEmitWithArgs[0], first, `Expected first arg to this.emit to be ${first}`);
    assert.equal(calledEmitWithArgs[1], second, `Expected second arg to this.emit to be ${second}`);
    assert.include(calledEmitWithArgs[2].toLowerCase(), third, `Expected third arg to this.emit to include: ${third}`);
    assert.include(calledEmitWithArgs[3], fourth, `Expected fourth arg to this.emit to include: ${fourth}`);
  });

  it('delegates when dialog not completed and arrivalCity is collected', () => {
    // Set up your test with the desired conditions
    handlers.event.request.dialogState = 'IN_PROGRESS';
    handlers.event.request.intent.slots.arrivalCity.value = 'miami';
    handlers.event.request.intent.slots.arrivalCity.confirmationStatus = 'NONE';
    handlers.event.request.intent.confirmationStatus = 'NONE';

    // Define your expected args to `this.emit`
    const first = ':delegate';

    // Call the handler function
    handlers.BookFlightIntent();

    // Make assertions
    assert.equal(calledEmitWithArgs[0], first, `Expected first arg to this.emit to be ${first}`);
  });
});

