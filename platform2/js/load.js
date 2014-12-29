var loadState = {

	preload: function (){

		var preloadLabel = game.add.text(
				game.world.centerX,
				game.world.centerY,
				'-- loading --',
				{
					fill: '#ccc'
				});

		preloadLabel.anchor.setTo(0.5, 0.5);

		var progressBar = game.add.sprite(
			game.world.centerX,
			game.world.centerY + 100, 'progressBar');

		progressBar.anchor.setTo(0.5, 0.5);

		// Phaser will automatically create the progress bar
		// functionality by calling .setPreloadSprite()
		game.load.setPreloadSprite(progressBar);

		// load the game assets
		game.load.image('player', './img/player.png');
		game.load.image('bullet', './img/bullet.png');
		game.load.image('background', './img/sand-background.png');
		game.load.image('sand-floor', './img/sand-floor.png');
		game.load.tilemap('map', 'maps/sandMap.json', null, Phaser.Tilemap.TILED_JSON);

		game.load.audio('jump', ['./audio/jump.mp3', './audio/jump.ogg']);
	},

	create: function (){
		console.log('load.js calling main.js');
		game.state.start('main');
	}
};