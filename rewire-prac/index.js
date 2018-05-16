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
    'FindVideoByGenreIntent' : function() {
        const listOfGenres = getListOfGenres();

        if (this.event.request.dialogState === 'STARTED') {
          console.log("in STARTED");
          console.log(JSON.stringify(this.event));

          // Prompt for genre if the dialog state is STARTED
          const slotToElicit = 'genre'
          const speechOutput = 'What genre would you like. You can say ' + listOfGenres
          const repromptSpeech = 'Please tell me the genre for the video you would like. You can say ' + listOfGenres
          this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech)
        } else if (this.event.request.dialogState !== 'COMPLETED') {
            console.log("in not completed");
            console.log(JSON.stringify(this.event));

            // Prompt for genre if it has not already been provided
            if (!this.event.request.intent.slots.genre.value) {
              // slot: genre
              const slotToElicit = 'genre'
              const speechOutput = 'What genre would you like. You can say ' + listOfGenres
              const repromptSpeech = 'Please tell me the genre for the video you would like. You can say ' + listOfGenres
              this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech)
            }
            // if the genre slot has been collected, delegate dialog management back to Alexa.
            else {
              this.emit(':delegate');
            }
        } else {
          // Dialog is now complete and all required slots should be filled,
          const videoTypeRequestedByUser = this.event.request.intent.slots.videoType.value;
          const resolvedVideoTypeToSearchBy = this.event.request.intent.slots.videoType.resolutions.resolutionsPerAuthority[0].values[0].value.name;
          const genreRequestedByUser = this.event.request.intent.slots.genre.value;
          const decade = randomize(["70s","80s","90s"]);
          const videoSelection = videos[resolvedVideoTypeToSearchBy][genreRequestedByUser][decade]
          const recommendedVideo = randomize(videoSelection);

          console.log("recommendedVideo => " + recommendedVideo["title"])

          this.response.speak("Here's a " + videoTypeRequestedByUser + " you might like from the " + genreRequestedByUser + " genre - " + recommendedVideo["title"]);
          this.emit(':responseReady');
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
    },
    'Unhandled': function() {
        this.response.speak('Sorry, I didn\'t get that. What genre?').listen('What genre?');
        this.emit(':responseReady');
    }
};

const videos = {
    "movies":{
      "action":{
          "70s":[
            {"title":"Fist of Fury","year":"1972"},
            {"title":"Rocky","year":"1976"}
          ],
          "80s":[
            {"title":"Raiders of the Lost Ark","year":"1981"},
            {"title":"Die Hard","year":"1988"}
          ],
          "90s":[
            {"title":"Point Break","year":"1991"},
            {"title":"Braveheart","year":"1995"}
      ]},//action
      "comedy":{
          "70s":[
            {"title":"Animal House","year":"1978"},
            {"title":"Young Frankenstein","year":"1974"}
          ],
          "80s":[
            {"title":"Bill and Ted's Excellent Adventure","year":"1989"},
            {"title":"Back to the Future","year":"1985"}
          ],
          "90s":[
          {"title":"Mrs. Doubtfire","year":"1995"},
          {"title":"Friday","year":"1995"}
      ]},//comedy
    "horror":{
        "70s":[
          {"title":"Jaws","year":"1975"},
          {"title":"Carrie","year":"1976"}
        ],
        "80s":[
          {"title":"Friday the 13th","year":"1980"},
          {"title":"Prom Night","year":"1980"}
      ],
      "90s":[
        {"title":"Tremors","year":"1990"},
        {"title":"Silence of the Lambs","year":"1991"}
    ]},//horror
    "drama":{
      "70s":[
        {"title":"Murder on the Orient Express","year":"1974"},
        {"title":"Marathon Man","year":"1976"}
      ],
      "80s":[
        {"title":"Lean on Me","year":"1989"},
        {"title":"Driving Miss Daisy","year":"1989"}
    ],
      "90s":[
        {"title":"Forrest Gump","year":"1994"},
        {"title":"The Shawshank Redemption","year":"1994"}
    ]}//drama
  },//movies
    "tv-show":{
      "action":{
          "70s":[
            {"title":"S.W.A.T.","year":"1975"},
            {"title":"Charlie's Angels","year":"1976"}
          ],
          "80s":[
            {"title":"Miami Vice","year":"1984"},
            {"title":"The A-Team","year":"1983"}
        ],
        "90s":[
          {"title":"Xena: Warrior Princess","year":"1995"},
          {"title":"Mighty Morphin Power Rangers","year":"1993"}
      ]},//action
      "comedy":{
          "70s":[
            {"title":"M*A*S*H","year":"1972"},
            {"title":"The Jeffersons","year":"1975"}
          ],
          "80s":[
            {"title":"Cheers","year":"1982"},
            {"title":"Alf","year":"1986"}
          ],
          "90s":[
          {"title":"Freaks and Geeks","year":"1999"},
          {"title":"The Fresh Prince of Bel-Air","year":"1990"}
    ]},//comedy
    "horror":{
        "70s":[
          {"title":"Kolchak: The Night Stalker","year":"1974"},
          {"title":"Night Gallery","year":"1970"}
        ],
        "80s":[
          {"title":"Tales from the Crypt","year":"1989"},
          {"title":"Alfred Hitchcock Presents","year":"1985"}
        ],
        "90s":[
        {"title":"Buffy the Vampire Slayer","year":"1997"},
        {"title":"The X-Files","year":"1993"}
    ]},//horror
    "drama":{
      "70s":[
        {"title":"Fantasy Island","year":"1977"},
        {"title":"Kojack","year":"1973"}
      ],
      "80s":[
        {"title":"L.A. Law","year":"1986"},
        {"title":"Murder, She Wrote","year":"1984"}
    ],
      "90s":[
        {"title":"Twin Peaks","year":"1990"},
        {"title":"ER","year":"1994"}
    ]}//drama
  }//tv-show
};

function getListOfGenres() {
  var availableGenres = ""
  for (var genre in videos["movies"]){
    availableGenres = genre + ", " + availableGenres
  }
  return availableGenres;
}

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

