"use strict";
//IIFE
var game = (function () {
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var player1;
    var player2;
    /**
     * perform initialization in the start function
     *
     */
    function Start() {
        console.log("%c Game Started", "color: blue; font-size: 20px;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on('tick', Update);
        Main();
    }
    /**
     *this function trigers the events to update
     *
     */
    function Update() {
        //helloLabel.rotation += 3;
        stage.update();
    }
    function Main() {
        console.log("%c Main Started", "color: green; font-size: 16px;");
        //helloLabel = new objects.Label("HelloWorld", "40px", "Consolas","#000000",320,240,true);
        player1 = new objects.Player();
        player2 = new objects.Player();
        // set the pivot point to the center
        stage.addChild(player1);
        stage.addChild(player2);
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=game.js.map