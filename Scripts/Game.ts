//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let Game = (function() {
    // variable declarations
    let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
    let stage: createjs.Stage;

    let currentSceneState: scenes.State;
    let currentScene: objects.Scene;

    let assets: createjs.LoadQueue;

    let assetManifest = [
        { id: "button", src: "./Assets/images/button.png" },
        { id: "placeholder", src: "./Assets/images/placeholder.png" },
        { id: "startButton", src: "./Assets/images/startButton.png" },
        { id: "nextButton", src: "./Assets/images/nextButton.png" },
        { id: "backButton", src: "./Assets/images/backButton.png" },
        { id: "ocean", src: "./Assets/images/ocean.gif" },
        { id: "plane", src: "./Assets/images/plane.png" },
        { id: "island", src: "./Assets/images/island.png" },
        { id: "cloud", src: "./Assets/images/cloud.png" },
        { id: "engine", src: "./Assets/audio/engine.ogg" },
        { id: "yay", src: "./Assets/audio/yay.ogg" },
        { id: "thunder", src: "./Assets/audio/thunder.ogg" },
        { id: "bgmap", src: "./Assets/data/background.txt" },
        { id: "fgmap", src: "./Assets/data/foreground.txt" },
        { id: "background", src: "./Assets/sprites/background.png" },
        { id: "foreground", src: "./Assets/sprites/foreground.png" },
        //{ id: " ", src: " " },
        { id: "companyLogo", src: "./Assets/images/CompanyLogo.png" },
        { id: "blackBackground", src: "./Assets/images/BlackBackground.png" },
        { id: "tank", src: "./Assets/images/tank.png" },
        { id: "bullet", src: "./Assets/images/bullet.png" }
    ];

    function Preload(): void {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }

    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start(): void {
        console.log(`%c Game Started!`, "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);

        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.COMPANY_LOGO;
    }

    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update(): void {
        if (currentSceneState != config.Game.SCENE) {
            Main();
        }

        currentScene.Update();

        stage.update();
    }

    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main(): void {
        console.log(`%c Scene Switched...`, "color: green; font-size: 16px;");

        // clean up
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.removeAllChildren();
            stage.removeAllChildren();
        }

        // switch to the new scene
        switch (config.Game.SCENE) {
            case scenes.State.COMPANY_LOGO:
                console.log("switch to Company Logo");
                currentScene = new scenes.CompanyLogo();
                break;
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start();
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play();
                break;
            case scenes.State.END:
                console.log("switch to End Scene");
                currentScene = new scenes.End();
                break;
        }

        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);
    }

    window.addEventListener("load", Preload);
})();
