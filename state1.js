demo.state1 = function (){};
demo.state1.prototype = {
    preload: function (){},
    create: function (){
        game.stage.backgroundColor = '#ffe6e6'
        
        addChangeStateEventListeners();
    },
    update: function (){}  
};