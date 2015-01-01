var Bullets = require('./groups/bullets');
var Creeps = require('./groups/creeps');

var mainState = function (game) {

	var player,
		bullets,
		creeps;

	return {

		create: function (){
			console.log('starting main.js');

			// background
			var background = game.add.tileSprite(0, 0, 800, 600, 'background');
			background.alpha = 0.7;

			player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
			player.anchor.setTo(0.5, 0.5);
			game.physics.arcade.enable(player);
			player.body.gravity.y = 400;

			this.jumpSound = game.add.audio('jump');
			this.jumpSound.volume = 0.5;
			this.jumpSound.addMarker('jumpMark', 0.1, 0.8);

			creeps = new Creeps(game);
			creeps.launchCreep();

			// initialize key controls
			this.cursor = game.input.keyboard.createCursorKeys();

			/****** START MAP ******/
			this.map = game.add.tilemap('map');
			// Add the tileset to the map
			this.map.addTilesetImage('sand-floor');
			// Create the layer, by specifying the name of the Tiled layer
			this.layer = this.map.createLayer('Tile Layer 1');

			// Set the world size to match the size of the layer
			this.layer.resizeWorld();
			// Enable collisions for the first element of our tileset (the blue wall)
			this.map.setCollision([1,2,3,4]);

			/****** END MAP *******/

			// cheap light effect
			this.LIGHT_RADIUS = 50;

			// Create the shadow texture
			this.shadowTexture = game.add.bitmapData(this.game.width, this.game.height);

			// Create an object that will use the bitmap as a texture
			var lightSprite = game.add.image(0, 0, this.shadowTexture);

			// Set the blend mode to MULTIPLY. This will darken the colors of
			// everything below this sprite.
			lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

			bullets = new Bullets(game, player);
			this.spacekey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		},

		update: function (){

			// set the "darkness" and use it to cover the game
			this.shadowTexture.context.fillStyle = 'rgb(40, 40, 40)';
			this.shadowTexture.context.fillRect(0, 0, game.width, game.height);

			// draw the "light"
			this.shadowTexture.context.beginPath();
			this.shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
			this.shadowTexture.context.arc(
				player.x,
				player.y,
				this.LIGHT_RADIUS,
				0,
				Math.PI*2
			);
			this.shadowTexture.context.fill();

			// This just tells the engine it should update the texture cache
			this.shadowTexture.dirty = true;

			// enable collision
			game.physics.arcade.collide(player, this.layer);
			game.physics.arcade.collide(creeps.group, this.layer);
			game.physics.arcade.collide(player, creeps.group, function(player, enemy){
				enemy.kill();
			}, null, this);

			game.physics.arcade.collide(bullets.group, creeps.group, function(bullet, enemy){
				bullet.kill();
				enemy.kill();
			}, null, this);

			// move player
			if (this.cursor.left.isDown) {
				player.body.velocity.x = -160;
				bullets.setDirection('LEFT');
			}
			else if (this.cursor.right.isDown) {
				player.body.velocity.x = 160;
				bullets.setDirection('RIGHT');
			}
			else {
				// stop player
				player.body.velocity.x = 0;
			}

			if(this.spacekey.isDown){
				bullets.shoot();
			}

			// Player must be touching the ground to jump
			// note the .onFloor() call, which is used when tilemaps are implemented
			if (this.cursor.up.isDown && player.body.onFloor()) {
				player.body.velocity.y = -250;
				this.jumpSound.play('jumpMark');
			}

			// if player falls out of world, just have him fall from the sky
			if(player.y > 610){
				player.y = -20;
			}
		}
	};
};

module.exports = mainState;