'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = undefined;

const SKILL_NAME = 'Video Match';
const WELCOME_MESSAGE = 'Welcome to Video Match. I can recommend movies and TV Shows based on genre. You can say - give me an action movie, or find me a funny show. What can I help you with?'
const HELP_MESSAGE = 'You can say - give me an action movie, or find me a funny show, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const handlers = {
    'LaunchRequest': function () {
        this.response.speak(WELCOME_MESSAGE).listen(HELP_MESSAGE);
        this.emit(':responseReady');
    },
    'FindVideoByGenreIntent' : function(){
          if (this.event.request.dialogState !== "COMPLETED") {
            this.emit(":delegate");
          } else {

            // Main functionality (recommend video). Expect dialog to be complete and all required slots filled.
            const videoTypeRequestedByUser = this.event.request.intent.slots.videoType.value;
            const resolvedVideoTypeToSearchBy = this.event.request.intent.slots.videoType.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            const genreRequestedByUser = this.event.request.intent.slots.genre.value;
            const decade = randomize(["70s","80s","90s"]);

            const videoSelection = videos[resolvedVideoTypeToSearchBy][genreRequestedByUser][decade]

            const recommendedVideo = randomize(videoSelection);

            this.response.speak("Here's a " + videoTypeRequestedByUser + " you might like from the " + genreRequestedByUser + " genre - " + recommendedVideo["title"]);
            this.emit(':responseReady');
            // End of main functionality
          }
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        console.log("Response: " + JSON.stringify(this.response));
        console.log('session ended!');
        // this.attributes['endedSessionCount'] += 1;
        // this.emit(':saveState', true); // Be sure to call :saveState to persist your session attributes in DynamoDB
    },
    'Unhandled': function() {
        this.response.speak('Sorry, I didn\'t get that. What city?')
                    .listen('What city?');
        this.emit(':responseReady');
    }
};

const videos = {
    "movies":{
      "action":{
          "70s":[
            {"title":"Action Movie 1","year":"1970"},
            {"title":"Action Movie 2","year":"1975"}
          ],
          "80s":[
            {"title":"Action Movie 3","year":"1980"},
            {"title":"Action Movie 4","year":"1985"}
        ],
        "90s":[
          {"title":"Action Movie 5","year":"1990"},
          {"title":"Action Movie 6","year":"1995"}
      ]},//action
      "comedy":{
          "70s":[
            {"title":"Comedy Movie 1","year":"1970"},
            {"title":"Comedy Movie 2","year":"1975"}
          ],
          "80s":[
            {"title":"Comedy Movie 3","year":"1980"},
            {"title":"Comedy Movie 4","year":"1985"}
        ],
        "90s":[
          {"title":"Comedy Movie 5","year":"1990"},
          {"title":"Comedy Movie 6","year":"1995"}
    ]},//comedy
    "horror":{
        "70s":[
          {"title":"Horror Movie 1","year":"1970"},
          {"title":"Horror Movie 2","year":"1975"}
        ],
        "80s":[
          {"title":"Horror Movie 3","year":"1980"},
          {"title":"Horror Movie 4","year":"1985"}
      ],
      "90s":[
        {"title":"Horror Movie 5","year":"1990"},
        {"title":"Horror Movie 6","year":"1995"}
    ]},//horror
    "drama":{
      "70s":[
        {"title":"Drama Movie 1","year":"1970"},
        {"title":"Drama Movie 2","year":"1975"}
      ],
      "80s":[
        {"title":"Drama Movie 3","year":"1980"},
        {"title":"Drama Movie 4","year":"1985"}
    ],
      "90s":[
        {"title":"Drama Movie 5","year":"1990"},
        {"title":"Drama Movie 6","year":"1995"}
    ]}//drama
  },//movies
    "tv-show":{
      "action":{
          "70s":[
            {"title":"Action TV Show 1","year":"1970"},
            {"title":"Action TV Show 2","year":"1975"}
          ],
          "80s":[
            {"title":"Action TV Show 3","year":"1980"},
            {"title":"Action TV Show 4","year":"1985"}
        ],
        "90s":[
          {"title":"Action TV Show 5","year":"1990"},
          {"title":"Action TV Show 6","year":"1995"}
      ]},//action
      "comedy":{
          "70s":[
            {"title":"Comedy TV Show 1","year":"1970"},
            {"title":"Comedy TV Show 2","year":"1975"}
          ],
          "80s":[
            {"title":"Comedy TV Show 3","year":"1980"},
            {"title":"Comedy TV Show 4","year":"1985"}
        ],
        "90s":[
          {"title":"Comedy TV Show 5","year":"1990"},
          {"title":"Comedy TV Show 6","year":"1995"}
    ]},//comedy
    "horror":{
        "70s":[
          {"title":"Horror TV Show 1","year":"1970"},
          {"title":"Horror TV Show 2","year":"1975"}
        ],
        "80s":[
          {"title":"Horror TV Show 3","year":"1980"},
          {"title":"Horror TV Show 4","year":"1985"}
      ],
      "90s":[
        {"title":"Horror TV Show 5","year":"1990"},
        {"title":"Horror TV Show 6","year":"1995"}
    ]},//horror
    "drama":{
      "70s":[
        {"title":"Drama TV Show 1","year":"1970"},
        {"title":"Drama TV Show 2","year":"1975"}
      ],
      "80s":[
        {"title":"Drama TV Show 3","year":"1980"},
        {"title":"Drama TV Show 4","year":"1985"}
    ],
      "90s":[
        {"title":"Drama TV Show 5","year":"1990"},
        {"title":"Drama TV Show 6","year":"1995"}
    ]}//drama
  }//tv-show
};

function randomize(myData) { // the parameter is an array [] of words or phrases
  var i = 0;
  i = Math.floor(Math.random() * myData.length);
  return(myData[i]);
}

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

