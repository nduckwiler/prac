const rewire = require("rewire");
const assert = require('chai').assert;

// A mocked request.json
const event = require('../request.json');

// A mocked node module called 'alexa-sdk' is created in the node_modules folder
const myModule = rewire("../index5.js")

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
  it('calls this.emit with special confirmSlot when dialog not completed, genre is horror, genre not confirmed or denied', () => {
    // Set up your test with the desired conditions
    handlers.event.request.dialogState = 'IN_PROGRESS';
    handlers.event.request.intent.slots.decade.value = '80s';
    handlers.event.request.intent.slots.videoType.value = 'movie';
    handlers.event.request.intent.slots.genre.value = 'horror';
    handlers.event.request.intent.slots.genre.confirmationStatus = 'NONE';

    // Define your expected args to `this.emit`
    const first = ':confirmSlot';
    const second = 'genre';
    const third = 'is an R-rated genre. Are you sure?';
    const fourth = third;

    // Call the handler function
    handlers.FindVideoByGenreIntent();

    // Make assertions
    assert.equal(calledEmitWithArgs[0], first, `Expected first arg to this.emit to be ${first}`);
    assert.equal(calledEmitWithArgs[1], second, `Expected second arg to this.emit to be ${second}`);
    assert.include(calledEmitWithArgs[2], third, `Expected third arg to this.emit to include: ${third}`);
    assert.include(calledEmitWithArgs[3], fourth, `Expected fourth arg to this.emit to include: ${fourth}`);
  });

  it('calls this.emit with standard confirmSlot when dialog not completed, genre is not horror, genre not confirmed or denied', () => {
    // Set up your test with the desired conditions
    handlers.event.request.dialogState = 'IN_PROGRESS';
    handlers.event.request.intent.slots.decade.value = '80s';
    handlers.event.request.intent.slots.videoType.value = 'movie';
    handlers.event.request.intent.slots.genre.value = 'action';
    handlers.event.request.intent.slots.genre.confirmationStatus = 'NONE';

    // Define your expected args to `this.emit`
    const first = ':confirmSlot';
    const second = 'genre';
    const third = "So you're looking for";
    const fourth = third;

    // Call the handler function
    handlers.FindVideoByGenreIntent();

    // Make assertions
    assert.equal(calledEmitWithArgs[0], first, `Expected first arg to this.emit to be ${first}`);
    assert.equal(calledEmitWithArgs[1], second, `Expected second arg to this.emit to be ${second}`);
    assert.include(calledEmitWithArgs[2], third, `Expected third arg to this.emit to include: ${third}`);
    assert.include(calledEmitWithArgs[3], fourth, `Expected fourth arg to this.emit to include: ${fourth}`);
  });
});

