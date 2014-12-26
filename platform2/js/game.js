var game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('main', mainState);

// Kick it all off by starting the boot state
game.state.start('boot');