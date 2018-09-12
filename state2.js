demo.state2 = function (){};
demo.state2.prototype = {
    preload: function (){},
    create: function (){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#caf0f7';
        
        //game.physics.enable();
        //.body.collideWorldBounds = true;
        
        addChangeStateEventListeners();
    },
    update: function (){}  
};
