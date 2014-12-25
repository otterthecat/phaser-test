var mainState = {
	create: function (){
		console.log('starting main.js');

		this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
		this.player.anchor.setTo(0.5, 0.5);

		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 500;

		// initialize key controls
		this.cursor = game.input.keyboard.createCursorKeys();

		// creating a Phaser Group to better manage multiple wall/floor items
		this.walls = game.add.group();
		this.walls.enableBody = true;

		game.add.sprite(50, 250, 'wall', 0, this.walls);
		game.add.sprite(150, 300, 'wall', 0, this.walls);
		game.add.sprite(250, 350, 'wall', 0, this.walls);

		this.walls.setAll('body.immovable', true);
	},

	update: function (){

		// enable collision
		game.physics.arcade.collide(this.player, this.walls);

		// move player
		if (this.cursor.left.isDown) {
			this.player.body.velocity.x = -200;
		}
		else if (this.cursor.right.isDown) {
			this.player.body.velocity.x = 200;
		}
		else {
		// stop player
		this.player.body.velocity.x = 0;
		}

		// Player must be touching the ground to jump
		if (this.cursor.up.isDown && this.player.body.touching.down) {
			this.player.body.velocity.y = -260;
		}
	}
}