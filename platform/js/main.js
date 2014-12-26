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

		// cheap light effect
		this.LIGHT_RADIUS = 50;

		// Create the shadow texture
		this.shadowTexture = game.add.bitmapData(this.game.width, this.game.height);

		// Create an object that will use the bitmap as a texture
		var lightSprite = game.add.image(0, 0, this.shadowTexture);

		// Set the blend mode to MULTIPLY. This will darken the colors of
		// everything below this sprite.
		lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
	},

	update: function (){

		// set the "darkness" and use it to cover the game
		this.shadowTexture.context.fillStyle = 'rgb(50, 50, 50)';
		this.shadowTexture.context.fillRect(0, 0, game.width, game.height);

		// draw the "light"
		this.shadowTexture.context.beginPath();
		this.shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
		this.shadowTexture.context.arc(
			this.player.x,
			this.player.y,
			this.LIGHT_RADIUS,
			0,
			Math.PI*2
		);
		this.shadowTexture.context.fill();

		// This just tells the engine it should update the texture cache
		this.shadowTexture.dirty = true;

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