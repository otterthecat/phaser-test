var Phaser = require('Phaser');

var Creeps = function (game){
	this.game = game;
	this.group = game.add.group();
	this.group.enableBody = true;
	this.group.physicsBodyType = Phaser.Physics.ARCADE;
	this.group.createMultiple(10, 'player');
	this.group.setAll('anchor.x', 0.5);
	this.group.setAll('anchor.y', 0.5);
	this.group.setAll('outOfBoundsKill', true);
	this.group.setAll('checkWorldBounds', true);
	this.group.setAll('body.gravity.y', 400);
	this.group.setAll('tint', 0xFF0033);
};

Creeps.prototype.launchCreep = function (){
	var MIN_SPACING = 300;
	var MAX_SPACING = 3600;

	var _this = this;
	var creep = _this.group.getFirstExists(false);
	if (creep) {
		creep.reset(_this.game.width / 2, -20);
		creep.body.bounce.y = 0.6;
		creep.body.bounce.x = 1;
		creep.body.velocity.x = _this.game.rnd.integerInRange(0, 10) % 2 ? 75 : -75;
	}
	_this.game.time.events.add(_this.game.rnd.integerInRange(MIN_SPACING, MAX_SPACING), _this.launchCreep.bind(_this));
};

module.exports = Creeps;