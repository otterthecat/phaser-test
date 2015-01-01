var Phaser = require('Phaser');

var Bullets = function (game, sprite){
	this.direction = 'RIGHT';
	this.sprite = sprite;
	this.group = game.add.group();
	this.group.enableBody = true;
	this.group.physicsBodyType = Phaser.Physics.ARCADE;
	this.group.createMultiple(1, 'bullet');
	var anchorX = this.direction === 'LEFT' ? 0 : 1;
	this.group.setAll('anchor.x', anchorX);
	this.group.setAll('anchor.y', 0.5);
	this.group.setAll('outOfBoundsKill', true);
	this.group.setAll('checkWorldBounds', true);
};

Bullets.prototype.shoot = function (){
	var bullet = this.group.getFirstExists(false);

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