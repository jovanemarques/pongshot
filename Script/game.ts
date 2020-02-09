//IIFE

let game = (function()
{

    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    let bg:objects.Button;
    let player1:objects.Player;
    let player2:objects.Player;
    let bullets:Array<objects.Bullet> = [];
    let gameBar:objects.GameBar;

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
            case 83:
            case 87:
                player1.StopMove();
                break;
            case 38:
            case 40:
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
            case 87:
                player1.StartMoveUp();
                break;
            case 83:
                player1.StartMoveDown();
                break;
            case 38:
                player2.StartMoveUp();
                break;
            case 40:
                player2.StartMoveDown();
                break;
            case 68:
                let bullet = new objects.Bullet(player1.position);
                bullets.push(bullet);
                stage.addChild(bullet);
                // if ((bullet1 != null) && (bullet1.active)) {
                //     stage.removeChild(bullet1);
                //     bullet1.active = false;
                // }
                // bullet1 = new objects.Bullet(player1.position);
                // stage.addChild(bullet1);
                break;
            case 37:
                let bullet2 = new objects.Bullet(player2.position, true);
                bullets.push(bullet2);
                stage.addChild(bullet2);
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
        gameBar.Update();
        bullets.forEach((e, index) => {
            if (e && e.isOutOfBounds()){
                stage.removeChild(e);
                delete bullets[index];
            } else if (e){
                e.Update();
            }    
        });
    }

    function Main():void
    {
        console.log(`%c Main Started`,"color: green; font-size: 16px;")

        // TODO: need to create a new object to use as backgroung
        // asset from https://opengameart.org/content/2048-digitally-painted-tileable-desert-sand-texture
        // bg =  new objects.Button('./Assets/images/bg-sand-1.png', 0, 0, false);
        // stage.addChild(bg);

        //assets from https://opengameart.org/content/tank-set-2
        player1 = new objects.Player('./Assets/images/tank1.png');
        player2 = new objects.Player('./Assets/images/tank1-p2.png', 2);

        stage.addChild(player1);
        stage.addChild(player2);
        gameBar = new objects.GameBar(stage);
    }
    window.addEventListener("keyup", e => KeyUp(e));
    window.addEventListener("keydown", e => KeyDown(e));
    //window.addEventListener("keypress", e => KeyPress(e));
    window.addEventListener("load", Start);

})();