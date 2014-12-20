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
            terrain = game.add.tileSprite(50, 0, 700, 600, 'terrain');


            blocks = game.add.group();
            blocks.enableBody = true;

            // randomly create, position, and config individual blocks
            for (var i = 1; i < 2; i += 1){
                var block = blocks.create((i * 30) + 50, i * 200, 'block');
                block.body.collideWorldBounds = true;
                block.body.bounce.setTo(1, 0.7);
                block.body.velocity.setTo(0, 100);
            }


            car = game.add.sprite(game.world.centerX, game.world.centerY, 'car');
            car.name = 'car';
            car.anchor.set(0.5);

            game.physics.enable(car, Phaser.Physics.ARCADE);
            car.body.collideWorldBounds = true;
            car.body.bounce.set(0);

            cursors = game.input.keyboard.createCursorKeys();
        }

        function update () {

            game.physics.arcade.collide(car, blocks);

            if (cursors.left.isDown) {
                car.body.velocity.x = -200;
            }
            else if (cursors.right.isDown) {
                car.body.velocity.x = 200;
            }

            if (cursors.up.isDown) {
                terrain.tilePosition.y += 5;
            }
            else if (cursors.down.isDown) {
                terrain.tilePosition.y -= 5;
            }
        }

        function render () {
            // uncomment to view debug bounding box
            game.debug.body(car);
        }
    };