"use strict";
//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
var Game = (function () {
    // variable declarations
    var canvas = document.getElementsByTagName("canvas")[0];
    var stage;
    var currentSceneState;
    var currentScene;
    var assets;
    var assetManifest = [
        // Images
        { id: "companyLogo", src: "./Assets/images/CompanyLogo.png" },
        { id: "blackBackground", src: "./Assets/images/bg_blackBackground.png" },
        { id: "forestBackground", src: "./Assets/images/bg-forest.png" },
        { id: "heart", src: "./Assets/images/heart.png" },
        // Buttons
        { id: "btnConfirm", src: "./Assets/images/btn_confirm.png" },
        { id: "btnPlay", src: "./Assets/images/btn_play.png" },
        { id: "btnConfirm", src: "./Assets/images/btn_confirm.png" },
        { id: "btnBack", src: "./Assets/images/btn_back.png" },
        // Characters
        { id: "mage", src: "./Assets/images/mage.png" },
        { id: "mageAttack", src: "./Assets/images/mage_attack.png" },
        { id: "mageHit", src: "./Assets/images/mage_hit.png" },
        { id: "rogue", src: "./Assets/images/rogue.png" },
        { id: "rogueAttack", src: "./Assets/images/rogue_attack.png" },
        { id: "rogueHit", src: "./Assets/images/rogue_hit.png" },
        // Attacks
        { id: "attack1", src: "./Assets/images/attack1.png" },
        { id: "attack2", src: "./Assets/images/attack2.png" },
        { id: "attackCollision", src: "./Assets/images/attack_collision.png" },
        // Items
        { id: "itemArmor", src: "./Assets/images/item_armor.png" },
        { id: "itemBoots", src: "./Assets/images/item_boots.png" },
        { id: "itemHp", src: "./Assets/images/item_hp.png" },
        { id: "itemSpellScroll", src: "./Assets/images/item_spellScroll.png" },
        { id: "itemXp", src: "./Assets/images/item_xp.png" }
    ];
    function Preload() {
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
    function Start() {
        console.log("%c Game Started!", "color: blue; font-size: 20px; font-weight: bold;");
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
    function Update() {
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
    function Main() {
        console.log("%c Scene Switched...", "color: green; font-size: 16px;");
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
//# sourceMappingURL=Game.js.map