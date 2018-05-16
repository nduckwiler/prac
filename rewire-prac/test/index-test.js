var rewire = require("rewire");
const event = require('../request.json');

var myModule = rewire("../index.js")


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

var handlers = myModule.__get__("handlers");
// define all things starting with `this
handlers.event = event;
const calledArgs = {};
handlers.emit = function(a,b,c,d) {
  calledArgs.a = a;
}

// Then make assertions on calledArgs

console.log(myModule);
console.log(handlers);

handlers.FindVideoByGenreIntent();
