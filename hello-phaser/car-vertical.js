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
            blocks.physicsBodyType = Phaser.Physics.ARCADE;
            blocks.createMultiple(5, 'block');
            blocks.setAll('anchor.x', 0.5);
            blocks.setAll('anchor.y', 0.5);
            blocks.setAll('outOfBoundsKill', true);
            blocks.setAll('checkWorldBounds', true);
            launchBlock();

            function launchBlock() {
                var MIN_BLOCK_SPACING = 300;
                var MAX_BLOCK_SPACING = 1800;
                var BLOCK_SPEED = -300;

                var block = blocks.getFirstExists(false);
                if (block) {
                    block.reset(game.rnd.integerInRange(0, game.width), 728);
                    block.body.velocity.y = BLOCK_SPEED;
                    block.body.drag.x = 100;
                }
                game.time.events.add(game.rnd.integerInRange(MIN_BLOCK_SPACING, MAX_BLOCK_SPACING), launchBlock);
            }


            car = game.add.sprite(game.world.centerX, game.world.centerY, 'car');
            car.name = 'car';
            car.anchor.set(0.5);

            game.physics.enable(car, Phaser.Physics.ARCADE);
            car.body.collideWorldBounds = true;
            car.body.bounce.set(0);

            cursors = game.input.keyboard.createCursorKeys();

            game.world.setBounds(0, 0, 800, 600);
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