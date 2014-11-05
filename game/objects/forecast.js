'use strict';

var Weather = require('./weather');

var NORMAL = 0;
var DISASTER_FIRST = 1;

function normalize(a)
{
  z = 0;
  for (i in a)
  {
    z += a[i];
  }
  for (i in a)
  {
    a[i] /= z;
  }
}

function Forecast() {
  this.stateProbabilities = { 0 /*NORMAL*/: 1.0 };
  this.weather = new Weather().getModel();
  this.epsilon = 0.01;
}

Forecast.prototype = {
  newDay: function()
  {
    var newProbs = {};
    for (var state in this.stateProbabilities)
    {
      var transition = this.weather.transition(state);
      for (var nextState in transition)
      {
        newProbs[nextState] =
          ((nextState in newProbs) ? 0:newProbs[nextState]) +
          transition[nextState]*this.stateProbabilities[state];
      }
    }
    this.stateProbabilities = newProbs;
  },

  observe: function(rainfall)
  {
    for (var state in this.stateProbabilities)
    {
      this.stateProbabilities[state] *= this.weather.probObsGivenState(rainfall,state);
    }
    normalize(newProbs);
  },

  forecast: function(days)
  {
    var storeProbs = this.stateProbabilities;
    var day = 0;
    var rain = [];
    var disaster = [];
    do
    {
      rain[day] = 0.;
      disaster[day] = 1-this.stateProbabilities[NORMAL];
      for (var state in this.stateProbabilities)
      {
        rain[day] += this.stateProbabilities[state]*this.weather.distGivenState(state).mean;
        console.dir(this.stateProbabilities);
      }
      ++day;
      this.newDay();
    } while(day < days);

    this.stateProbabilities = storeProbs;
    return {rain: rain, disaster: disaster};
  }
};

module.exports = Forecast;
