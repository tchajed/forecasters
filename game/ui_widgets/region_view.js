'use strict';

var WorkerView = require('./worker_view.js');

function RegionView(game, region, x, y) {
  this.game = game;
  this.region = region;

  this.x = x || 0;
  this.y = y || 0;

  var uiGroup = game.add.group();
  this.uiGroup = uiGroup;
  this.uiGroup.x = this.x;
  this.uiGroup.y = this.y;

  uiGroup.create(0, 0, 'city');

  this.createText('Health', 160, 10, 'health', { font: "16px Arial", fill: "#000000" });
  this.createText('Supplies', 160, 32, 'supplies', { font: "16px Arial", fill: "#000000" });

  this.workerViews = new Array(region.workers.length);

  for (var i in region.workers) {
    this.workerViews[i] = new WorkerView(game, region.workers[i], 0, 55*i);
    uiGroup.add(this.workerViews[i].uiGroup);
  }
}

RegionView.prototype = {

update: function() {
  this.txtHealth.text = 'health: ' + Math.floor(this.region.health*100) + '%';
  this.txtSupplies.text = 'supplies: ' + Math.floor(this.region.supplies);
  for (var i in this.workerViews) {
    this.workerViews[i].update();
  }
},

createButton: function(name, x, y, key, callback) {
  var btn = this.game.add.button(x, y, key, callback, this);
  this['btn' + name] = btn;
  this.uiGroup.add(btn);
},

createText: function(name, x, y, text, style) {
  var txt = this.game.add.text(x, y, text, style);
  this['txt' + name] = txt;
  this.uiGroup.add(txt);
},

};

module.exports = RegionView;
