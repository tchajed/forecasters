
'use strict';
var Decorators = require('./widgets/decorators');
function GameOver() {}

// win text color 405bb2

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '52px Architects Daughter', fill: '#405bb2', align: 'center'};


    if (this.won) {
      this.game.add.sprite(0, 0, 'winbg');
      this.congratsText = this.game.add.text(this.game.world.centerX, 370, 'You won in ' + this.turnsTaken + ' turns!', style);
      this.congratsText.anchor.setTo(0.5, 0.5);
    } else {
      this.game.add.sprite(0, 0, 'losebg');
      this.congratsText = this.game.add.text(this.game.world.centerX, 250, 'You lost in ' + this.turnsTaken + ' turns!', style);
      this.congratsText2 = this.game.add.text(this.game.world.centerX, 325, 'You finished ' + (Math.floor(this.castleProgress*10)/10) + '% of the castle', style);
      this.congratsText.anchor.setTo(0.5, 0.5);
      this.congratsText2.anchor.setTo(0.5, 0.5);
    }

    this.instructionText = this.game.add.text(this.game.world.centerX, 530, 'Click To Play Again', style);
    this.instructionText.anchor.setTo(0.5, 0.5);

    Decorators.fadeIn(this);
    this.endReady = false;
    this.time.events.add(600, function() { this.endReady = true; }, this);
    $('canvas').css('cursor', 'pointer')
  },
  update: function () {
    if(this.endReady && this.game.input.activePointer.justPressed()) {
      this.endReady = false;
      $('canvas').css('cursor', '')
      this.sound.play('click');
      this.game.input.useHandCursor = false;
      Decorators.fadeOut(this, 'play');
    }
  },
  init: function(won, turnsTaken, castleProgress) {
    this.won = won;
    this.turnsTaken = turnsTaken;
    this.castleProgress = castleProgress;
  }
};
module.exports = GameOver;
