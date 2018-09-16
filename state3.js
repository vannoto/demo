demo.state3 = function (){};
demo.state3.prototype = {
    preload: function (){
        game.load.image('gameover', 'assets/backgrounds/gameover.png');
    },
    create: function (){
        game.stage.backgroundColor = '#000000';
        addChangeStateEventListeners();
        
        game.world.setBounds(0, 0, 600, 700);
        var gameover = game.add.sprite(0, 0, 'gameover');
        
    },
    update: function (){}  
};

function changeState(i, stateNum){
    console.log(i);
    game.state.start('state' + stateNum);
}

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}