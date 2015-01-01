var Player = function (game){

	var player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
	player.anchor.setTo(0.5, 0.5);
	game.physics.arcade.enable(player);
	player.body.gravity.y = 400;

	return player;
};


module.exports =  Player;