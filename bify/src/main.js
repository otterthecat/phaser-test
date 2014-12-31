var mainState = function (game) {

	return = {
		create: function (){
			console.log('starting main.js');

			// background
			var background = game.add.tileSprite(0, 0, 800, 600, 'background');
			background.alpha = 0.7;
			this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
			this.player.anchor.setTo(0.5, 0.5);

			game.physics.arcade.enable(this.player);
			this.player.body.gravity.y = 400;
			this.PLAYER_DIRECTION = 'RIGHT';

			this.jumpSound = game.add.audio('jump');
			this.jumpSound.volume = 0.5;
			this.jumpSound.addMarker('jumpMark', 0.1, 0.8);

			this.creeps = game.add.group();
			this.creeps.enableBody = true;
			this.creeps.physicsBodyType = Phaser.Physics.ARCADE;
			this.creeps.createMultiple(10, 'player');
			this.creeps.setAll('anchor.x', 0.5);
			this.creeps.setAll('anchor.y', 0.5);
			this.creeps.setAll('outOfBoundsKill', true);
			this.creeps.setAll('checkWorldBounds', true);
			this.creeps.setAll('body.gravity.y', 400);
			this.creeps.setAll('tint', 0xFF0033);

			launchCreep.call(this);

			function launchCreep() {

				var _this = this;
				var MIN_BLOCK_SPACING = 300;
				var MAX_BLOCK_SPACING = 3600;
				var BLOCK_SPEED = -200;

				var creep = _this.creeps.getFirstExists(false);
				if (creep) {
					creep.reset(game.width / 2, -20);
					creep.body.bounce.y = 0.6;
					creep.body.bounce.x = 1;
					creep.body.velocity.x = game.rnd.integerInRange(0, 10) % 2 ? 75 : -75;
				}
				game.time.events.add(game.rnd.integerInRange(MIN_BLOCK_SPACING, MAX_BLOCK_SPACING), launchCreep.bind(_this));
			}

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

			this.bullets = game.add.group();
			this.bullets.enableBody = true;
			this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
			this.bullets.createMultiple(1, 'bullet');
			var anchorX = this.PLAYER_DIRECTION === 'LEFT' ? 0 : 1;
			this.bullets.setAll('anchor.x', anchorX);
			this.bullets.setAll('anchor.y', 0.5);
			this.bullets.setAll('outOfBoundsKill', true);
			this.bullets.setAll('checkWorldBounds', true);

			this.spacekey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

			this.shoot = function() {
				//  Grab the first bullet we can from the pool
				var bullet = this.bullets.getFirstExists(false);

				if (bullet){
					//  And fire it
					bullet.reset(this.player.x, this.player.y);
					bullet.body.velocity.x = this.PLAYER_DIRECTION === 'LEFT' ? -200 : 200;
				}
			}
		},

		update: function (){

			// set the "darkness" and use it to cover the game
			this.shadowTexture.context.fillStyle = 'rgb(40, 40, 40)';
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
			game.physics.arcade.collide(this.player, this.layer);
			game.physics.arcade.collide(this.creeps, this.layer);
			game.physics.arcade.collide(this.player, this.creeps, function(player, enemy){
				enemy.kill();
			}, null, this);

			game.physics.arcade.collide(this.bullets, this.creeps, function(bullet, enemy){
				bullet.kill();
				enemy.kill();
			}, null, this);

			// move player
			if (this.cursor.left.isDown) {
				this.player.body.velocity.x = -160;
				this.PLAYER_DIRECTION = 'LEFT';
			}
			else if (this.cursor.right.isDown) {
				this.player.body.velocity.x = 160;
				this.PLAYER_DIRECTION = 'RIGHT';
			}
			else {
				// stop player
				this.player.body.velocity.x = 0;
			}

			if(this.spacekey.isDown){
				this.shoot.call(this);
			}

			// Player must be touching the ground to jump
			// note the .onFloor() call, which is used when tilemaps are implemented
			if (this.cursor.up.isDown && this.player.body.onFloor()) {
				this.player.body.velocity.y = -250;
				this.jumpSound.play('jumpMark');
			}

			// if player falls out of world, just have him fall from the sky
			if(this.player.y > 610){
				this.player.y = -20;
			}
		}
	};
};

module.exports = mainState;