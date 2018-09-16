demo.state4 = function (){};
demo.state4.prototype = {
    preload: function (){
        game.load.image('winner', 'assets/backgrounds/winner.png');
    },
    create: function (){
        game.stage.backgroundColor = '#000000';
        
        game.world.setBounds(0, 0, 600, 700);
        var winner = game.add.sprite(0, 0, 'winner');
        
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