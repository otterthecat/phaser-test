var Phaser = require('Phaser');

var Bullets = function (game, sprite){
	this.direction = 'RIGHT';
	this.sprite = sprite;
	this.bullets = game.add.group();
	this.bullets.enableBody = true;
	this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
	this.bullets.createMultiple(1, 'bullet');
	var anchorX = this.direction === 'LEFT' ? 0 : 1;
	this.bullets.setAll('anchor.x', anchorX);
	this.bullets.setAll('anchor.y', 0.5);
	this.bullets.setAll('outOfBoundsKill', true);
	this.bullets.setAll('checkWorldBounds', true);
};

Bullets.prototype.shoot = function (){
	var bullet = this.bullets.getFirstExists(false);

	if (bullet){
		//  And fire it
		bullet.reset(this.sprite.x, this.sprite.y);
		bullet.body.velocity.x = this.direction === 'LEFT' ? -200 : 200;
	}
};

// Currently, we're only making use of LEFT/RIGHT directions
// adding a setter to hopefully make things more verbose when used
Bullets.prototype.setDirection = function (direction) {
	this.direction = direction;
};

Bullets.prototype.setControl = function (key){
	this.control = game.input.keyboard.addKey(key || Phaser.Keyboard.SPACEBAR);
};

module.exports = Bullets;