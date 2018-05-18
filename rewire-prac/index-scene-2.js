'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = undefined;

const SKILL_NAME = 'Flight Booker';
const WELCOME_MESSAGE = 'Welcome to Flight Booker. I can help you find flights from New York to Seattle, San Francisco, and Miami. You can say - find me a flight to Seattle on May 24th, or get me a flight to Miami. What can I help you with?'
const HELP_MESSAGE = 'I can help you find flights from New York to Seattle, San Francisco, and Miami. You can say - find me a flight to Seattle on June 24th, or get me a flight to Miami. What can I help you with?';
const HELP_REPROMPT = 'You can say find me a flight to Seattle on July 24th, or get me a flight to Miami, or, you can say exit... What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const handlers = {
    'LaunchRequest': function () {
        this.response.speak(WELCOME_MESSAGE).listen(HELP_MESSAGE);
        this.emit(':responseReady');
    },
    'BookFlightIntent' : function(){
        console.log(JSON.stringify(this.event));
        const listOfCities = getListOfCities();

        if (this.event.request.dialogState !== "COMPLETED"){

          if (!this.event.request.intent.slots.arrivalCity.value) {
            // Prompt for arrivalCity slot if it has not already been provided
            const slotToElicit = 'arrivalCity'
            const speechOutput = 'What city would you like to fly to. You can say ' + listOfCities
            const repromptSpeech = 'Please tell me the name of the city you would like to fly to. You can say ' + listOfCities
            this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech)
            }
          else if ((this.event.request.intent.slots.arrivalCity.value) && (this.event.request.intent.slots.arrivalCity.confirmationStatus == "NONE"))  {
              const slotToConfirm = 'arrivalCity'
              const arrivalCityRequestedByUser = this.event.request.intent.slots.arrivalCity.value
              const speechOutput = "You said " + arrivalCityRequestedByUser + ", correct?"
              const repromptSpeech = speechOutput
              this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech)
            }
          else if ((this.event.request.intent.slots.arrivalCity.value) && (this.event.request.intent.slots.arrivalCity.confirmationStatus == 'DENIED')){
            // arrivalCity slot comfirmation has been denied
            // Action: set prompt to elicit slot arrivalCity
            const slotToElicit = 'arrivalCity'
            const speechOutput = 'What city would you like to fly to. You can say ' + listOfCities
            const repromptSpeech = 'Please tell me the name of the city you would like to fly to. You can say ' + listOfCities
            this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech)
            }
          else if (!this.event.request.intent.slots.departureCity.value){
            // departureCity NOT not been collected
            // ACTION: confirm the default value for departureCity

            const updatedIntent = this.event.request.intent;
            updatedIntent.slots.departureCity.value = 'new york'
            this.emit(':confirmSlot', 'departureCity', "I'll look for flights out of New York. Is that okay?", 'Is the departure city New York?', updatedIntent);
          }
          else{
              this.emit(":delegate");
          }
        }
        else{
          // Dialog is now complete and all required slots should be filled

          const departureCityRequestedByUser = this.event.request.intent.slots.departureCity.value.toLowerCase();
          const arrivalCityRequestedByUser = this.event.request.intent.slots.arrivalCity.value.toLowerCase();
          const departureDateRequestedByUser = this.event.request.intent.slots.departureDate.value;

          const recommendedFlight = flights[departureCityRequestedByUser][arrivalCityRequestedByUser][departureDateRequestedByUser]
          if (recommendedFlight){
              const speechOutput = "I found a flight from " + departureCityRequestedByUser + " to " + arrivalCityRequestedByUser + " on " +  departureDateRequestedByUser + ". Flight number " +  recommendedFlight["flight_number"] + ", priced at " + recommendedFlight["price"]
              this.response.speak(speechOutput);
              this.emit(':responseReady');
          }
          else{
            const speechOutput = "Sorry, I couldn't find that flight."
            this.response.speak(speechOutput);
            this.emit(':responseReady');
          }
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
        this.response.speak('Sorry, I didn\'t get that. ' + HELP_MESSAGE).listen(HELP_REPROMPT);
        this.emit(':responseReady');
    }
};

const flights = {
    "new york":{ //departure_city
      "seattle":{//arrival_city
          "2018-05-24":{"flight_number":"Eagle Air 100","price":"$400"},
          "2018-06-24":{"flight_number":"Eagle Air 100","price":"$300"},
          "2018-07-24":{"flight_number":"Eagle Air 100","price":"$200"}
        },
      "san francisco":{//arrival_city
          "2018-05-24":{"flight_number":"Eagle Air 101","price":"$400"},
          "2018-06-24":{"flight_number":"Eagle Air 101","price":"$300"},
          "2018-07-24":{"flight_number":"Eagle Air 101","price":"$200"}
        },
      "miami":{//arrival_city
          "2018-05-24":{"flight_number":"Eagle Air 102","price":"$400"},
          "2018-06-24":{"flight_number":"Eagle Air 102","price":"$300"},
          "2018-07-24":{"flight_number":"Eagle Air 102","price":"$200"}
        }
      },
    "seattle":{//departure_city
      "new york":{//arrival_city
          "2018-05-24":{"flight_number":"Eagle Air 103","price":"$400"},
          "2018-06-24":{"flight_number":"Eagle Air 103","price":"$300"},
          "2018-07-24":{"flight_number":"Eagle Air 103","price":"$200"}
        },
      "san francisco":{//arrival_city
          "2018-05-24":{"flight_number":"Eagle Air 104","price":"$400"},
          "2018-06-24":{"flight_number":"Eagle Air 104","price":"$300"},
          "2018-07-24":{"flight_number":"Eagle Air 104","price":"$200"}
        },
      "miami":{//arrival_city
          "2018-05-24":{"flight_number":"Eagle Air 105","price":"$400"},
          "2018-06-24":{"flight_number":"Eagle Air 105","price":"$300"},
          "2018-07-24":{"flight_number":"Eagle Air 105","price":"$200"}
        }
      },
    "san francisco":{//departure_city
      "seattle":{//arrival_city
          "2018-05-24":{"flight_number":"Eagle Air 106","price":"$400"},
          "2018-06-24":{"flight_number":"Eagle Air 106","price":"$300"},
          "2018-07-24":{"flight_number":"Eagle Air 106","price":"$200"}
        },
      "new york":{//arrival_city
          "2018-05-24":{"flight_number":"Eagle Air 107","price":"$400"},
          "2018-06-24":{"flight_number":"Eagle Air 107","price":"$300"},
          "2018-07-24":{"flight_number":"Eagle Air 107","price":"$200"}
        },
      "miami":{//arrival_city
          "2018-05-24":{"flight_number":"Eagle Air 108","price":"$400"},
          "2018-06-24":{"flight_number":"Eagle Air 108","price":"$300"},
          "2018-07-24":{"flight_number":"Eagle Air 108","price":"$200"}
        }
      },
    "miami":{//departure_city
      "seattle":{//arrival_city
          "2018-05-24":{"flight_number":"Eagle Air 109","price":"$400"},
          "2018-06-24":{"flight_number":"Eagle Air 109","price":"$300"},
          "2018-07-24":{"flight_number":"Eagle Air 109","price":"$200"}
        },
      "new york":{//arrival_city
          "2018-05-24":{"flight_number":"Eagle Air 110","price":"$400"},
          "2018-06-24":{"flight_number":"Eagle Air 110","price":"$300"},
          "2018-07-24":{"flight_number":"Eagle Air 110","price":"$200"}
        },
      "san francisco":{//arrival_city
          "2018-05-24":{"flight_number":"Eagle Air 111","price":"$400"},
          "2018-06-24":{"flight_number":"Eagle Air 111","price":"$300"},
          "2018-07-24":{"flight_number":"Eagle Air 111","price":"$200"}
        }
      }
};

function getListOfCities(){
  var availableCities = ""
  for (var city in flights){
    console.log(city)
    availableCities = city + ", " + availableCities
  }
  return availableCities;
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
