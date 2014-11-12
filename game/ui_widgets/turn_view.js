'use strict';

function TurnView(game, playState, x, y) {
  this.x = x || 0;
  this.y = y || 0;

  this.game = game;
  this.playState = playState;

  var uiGroup = game.add.group();
  this.uiGroup = uiGroup;
  this.uiGroup.x = this.x;
  this.uiGroup.y = this.y;

  var btn = this.game.add.button(0, 0, 'next_turn', this.nextTurnOnClick, this, 2, 1, 0);
  btn.anchor = {x:0.5, y:0.5};
  this.uiGroup.add(btn);
}

TurnView.prototype = {

update: function() {
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

nextTurnOnClick: function() {
  this.playState.requestNextTurn();
},

};

module.exports = TurnView;
