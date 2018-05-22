const rewire = require("rewire");
const assert = require('chai').assert;

// A mocked request.json
const event = require('../request-scenes.json');

// A mocked node module called 'alexa-sdk' is created in the node_modules folder
const myModule = rewire("../index-scene-3.js")

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
describe('BookFlightIntent-Scene 3', () => {
  it('confirms intent when dialog not completed, all slots collected, departureDate confirmed, and intent is not confirmed', () => {
    // Set up your test with the desired conditions
    handlers.event.request.dialogState = 'IN_PROGRESS';
    handlers.event.request.intent.slots.arrivalCity.value = 'miami'
    handlers.event.request.intent.slots.departureCity.value = 'new york'
    handlers.event.request.intent.slots.departureCity.confirmationStatus = 'CONFIRMED';
    handlers.event.request.intent.confirmationStatus = 'NONE';

    // Define your expected args to `this.emit`
    const first = ':confirmIntent';

    // Call the handler function
    handlers.BookFlightIntent();

    // Make assertions
    assert.equal(calledEmitWithArgs[0], first, `Expected first arg to this.emit to be ${first}`);
    assert.match(calledEmitWithArgs[1], /(price|cost|\$|dollars)/, 'Expected speechOutput to include `price`, `cost`, `$`, or `dollars`');
    assert.match(calledEmitWithArgs[2], /(price|cost|\$|dollars)/, 'Expected repromptSpeech to include `price`, `cost`, `$`, or `dollars`');
  });

  it('reprompts when intent is denied', () => {
    // Set up your test with the desired conditions
    handlers.event.request.dialogState = 'IN_PROGRESS';
    handlers.event.request.intent.slots.arrivalCity.value = 'miami'
    handlers.event.request.intent.slots.departureCity.value = 'new york'
    handlers.event.request.intent.slots.departureCity.confirmationStatus = 'CONFIRMED';
    handlers.event.request.intent.confirmationStatus = 'DENIED';

    // Define your expected args to `this.emit`
    const first = ':responseReady';

    // Call the handler function
    handlers.BookFlightIntent();

    // Make assertions
    assert.equal(calledEmitWithArgs[0], first, `Expected first arg to this.emit to be ${first}`);
  });
});

