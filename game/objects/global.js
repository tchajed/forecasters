'use strict';

var WeatherForecast = require('./weatherForecast');
var Region = require('./region');

// Global class, containing regions, weather, victory progress, etc.
// forecastDays - positive integer meaning how many days the forecast should show
// regionHeights - an array containing heights (from 0..100) of the regions
// numWorkersPerRegion - amount of workers per region
function Global(game, forecastDays, regionHeights, numWorkersPerRegion) {
  this.game = game;
  this.buildProgress = 0;
  this.supply = 0;
  this.weather = new WeatherForecast(forecastDays);
  this.regions = []
  for(var index in regionHeights) {
    this.regions.push(new Region(this, Number(index), regionHeights[index], numWorkersPerRegion));
  }
}

Global.prototype = {

  nextDay: function() {
    for(var index in this.regions) {
      this.regions[index].nextDay();
    }
    this.weather.nextDay();
  },

  increaseBuildProgress: function(worker) {
    // Currently it doesn't depend on worker, but it may in the future
    this.buildProgress += 1;
    
    if (this.buildProgress >= 100) {
      // You won!
      this.game.won = true;
      this.game.state.start('gameover');
    }
  },

  increaseSupply: function(worker) {
    // Currently it doesn't depend on worker, but it may in the future
    this.supply += 1;
  },

  decreaseSupply: function(worker) {
    // Currently it doesn't depend on worker, but it may in the future
    this.supply -= 1;
  },

};

module.exports = Global;