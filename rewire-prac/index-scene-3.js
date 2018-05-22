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

        if (this.event.request.dialogState !== 'COMPLETED') {
          const intentConfirmationStatus = this.event.request.intent.confirmationStatus;
          const departureCityRequestedByUser = 'new york'; //defaulting departureCity to new york
          const arrivalCityRequestedByUser = this.event.request.intent.slots.arrivalCity.value;
          const departureDateRequestedByUser = this.event.request.intent.slots.departureDate.value;

          // IF DIALOG NOT COMPLETED, ALL SLOTS COLLECTED, 
          // `departureDate` IS CONFIRMED, AND INTENT NOT CONFIRMED, 
          // CONFIRM INTENT WITH PRICE 
          if (arrivalCityRequestedByUser && departureCityRequestedByUser && departureDateRequestedByUser 
            && this.event.request.intent.slots.departureDate.confirmationStatus === 'CONFIRMED'
            && intentConfirmationStatus === 'NONE') {
            const recommendedFlight = flights
              [departureCityRequestedByUser.toLowerCase()]
              [arrivalCityRequestedByUser.toLowerCase()]
              [departureDateRequestedByUser];
            const price = recommendedFlight['price'];

            const speechOutput = 'A flight from ' + departureCityRequestedByUser + ' to ' + arrivalCityRequestedByUser + ' on ' + departureDateRequestedByUser + ' costs ' + price + '. Is that okay?'
            const repromptSpeech = speechOutput;
            this.emit(':confirmIntent', speechOutput, repromptSpeech)
          }
          // ELSE IF INTENT DENIED, 
          // REPROMPT WITH `response.speak.listen` AND `:responseReady`
          else if (intentConfirmationStatus === 'DENIED') {
            this.response.speak('Ok, canceling...What city would you like to fly to? ' + HELP_REPROMPT).listen('What city would you like to fly to?' + HELP_REPROMPT);
            this.emit(':responseReady');
          }
          else {
            this.emit(':delegate');
          }
        }
        else {
          // Dialog is now complete and all required slots should be filled

          const departureCityRequestedByUser = 'new york'; //defaulting departureCity to new york
          const arrivalCityRequestedByUser = this.event.request.intent.slots.arrivalCity.value;
          const departureDateRequestedByUser = this.event.request.intent.slots.departureDate.value;
          const recommendedFlight = flights
            [departureCityRequestedByUser.toLowerCase()]
            [arrivalCityRequestedByUser.toLowerCase()]
            [departureDateRequestedByUser];

          if (recommendedFlight){
              const speechOutput = 'I found a flight from ' + departureCityRequestedByUser + ' to ' + arrivalCityRequestedByUser + ' on ' +  departureDateRequestedByUser + '. Flight number ' +  recommendedFlight['flight_number'] + ', priced at ' + recommendedFlight['price']
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
        console.log('Response: ' + JSON.stringify(this.response));
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
