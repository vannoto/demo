var demo = {};
demo.state0 = function (){};
demo.state0.prototype = {
    preload: function (){},
    create: function (){
        game.stage.backgroundColor = '#000000'
        
        addChangeStateEventListeners();
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

function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
    addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
}