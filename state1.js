demo.state1 = function (){};
demo.state1.prototype = {
    preload: function (){
        game.load.image('cat', 'assets/sprites/cattoSheet.png');
    },
    create: function (){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#ffe6e6';
        
         cat = game.add.sprite(centerX, centerY, 'cat');
        cat.anchor.setTo(0.5, 0.5);
        
        //game.physics.enable();
        //.body.collideWorldBounds = true;
        
        addChangeStateEventListeners();
    },
    update: function (){
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            cat.x += speed;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            cat.x -= speed;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            cat.y -= speed;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            cat.y += speed;
        }
    }  
};