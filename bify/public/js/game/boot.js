var boot = function(game) {
	preload: function (){
		game.load.image('progressBar', 'img/progressBar.png');
	},

	create: function (){
		game.stage.backgroundColor = '#333';
		game.physics.startSystem(Phaser.Physics.ARCADE);

		console.log('boot.js calling load.js');
		game.state.start('load');
	}
};

module.exports = boot;