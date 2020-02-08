//IIFE

let game = (function()
{

    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    let player1:objects.Player;
    let player2:objects.Player;
    let bullet1:objects.Bullet;

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

    function KeyUp(e:KeyboardEvent):void
    {
        console.log(`%c KeyUp ${e.keyCode}`,"color: red; font-size: 20px;")
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
    function KeyDown(e:KeyboardEvent):void
    {
        console.log(`%c KeyDown ${e.keyCode}`,"color: yellow; font-size: 20px;")
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
            case 87:
                bullet1 = new objects.Bullet(player1.position);
                stage.addChild(bullet1);
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
    function Update():void
    {
        //helloLabel.rotation += 3;
        stage.update();
        player1.Update();
        player2.Update();
        if (bullet1 && bullet1.isOutOfBounds()){
            stage.removeChild(bullet1);
        } else if (bullet1){
            bullet1.Update();
        }
    }

    function Main():void
    {
        console.log(`%c Main Started`,"color: green; font-size: 16px;")

        //helloLabel = new objects.Label("HelloWorld", "40px", "Consolas","#000000",320,240,true);
        player1 = new objects.Player();
        player2 = new objects.Player(2);

        // set the pivot point to the center

        stage.addChild(player1);
        stage.addChild(player2);
    }
    window.addEventListener("keyup", e => KeyUp(e));
    window.addEventListener("keydown", e => KeyDown(e));
    //window.addEventListener("keypress", e => KeyPress(e));
    window.addEventListener("load", Start);

})();