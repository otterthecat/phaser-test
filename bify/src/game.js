var bootState = require('./boot');
var loadState = require('./load');
var mainState = require('./main');
var Phaser = require('Phaser');

var game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add('boot', bootState(game));
game.state.add('load', loadState(game));
game.state.add('main', mainState(game));

// Kick it all off by starting the boot state
game.state.start('boot');