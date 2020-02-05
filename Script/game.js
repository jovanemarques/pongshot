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
    function KeyUp(e) {
        console.log("%c KeyUp " + e.keyCode, "color: red; font-size: 20px;");
        switch (e.keyCode) {
            case 65:
            case 68:
                player1.StopMove();
                break;
            case 37:
            case 39:
                player2.StopMove();
                break;
            default:
                break;
        }
    }
    function KeyDown(e) {
        console.log("%c KeyDown " + e.keyCode, "color: yellow; font-size: 20px;");
        switch (e.keyCode) {
            case 65:
                player1.StartMoveUp();
                break;
            case 68:
                player1.StartMoveDown();
                break;
            case 37:
                player2.StartMoveUp();
                break;
            case 39:
                player2.StartMoveDown();
                break;
            default:
                break;
        }
    }
    // function KeyPress(e:KeyboardEvent):void
    // {
    //     console.log(`%c KeyPress ${e.key}`,"color: yellow; font-size: 20px;")
    // }
    /**
     *this function trigers the events to update
    *
    */
    function Update() {
        //helloLabel.rotation += 3;
        stage.update();
        player1.Update();
        player2.Update();
    }
    function Main() {
        console.log("%c Main Started", "color: green; font-size: 16px;");
        //helloLabel = new objects.Label("HelloWorld", "40px", "Consolas","#000000",320,240,true);
        player1 = new objects.Player();
        player2 = new objects.Player(2);
        // set the pivot point to the center
        stage.addChild(player1);
        stage.addChild(player2);
    }
    window.addEventListener("keyup", function (e) { return KeyUp(e); });
    window.addEventListener("keydown", function (e) { return KeyDown(e); });
    //window.addEventListener("keypress", e => KeyPress(e));
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=game.js.map