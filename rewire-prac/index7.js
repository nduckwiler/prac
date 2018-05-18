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
        console.log(JSON.stringify(this.event));
        const listOfGenres = getListOfGenres();

        if (this.event.request.dialogState !== 'COMPLETED'){
          //DIALOG STATE: in progress

          if (!this.event.request.intent.slots.genre.value) {
            // Prompt for genre slot if it has not already been provided

            const slotToElicit = 'genre'
            const speechOutput = 'What genre would you like. You can say ' + listOfGenres
            const repromptSpeech = 'Please tell me the genre for the video you would like. You can say ' + listOfGenres
            this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech)
          }
          else if ((this.event.request.intent.slots.genre.value) && (this.event.request.intent.slots.genre.confirmationStatus != 'CONFIRMED'))  {
            // Genre slot has been collected, but has NOT been confirmed

            if (this.event.request.intent.slots.genre.confirmationStatus !== 'DENIED') {
              // Genre slot status: unconfirmed
              // ACTION: Prompt to confirm genre slot
              const slotToConfirm = 'genre'
              const genreRequestedByUser = this.event.request.intent.slots.genre.value

              if (genreRequestedByUser == 'horror'){
                // Prompt for genre slot confirmation with a custom message if the genre requested is horror

                const speechOutput = genreRequestedByUser + ' is an R-rated genre. Are you sure? '
                const repromptSpeech = speechOutput
                this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech)
              }
              else{
                // Prompt for genre slot confirmation with a standard message if the genre requested is anything but horror

                const speechOutput = "So you're looking for " + genreRequestedByUser  + ", correct?"
                const repromptSpeech = speechOutput
                this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech)
              }
            }
            else {
              // Genre slot status comfirmation has been denied
              // Action: set prompt to elicit slot genre
              const slotToElicit = 'genre'
              const speechOutput = 'What genre would you like. You can say ' + listOfGenres
              const repromptSpeech = 'Please tell me the genre for the video you would like. You can say ' + listOfGenres
              this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech)
            }
          }
          else if ((this.event.request.intent.slots.genre.value) && (this.event.request.intent.slots.genre.confirmationStatus == 'CONFIRMED') && (this.event.request.intent.slots.videoType.value) && this.event.request.intent.confirmationStatus == 'NONE')
          {
            // genre slot has been collected AND confirmed AND
            // videoType slot has been collected AND
            // intent has NOT been confirmed and
            // ACTION: confirm the default value for decade

            if (!this.event.request.intent.slots.decade.value){
              // decade NOT not been collected
              // ACTION: confirm the default value for decade

              const updatedIntent = this.event.request.intent;
              updatedIntent.slots.decade.value = '80s'
              this.emit(':confirmSlot', 'decade', "I'll look for something in the 80s. Is that okay?", 'Is the decade 90s alright?', updatedIntent);
            }
            else if (this.event.request.intent.slots.decade.value){
              // decade has been collected
              // ACTION: confirm the decade slot value

              if (this.event.request.intent.slots.decade.confirmationStatus == 'CONFIRMED'){
                // decade slot has been confirmed
                // ACTION: delegate control back to Alexa

                this.emit(':delegate');
              }
              else if (this.event.request.intent.slots.decade.confirmationStatus == 'DENIED'){
                // decade slot confirmation has been DENIED
                // ACTION: prompt for slot value for decade

                const slotToElicit = 'decade'
                const speechOutput = 'What decade would you like. You can say 70s, 80s, or 90s'
                const repromptSpeech = 'What decade would you like. You can say 70s, 80s, or 90s'
                this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech)
              }
              else{
                // genre slot has been collcted AND confirmed AND
                // videoType slot has been collected AND
                // intent has NOT been confirmed
                // decade slot has been confirmed
                // ACTION: confirm intent
                const videoTypeRequestedByUser = this.event.request.intent.slots.videoType.value;
                const genreRequestedByUser = this.event.request.intent.slots.genre.value;
                const decadeRequestedByUser = this.event.request.intent.slots.decade.value;

                if ((genreRequestedByUser == "comedy") && (videoTypeRequestedByUser == "movie")){
                  // custom intent confirmation message if the request is for a comedy movie
                  const speechOutput = "Aha. I love comedy movies. I’ve got a really good recommendation for you. Do you want me to tell you the comedy movie I found for you from the " + decadeRequestedByUser + "?"
                  const repromptSpeech = "So you're looking for a " + genreRequestedByUser + " " + videoTypeRequestedByUser + " from the " + decadeRequestedByUser + ", right?"
                  this.emit(':confirmIntent', speechOutput, repromptSpeech)
                }
                else{
                  const speechOutput = "Just to confirm, you're looking for a " + genreRequestedByUser + " " + videoTypeRequestedByUser + " from the " + decadeRequestedByUser + ", right?"
                  const repromptSpeech = "So you're looking for a " + genreRequestedByUser + " " + videoTypeRequestedByUser + " from the " + decadeRequestedByUser + ", right?"
                  this.emit(':confirmIntent', speechOutput, repromptSpeech)
                }
              }
            }
          }
          else{
            // genre slot has been collcted AND confirmed AND
            // videoType slot has been collected AND
            // intent has been confirmed
            // ACTION: delegate dialog management back to Alexa.
            const intentConfirmationStatus = this.event.request.intent.confirmationStatus;

            if (intentConfirmationStatus == "DENIED"){
              this.response.speak("Ok, canceling...What genre would you like?").listen("What genre would you like?");
              this.emit(':responseReady');
            }
            else{
              this.emit(":delegate");
            }
          }
        }
        else {
          // Dialog is now complete and all required slots should be filled,
          const videoTypeRequestedByUser = this.event.request.intent.slots.videoType.value;
          const resolvedVideoTypeToSearchBy = this.event.request.intent.slots.videoType.resolutions.resolutionsPerAuthority[0].values[0].value.name;
          const genreRequestedByUser = this.event.request.intent.slots.genre.value;
          const decadeRequestedByUser = this.event.request.intent.slots.decade.value;
          const videoSelection = videos[resolvedVideoTypeToSearchBy][genreRequestedByUser][decadeRequestedByUser]
          const recommendedVideo = randomize(videoSelection);

          console.log("recommendedVideo => " + recommendedVideo["title"])

          this.response.speak("Here's a " + videoTypeRequestedByUser + " you might like in the " + genreRequestedByUser + " genre from the " + decadeRequestedByUser + " - " + recommendedVideo["title"] + ". It was released in the year " + recommendedVideo["year"]);
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

function getListOfGenres(){
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
