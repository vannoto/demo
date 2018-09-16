demo.state2 = function (){};
demo.state2.prototype = {
    preload: function (){
        game.load.image('BG', 'assets/backgrounds/gameBG.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('medium cloud', 'assets/midcloud.png');
        game.load.image('small cloud', 'assets/smallcloud.png');
        game.load.image('tiny cloud', 'assets/tinycloud.png');
        game.load.image('yarn', 'assets/yarn.png');
        game.load.spritesheet('cat', 'assets/sprites/cattoSheet.png', 130, 192);
        game.load.image('dog', 'assets/sprites/doggo.png');
        
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
        
        var ledge = platforms.create(200, 230, 'medium cloud');
        ledge.body.immovable = true;
        
        var ledge = platforms.create(100, 370, 'small cloud');
        ledge.body.immovable = true;
        
        var ledge = platforms.create(10, 150, 'tiny cloud');
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

        var yarn = yarnballs.create(350, 0, 'yarn');
        yarn.body.gravity.y = 200;
        yarn.body.bounce.y = 0.5;
        
        yarn = yarnballs.create(50, 0, 'yarn');
        yarn.body.gravity.y = 200;
        yarn.body.bounce.y = 0.5;
        
        yarn = yarnballs.create(550, 0, 'yarn');
        yarn.body.gravity.y = 200;
        yarn.body.bounce.y = 0.5;
        
        //introduce dogs
        doggos = game.add.group();
        doggos.enableBody = true;
            
        var dog = doggos.create(480, 450, 'dog');
        
        dog = doggos.create(270, 180, 'dog');
        
        //keep score
        scoreText = game.add.text(16, 16, 'score: ' + score, { font: '15pt Comic Sans MS', fill: '#ffffff' });
   
    },
    
    update: function (){
        // make sure sprite doesn't keep moving
        cat.body.velocity.x = 0;
        
        // allows sprite to collide with platform
        var hitPlatform = game.physics.arcade.collide(cat, platforms);
        
        // checks if sprite is touching the ground and resets double jump
        var onGround = cat.body.touching.down;
        
        // allow yarn to collide with platform
        game.physics.arcade.collide(yarnballs, platforms);
        
        // allow dogs to collide with platform
        game.physics.arcade.collide(doggos, platforms);
        
        // call collectYarn function when sprite overlaps with yarn
        game.physics.arcade.overlap(cat, yarnballs, collectYarn, null, this);
        
        // call catKill function when sprite overlaps with dog
        game.physics.arcade.overlap(cat, doggos, catKill, null, this);
        
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
        if (score == 700){
           game.state.start('state4');
            
        }    
    }
}

// collect yarn function
function collectYarn (cat, yarn){
    yarn.kill();
    
    score += 100;
    scoreText.text = 'score: ' + score;
    
}

function catKill (cat, dog){
    cat.kill();
    score = 0;
    game.state.start('state3');
}
