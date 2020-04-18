//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let Game = (function () {
    // variable declarations
    let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
    let stage: createjs.Stage;

    let currentSceneState: scenes.State;
    let currentScene: objects.Scene;

    let assets: createjs.LoadQueue;

    let itemsAtlas: createjs.SpriteSheet;

    let soundManager: managers.Sound;

    let assetManifest = [
        // Images
        { id: "companyLogo", src: "./Assets/images/CompanyLogo.png" },
        { id: "blackBackground", src: "./Assets/images/bg_blackBackground.png" },
        { id: "playBackground", src: "./Assets/images/background.png" },

        // Items Atlas
        { id: "itemAtlas", src: "./Assets/sprites/itemsAtlas.png" },

        // Sounds
        { id: "bgSound", src: "./Assets/audio/background.mp3" },
        { id: "itemHit", src: "./Assets/audio/itemHit.wav" },
        { id: "levelUp", src: "./Assets/audio/levelUp.wav" },
        { id: "mageAttack", src: "./Assets/audio/mageAttack.wav" },
        { id: "mageHit", src: "./Assets/audio/mageHit.wav" },
        { id: "rogueAttack", src: "./Assets/audio/rogueAttack.wav" },
        { id: "rogueHit", src: "./Assets/audio/rogueHit.wav" },
        { id: "warriorAttack", src: "./Assets/audio/warriorAttack.wav" },
        { id: "warriorHit", src: "./Assets/audio/warriorHit.wav" },
        { id: "winner", src: "./Assets/audio/winner.wav" },
    ];

    // All the items sprites
    // Align the first in line 30, so it is easy to identify the frame number index line
    let itemsSpriteData = {
        images: {},
        frames: [
            [0, 0, 200, 200, 0, 0, 0],
            [200, 0, 15, 12, 0, 0, 0],
            [215, 0, 200, 200, 0, 0, 0],
            [415, 0, 20, 18, 0, 0, 0],
            [435, 0, 32, 32, 0, 0, 0],
            [467, 0, 32, 32, 0, 0, 0],
            [499, 0, 32, 32, 0, 0, 0],
            [531, 0, 32, 32, 0, 0, 0],
            [563, 0, 32, 32, 0, 0, 0],
            [595, 0, 32, 32, 0, 0, 0],
            [627, 0, 32, 32, 0, 0, 0],
            [659, 0, 32, 32, 0, 0, 0],
            [691, 0, 32, 32, 0, 0, 0],
            [723, 0, 32, 32, 0, 0, 0],
            [755, 0, 100, 80, 0, 0, 0],
            [855, 0, 100, 80, 0, 0, 0],
            [955, 0, 100, 80, 0, 0, 0],
            [1055, 0, 100, 80, 0, 0, 0],
            [1155, 0, 100, 80, 0, 0, 0],
            [1255, 0, 100, 80, 0, 0, 0],
            [1355, 0, 100, 80, 0, 0, 0],
            [1455, 0, 32, 32, 0, 0, 0],
            [1487, 0, 256, 256, 0, 0, 0],
            [1743, 0, 256, 256, 0, 0, 0],
            [0, 256, 256, 256, 0, 0, 0],
            [256, 256, 256, 256, 0, 0, 0],
            [512, 256, 256, 256, 0, 0, 0],
            [768, 256, 256, 256, 0, 0, 0],
            [1024, 256, 256, 256, 0, 0, 0],
            [1280, 256, 256, 256, 0, 0, 0],
            [1536, 256, 256, 256, 0, 0, 0],
            [1792, 256, 256, 256, 0, 0, 0],
            [0, 512, 100, 80, 0, 0, 0],
            [100, 512, 100, 80, 0, 0, 0],
            [200, 512, 100, 80, 0, 0, 0],
            [300, 512, 100, 80, 0, 0, 0],
            [400, 512, 100, 80, 0, 0, 0],
            [500, 512, 100, 80, 0, 0, 0],
            [600, 512, 100, 80, 0, 0, 0],
            [700, 512, 100, 80, 0, 0, 0],
            [800, 512, 100, 80, 0, 0, 0],
            [900, 512, 100, 80, 0, 0, 0],
            [1000, 512, 100, 80, 0, 0, 0],
            [1100, 512, 100, 80, 0, 0, 0],
            [1200, 512, 100, 80, 0, 0, 0],
            [1300, 512, 100, 80, 0, 0, 0],
            [1400, 512, 100, 80, 0, 0, 0],
            [1500, 512, 100, 80, 0, 0, 0],
            [1600, 512, 100, 80, 0, 0, 0],
            [1700, 512, 100, 80, 0, 0, 0],
            [1800, 512, 100, 80, 0, 0, 0],
            [1900, 512, 100, 80, 0, 0, 0],
            [0, 592, 100, 80, 0, 0, 0],
            [100, 592, 100, 80, 0, 0, 0],
            [200, 592, 100, 80, 0, 0, 0],
            [300, 592, 100, 80, 0, 0, 0],
            [400, 592, 100, 80, 0, 0, 0],
            [500, 592, 100, 80, 0, 0, 0],
            [600, 592, 100, 80, 0, 0, 0],
            [700, 592, 100, 80, 0, 0, 0],
            [800, 592, 100, 80, 0, 0, 0],
            [900, 592, 100, 80, 0, 0, 0],
            [1000, 592, 100, 80, 0, 0, 0],
            [1100, 592, 100, 80, 0, 0, 0],
            [1200, 592, 100, 80, 0, 0, 0],
            [1300, 592, 32, 32, 0, 0, 0],
            [1332, 592, 256, 256, 0, 0, 0],
            [1588, 592, 256, 256, 0, 0, 0],
            [0, 848, 256, 256, 0, 0, 0],
            [256, 848, 256, 256, 0, 0, 0],
            [512, 848, 256, 256, 0, 0, 0],
            [768, 848, 256, 256, 0, 0, 0],
            [1024, 848, 256, 256, 0, 0, 0],
            [1280, 848, 256, 256, 0, 0, 0],
            [1536, 848, 256, 256, 0, 0, 0],
            [1792, 848, 256, 256, 0, 0, 0],
            [0, 1104, 100, 80, 0, 0, 0],
            [100, 1104, 100, 80, 0, 0, 0],
            [200, 1104, 100, 80, 0, 0, 0],
            [300, 1104, 100, 80, 0, 0, 0],
            [400, 1104, 100, 80, 0, 0, 0],
            [500, 1104, 100, 80, 0, 0, 0],
            [600, 1104, 100, 80, 0, 0, 0],
            [700, 1104, 100, 80, 0, 0, 0],
            [800, 1104, 100, 80, 0, 0, 0],
            [900, 1104, 100, 80, 0, 0, 0],
            [1000, 1104, 100, 80, 0, 0, 0],
            [1100, 1104, 100, 80, 0, 0, 0],
            [1200, 1104, 100, 80, 0, 0, 0],
            [1300, 1104, 100, 80, 0, 0, 0],
            [1400, 1104, 100, 80, 0, 0, 0],
            [1500, 1104, 100, 80, 0, 0, 0],
            [1600, 1104, 100, 80, 0, 0, 0],
            [1700, 1104, 100, 80, 0, 0, 0],
            [1800, 1104, 100, 80, 0, 0, 0],
            [1900, 1104, 100, 80, 0, 0, 0],
            [0, 1184, 100, 80, 0, 0, 0],
            [100, 1184, 100, 80, 0, 0, 0],
            [200, 1184, 100, 80, 0, 0, 0],
            [300, 1184, 100, 80, 0, 0, 0],
            [400, 1184, 100, 80, 0, 0, 0],
            [500, 1184, 100, 80, 0, 0, 0],
            [600, 1184, 100, 80, 0, 0, 0],
            [700, 1184, 100, 80, 0, 0, 0],
            [800, 1184, 100, 80, 0, 0, 0],
            [900, 1184, 100, 80, 0, 0, 0],
            [1000, 1184, 100, 80, 0, 0, 0],
            [1100, 1184, 32, 32, 0, 0, 0],
            [1132, 1184, 256, 256, 0, 0, 0],
            [1388, 1184, 256, 256, 0, 0, 0],
            [1644, 1184, 256, 256, 0, 0, 0],
            [0, 1440, 256, 256, 0, 0, 0],
            [256, 1440, 256, 256, 0, 0, 0],
            [512, 1440, 256, 256, 0, 0, 0],
            [768, 1440, 256, 256, 0, 0, 0],
            [1024, 1440, 256, 256, 0, 0, 0],
            [1280, 1440, 256, 256, 0, 0, 0],
            [1536, 1440, 256, 256, 0, 0, 0],
            [1792, 1440, 100, 80, 0, 0, 0],
            [1892, 1440, 100, 80, 0, 0, 0],
            [0, 1696, 100, 80, 0, 0, 0],
            [100, 1696, 100, 80, 0, 0, 0],
            [200, 1696, 100, 80, 0, 0, 0],
            [300, 1696, 100, 80, 0, 0, 0],
            [400, 1696, 100, 80, 0, 0, 0],
            [500, 1696, 100, 80, 0, 0, 0],
            [600, 1696, 100, 80, 0, 0, 0],
            [700, 1696, 100, 80, 0, 0, 0],
            [800, 1696, 100, 80, 0, 0, 0],
            [900, 1696, 100, 80, 0, 0, 0],
            [1000, 1696, 100, 80, 0, 0, 0],
            [1100, 1696, 100, 80, 0, 0, 0],
            [1200, 1696, 100, 80, 0, 0, 0],
            [1300, 1696, 100, 80, 0, 0, 0],
            [1400, 1696, 100, 80, 0, 0, 0],
            [1500, 1696, 100, 80, 0, 0, 0],
            [1600, 1696, 100, 80, 0, 0, 0],
            [1700, 1696, 100, 80, 0, 0, 0],
            [1800, 1696, 100, 80, 0, 0, 0],
            [1900, 1696, 100, 80, 0, 0, 0],
            [0, 1776, 100, 80, 0, 0, 0],
            [100, 1776, 100, 80, 0, 0, 0],
        ],
        animations: {
            btnBack: { frames: [0] },
            btnConfirm: { frames: [1] },
            btnPlay: { frames: [2] },
            heart: { frames: [3] },
            armor: { frames: [4] },
            armorDis: { frames: [5] },
            boots: { frames: [6] },
            bootsDis: { frames: [7] },
            itemHp: { frames: [8] },
            spellScroll: { frames: [9] },
            spellScrollDis: { frames: [10] },
            trap: { frames: [11] },
            trapDis: { frames: [12] },
            itemXp: { frames: [13] },
            mage: 40,
            mageAttack: { frames: [14, 15, 16, 17, 18, 19, 20], speed: 0.3, next: "mage" },
            mageBullet: { frames: [21] },
            mageDeath: { frames: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31], speed: 0.1, next: "mageDeathEnd" },
            mageDeathEnd: 31,
            mageDown: { frames: [32, 33, 34, 35], speed: 0.25 },
            mageHurt: { frames: [36, 37, 38, 39], speed: 0.3, next: "mage" },
            mageIdle: { frames: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53], speed: 0.15 },
            mageUpStart: { frames: [54, 54], speed: 0.25, next: "mageUp" },
            mageUp: { frames: [55, 56, 57], speed: 0.25 },
            rogue: 83,
            rogueAttack: { frames: [58, 59, 60, 61, 62, 63, 64], speed: 0.3, next: "rogue" },
            rogueBullet: { frames: [65] },
            rogueDeath: { frames: [66, 67, 68, 69, 70, 71, 72, 73, 74, 75], speed: 0.1, next: "rogueDeathEnd" },
            rogueDeathEnd: 75,
            rogueDown: { frames: [76, 77], speed: 0.4 },
            rogueHurt: { frames: [78, 79, 80, 81], speed: 0.3, next: "rogue" },
            rogueIdle: { frames: [82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98], speed: 0.15 },
            rogueUpStart: { frames: [99, 99], speed: 0.25, next: "rogueUp" },
            rogueUp: { frames: [100, 101, 102], speed: 0.25 },
            warrior: 126,
            warriorAttack: { frames: [103, 104, 105, 106], speed: 0.3, next: "warrior" },
            warriorBullet: { frames: [107] },
            warriorDeath: {
                frames: [108, 109, 110, 111, 112, 113, 114, 115, 116, 117],
                speed: 0.1,
                next: "warriorDeathEnd",
            },
            warriorDeathEnd: 117,
            warriorDown: { frames: [118, 119, 120, 121], speed: 0.25 },
            warriorHurt: { frames: [122, 123, 124, 125], speed: 0.3, next: "warrior" },
            warriorIdle: { frames: [126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137], speed: 0.15 },
            warriorUpStart: { frames: [138, 138], speed: 0.25, next: "warriorUp" },
            warriorUp: { frames: [139, 140, 141], speed: 0.25 },
            armorHalftime: {
                frames: [4, 5],
                speed: 0.8,
            },
            armorExpiring: {
                frames: [4, 5],
                speed: 0.4,
            },
            bootsHalftime: {
                frames: [6, 7],
                speed: 0.8,
            },
            bootsExpiring: {
                frames: [6, 7],
                speed: 0.4,
            },
            spellScroolHalftime: {
                frames: [9, 10],
                speed: 0.8,
            },
            spellScroolExpiring: {
                frames: [9, 10],
                speed: 0.4,
            },
            trapHalftime: {
                frames: [11, 12],
                speed: 0.8,
            },
            trapExpiring: {
                frames: [11, 12],
                speed: 0.4,
            },
        },
    };

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

        // Load the sound manager
        soundManager = new managers.Sound();
        config.Game.SOUND_MANAGER = soundManager;

        // Load the atlas
        itemsSpriteData.images = [assets.getResult("itemAtlas")];
        itemsAtlas = new createjs.SpriteSheet(itemsSpriteData);
        config.Game.ATLAS = itemsAtlas;

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
            case scenes.State.HOWTO:
                console.log("switch to Howto Scene");
                currentScene = new scenes.Howto();
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
        soundManager.AddObjectsToScene(currentScene);
        stage.addChild(currentScene);
    }

    window.addEventListener("load", Preload);
})();
