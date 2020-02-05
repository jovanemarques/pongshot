//IIFE

let game = (function()
{

    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    let player1:objects.Player;
    let player2:objects.Player;

    /**
     * perform initialization in the start function
     *
     */
    function Start():void
    {
        console.log(`%c Game Started`,"color: blue; font-size: 20px;")
        stage =  new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on('tick', Update);
        Main();

    }
    
    /**
     *this function trigers the events to update 
    *
    */
    function Update():void
    {
        //helloLabel.rotation += 3;
        stage.update();
    }

    function Main():void
    {
        console.log(`%c Main Started`,"color: green; font-size: 16px;")

        //helloLabel = new objects.Label("HelloWorld", "40px", "Consolas","#000000",320,240,true);
        player1 = new objects.Player();
        player2 = new objects.Player();

        // set the pivot point to the center

        stage.addChild(player1);
        stage.addChild(player2);
    }
    window.addEventListener("load", Start);

})();