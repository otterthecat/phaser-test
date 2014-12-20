    window.onload = function() {

        var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'drive-test', {
            preload: preload,
            create: create,
            update: update,
            render: render
        });
        var car, terrain, cursors, blocks;

        function preload () {
            game.load.image('car', '../car4.png');
            game.load.image('terrain', '../stone.png');
            game.load.image('block', '../block.png');
        }

        function create () {
            game.physics.startSystem(Phaser.Physics.AUTO);
            // when adding tileSprite, we're positioning tiles
            // so as to create a 50px border around the game world
            terrain = game.add.tileSprite(50, 50, 1900, 1900, 'terrain');
            blocks = game.add.group();
            blocks.enableBody = true;

            // randomly create, position, and config individual blocks
            for (var i = 1; i < 6; i += 1){
                var block = blocks.create(i * 300, i * 400, 'block');
                block.body.collideWorldBounds = true;
                block.name = 'block' + block;
                // blocks are not allowed to move when collided
                block.body.moves = false;
            }

            car = game.add.sprite(game.world.centerX, game.world.centerY, 'car');
            car.name = 'car';
            car.anchor.set(0.5);

            game.physics.enable(car, Phaser.Physics.ARCADE);

            car.body.collideWorldBounds = true;
            car.body.bounce.set(0.8);
            car.body.allowRotation = true;

            game.world.setBounds(0, 0, 2000, 2000);
            game.camera.follow(car);
            cursors = game.input.keyboard.createCursorKeys();
        }

        function update () {

            game.physics.arcade.collide(car, blocks);

            car.body.velocity.x = 0;
            car.body.velocity.y = 0;
            car.body.angularVelocity = 0;

            if (cursors.left.isDown) {
                car.body.angularVelocity = -200;
            }
            else if (cursors.right.isDown) {
                car.body.angularVelocity = 200;
            }

            if (cursors.up.isDown) {
                car.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(car.angle - 90, 300));
            }
            else if (cursors.down.isDown) {
                // going in reverse will be slower than driving forwards
                car.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(car.angle + 90, 150));
            }
        }

        function render () {
            // uncomment to view debug bounding box
            // game.debug.body(car);
        }
    };