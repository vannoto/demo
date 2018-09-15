demo.state1 = function (){};
demo.state1.prototype = {
    preload: function (){
        game.load.image('BG', 'assets/backgrounds/gameBG.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('medium cloud', 'assets/midcloud.png');
        game.load.image('small cloud', 'assets/smallcloud.png');
        game.load.image('tiny cloud', 'assets/tinycloud.png');
        game.load.image('yarn', 'assets/yarn.png');
        game.load.spritesheet('cat', 'assets/sprites/cattoSheet.png', 130, 192);
        
    },
    create: function (){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // add background
        game.add.sprite(0, 0, 'BG');
        
        //introduce platforms
        platforms = game.add.group();
        platforms.enableBody = true;
        
        var ground = platforms.create(0, game.world.height - 55, 'ground');
        ground.body.immovable = true;
        
        var ledge = platforms.create(400, 500, 'medium cloud');
        ledge.body.immovable = true;
        
        ledge = platforms.create(-50, 375, 'medium cloud');
        ledge.body.immovable = true;
        
        ledge = platforms.create(450, 150, 'medium cloud');
        ledge.body.immovable = true;
        
        ledge = platforms.create(600, 200, 'small cloud');
        ledge.body.immovable = true;
        
        ledge = platforms.create(100, 100, 'tiny cloud');
        ledge.body.immovable = true;
        
        ledge = platforms.create(300, 210, 'tiny cloud');
        ledge.body.immovable = true;
        
        //introduce cat sprite
        cat = game.add.sprite(32, game.world.height - 150, 'cat');
        game.physics.arcade.enable(cat);
        cat.anchor.setTo(0.5, 0.5);
        cat.scale.setTo(0.4, 0.4);
        cat.body.bounce.y = 0.2;
        cat.body.gravity.y = 500;
        cat.body.collideWorldBounds = true;
        cat.animations.add('walk', [0, 1, 2, 3], 6, true);
        
        //introduce yarn
        yarnballs = game.add.group();

        yarnballs.enableBody = true;

        for (var i = 0; i < 5; i++){
            var yarn = yarnballs.create(i * 150, 0, 'yarn');
            yarn.body.gravity.y = 200;
            yarn.body.bounce.y = 0.5;
        }
        
        
        //keep score
        scoreText = game.add.text(16, 16, 'score: 0', { font: '15pt Comic Sans MS', fill: '#ffffff' });
   
    },
    
    update: function (){
        // make sure sprite doesn't keep moving
        cat.body.velocity.x = 0;
        
        // allows sprite to collide with platform
        var hitPlatform = game.physics.arcade.collide(cat, platforms);
        
        // checks if sprite is touching the ground and resets double jump
        var onGround = cat.body.touching.down;
        
        game.physics.arcade.collide(yarnballs, platforms);
        
        game.physics.arcade.overlap(cat, yarnballs, collectYarn, null, this); //PROBLEM LINE
        
        // control sprite with keyboard
        // horizontal movement
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            cat.scale.setTo(0.4, 0.4);
            cat.body.velocity.x = speed;
            cat.animations.play('walk');
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            cat.scale.setTo(-0.4, 0.4);
            cat.body.velocity.x = -speed;
            cat.animations.play('walk');
        }
        else{
            cat.animations.stop('walk');
            cat.frame = 0;
        }
        
        // vertical movement (jump)
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && onGround && hitPlatform){
            cat.frame = 2;
            cat.body.velocity.y = -420;
        } 
        
        //change state when all yarns collected/max score is reached
        if (score == 40){
           game.state.start('state2');
        }
    }
}

function collectYarn (cat, yarn){
    yarn.kill();
    
    score += 10;
    scoreText.text = 'Score: ' + score;
    
}
