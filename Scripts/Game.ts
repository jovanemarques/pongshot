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

    let assetManifest = [
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

        // Items Atlas
        { id: "itemAtlas", src: "./Assets/sprites/itemsAtlas.png" },

        // Items
        { id: "itemArmor", src: "./Assets/images/item_armor.png" },
        { id: "itemBoots", src: "./Assets/images/item_boots.png" },
        { id: "itemHp", src: "./Assets/images/item_hp.png" },
        { id: "itemSpellScroll", src: "./Assets/images/item_spellScroll.png" },
        { id: "itemXp", src: "./Assets/images/item_xp.png" },
        { id: "itemTrap", src: "./Assets/images/item_trap.png" },
    ];

    let itemsSpriteData = {
        images: {},
        frames: [
            [0, 0, 134, 146, 0, -29, -27],
            [134, 0, 14, 10, 0, -1, -2],
            [148, 0, 134, 146, 0, -37, -27],
            [282, 0, 20, 18, 0, 0, 0],
            [302, 0, 30, 32, 0, -1, 0],
            [332, 0, 30, 32, 0, -1, 0],
            [362, 0, 32, 32, 0, 0, 0],
            [394, 0, 32, 32, 0, 0, 0],
            [426, 0, 32, 32, 0, 0, 0],
            [0, 146, 32, 32, 0, 0, 0],
            [32, 146, 32, 32, 0, 0, 0],
            [64, 146, 32, 32, 0, 0, 0],
            [96, 146, 32, 32, 0, 0, 0],
            [128, 146, 30, 30, 0, -1, -1],
            [158, 146, 53, 62, 0, -19, -49],
            [211, 146, 59, 70, 0, -10, -41],
            [270, 146, 52, 77, 0, -7, -34],
            [322, 146, 71, 64, 0, -17, -47],
            [393, 146, 80, 59, 0, -25, -52],
            [0, 223, 74, 57, 0, -25, -54],
            [74, 223, 63, 59, 0, -23, -52],
            [137, 223, 32, 9, 0, 0, -12],
            [169, 223, 56, 56, 0, -102, -101],
            [225, 223, 56, 62, 0, -97, -95],
            [281, 223, 66, 64, 0, -94, -94],
            [347, 223, 92, 57, 0, -91, -98],
            [0, 287, 97, 75, 0, -83, -90],
            [97, 287, 99, 77, 0, -80, -88],
            [196, 287, 104, 62, 0, -76, -98],
            [300, 287, 115, 64, 0, -67, -101],
            [0, 364, 128, 76, 0, -63, -95],
            [128, 364, 110, 83, 0, -59, -91],
            [238, 364, 59, 61, 0, -22, -55],
            [297, 364, 59, 58, 0, -22, -55],
            [356, 364, 59, 61, 0, -22, -55],
            [415, 364, 59, 58, 0, -22, -55],
            [0, 447, 56, 56, 0, -18, -55],
            [56, 447, 56, 62, 0, -13, -50],
            [112, 447, 60, 64, 0, -13, -48],
            [172, 447, 65, 67, 0, -11, -45],
            [237, 447, 52, 58, 0, -22, -53],
            [289, 447, 59, 57, 0, -22, -55],
            [348, 447, 59, 57, 0, -22, -55],
            [407, 447, 60, 57, 0, -21, -55],
            [0, 514, 59, 57, 0, -22, -55],
            [59, 514, 60, 57, 0, -21, -55],
            [119, 514, 59, 57, 0, -22, -55],
            [178, 514, 59, 57, 0, -22, -55],
            [237, 514, 59, 57, 0, -22, -55],
            [296, 514, 59, 57, 0, -22, -55],
            [355, 514, 59, 57, 0, -22, -55],
            [414, 514, 59, 57, 0, -22, -55],
            [0, 571, 59, 57, 0, -22, -55],
            [59, 571, 52, 58, 0, -22, -54],
            [111, 571, 52, 60, 0, -20, -51],
            [163, 571, 50, 62, 0, -24, -50],
            [213, 571, 52, 56, 0, -22, -50],
            [265, 571, 51, 62, 0, -23, -50],
            [316, 571, 35, 53, 0, -28, -58],
            [351, 571, 55, 52, 0, -19, -59],
            [406, 571, 60, 52, 0, -23, -59],
            [0, 633, 61, 49, 0, -17, -62],
            [61, 633, 57, 45, 0, -16, -66],
            [118, 633, 52, 52, 0, -23, -59],
            [170, 633, 38, 53, 0, -26, -58],
            [208, 633, 32, 22, 0, 0, -6],
            [240, 633, 49, 56, 0, -104, -101],
            [289, 633, 60, 64, 0, -97, -93],
            [349, 633, 71, 67, 0, -86, -90],
            [0, 700, 83, 56, 0, -92, -98],
            [83, 700, 83, 72, 0, -84, -90],
            [166, 700, 86, 74, 0, -80, -88],
            [252, 700, 95, 62, 0, -76, -98],
            [347, 700, 115, 64, 0, -67, -101],
            [0, 774, 128, 76, 0, -63, -95],
            [128, 774, 110, 83, 0, -59, -91],
            [238, 774, 48, 56, 0, -19, -60],
            [286, 774, 48, 56, 0, -19, -60],
            [334, 774, 49, 56, 0, -20, -55],
            [383, 774, 56, 62, 0, -13, -50],
            [0, 857, 60, 64, 0, -13, -48],
            [60, 857, 65, 67, 0, -11, -45],
            [125, 857, 48, 52, 0, -19, -60],
            [173, 857, 41, 52, 0, -28, -60],
            [214, 857, 42, 50, 0, -30, -62],
            [256, 857, 43, 50, 0, -30, -62],
            [299, 857, 43, 50, 0, -30, -62],
            [342, 857, 42, 50, 0, -30, -62],
            [384, 857, 43, 50, 0, -30, -62],
            [427, 857, 43, 50, 0, -30, -62],
            [0, 924, 42, 50, 0, -30, -62],
            [42, 924, 41, 52, 0, -28, -60],
            [83, 924, 45, 52, 0, -12, -60],
            [128, 924, 45, 52, 0, -13, -60],
            [173, 924, 45, 52, 0, -13, -60],
            [218, 924, 45, 52, 0, -12, -60],
            [263, 924, 45, 52, 0, -13, -60],
            [308, 924, 45, 52, 0, -13, -60],
            [353, 924, 45, 52, 0, -12, -60],
            [398, 924, 33, 53, 0, -28, -58],
            [431, 924, 40, 57, 0, -24, -55],
            [0, 981, 42, 51, 0, -22, -55],
            [42, 981, 40, 57, 0, -23, -55],
            [82, 981, 45, 68, 0, -20, -43],
            [127, 981, 43, 73, 0, -17, -38],
            [170, 981, 79, 73, 0, -28, -37],
            [249, 981, 79, 56, 0, -27, -54],
            [328, 981, 32, 32, 0, 0, 0],
            [360, 981, 54, 60, 0, -103, -97],
            [414, 981, 63, 67, 0, -97, -90],
            [0, 1054, 69, 63, 0, -94, -94],
            [69, 1054, 95, 71, 0, -92, -87],
            [164, 1054, 106, 75, 0, -82, -90],
            [270, 1054, 108, 77, 0, -80, -88],
            [378, 1054, 104, 62, 0, -76, -98],
            [0, 1131, 115, 64, 0, -67, -101],
            [115, 1131, 128, 76, 0, -63, -95],
            [243, 1131, 110, 83, 0, -59, -91],
            [353, 1131, 63, 62, 0, -21, -53],
            [416, 1131, 63, 59, 0, -21, -53],
            [0, 1214, 63, 62, 0, -21, -53],
            [63, 1214, 63, 59, 0, -21, -53],
            [126, 1214, 53, 60, 0, -20, -51],
            [179, 1214, 77, 62, 0, -13, -50],
            [256, 1214, 65, 66, 0, -13, -46],
            [321, 1214, 65, 67, 0, -11, -45],
            [386, 1214, 63, 58, 0, -21, -53],
            [0, 1281, 54, 66, 0, -22, -45],
            [54, 1281, 46, 77, 0, -18, -34],
            [100, 1281, 46, 79, 0, -15, -32],
            [146, 1281, 46, 77, 0, -18, -34],
            [192, 1281, 54, 66, 0, -22, -45],
            [246, 1281, 63, 58, 0, -21, -53],
            [309, 1281, 65, 56, 0, -19, -55],
            [374, 1281, 65, 56, 0, -23, -55],
            [0, 1360, 63, 56, 0, -25, -55],
            [63, 1360, 65, 56, 0, -23, -55],
            [128, 1360, 65, 56, 0, -19, -55],
            [193, 1360, 56, 58, 0, -27, -53],
            [249, 1360, 66, 60, 0, -23, -52],
            [315, 1360, 67, 54, 0, -22, -52],
            [382, 1360, 66, 60, 0, -23, -52],
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
            mageAttack: { frames: [14, 15, 16, 17, 18, 19, 20], speed: 0.5, next: "mage" },
            mageBullet: { frames: [21] },
            mageDeath: { frames: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31], speed: 0.2, next: "mageDeathEnd" },
            mageDeathEnd: 31,
            mageDown: { frames: [32, 33, 34, 35] },
            mageHurt: { frames: [36, 37, 38, 39], speed: 0.5, next: "mage" },
            mageIdle: { frames: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53], speed: 0.15 },
            mageMove: { frames: [54] },
            mageUp: { frames: [55, 56, 57] },
            rogue: 82,
            rogueAttack: { frames: [58, 59, 60, 61, 62, 63, 64], speed: 0.5, next: "rogue" },
            rogueBullet: { frames: [65] },
            rogueDeath: { frames: [66, 67, 68, 69, 70, 71, 72, 73, 74, 75], speed: 0.2, next: "rogueDeathEnd" },
            rogueDeathEnd: 75,
            rogueDownStart: { frames: [99, 99], speed: 0.5, next: "rogueDown" },
            rogueDown: { frames: [76, 77] },
            rogueHurt: { frames: [78, 79, 80, 81], speed: 0.5, next: "rogue" },
            rogueIdle: { frames: [82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98], speed: 0.15 },
            rogueMove: { frames: [99] },
            rogueUpStart: { frames: [99, 99], speed: 0.5, next: "rogueUp" },
            rogueUp: { frames: [100, 101, 102] },
            warrior: 126,
            warriorAttack: { frames: [103, 104, 105, 106], speed: 0.5, next: "warrior" },
            warriorBullet: { frames: [107] },
            warriorDeath: {
                frames: [108, 109, 110, 111, 112, 113, 114, 115, 116, 117],
                speed: 0.2,
                next: "warriorDeathEnd",
            },
            warriorDeathEnd: 117,
            warriorDown: { frames: [118, 119, 120, 121] },
            warriorHurt: { frames: [122, 123, 124, 125], speed: 0.5, next: "warrior" },
            warriorIdle: { frames: [126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137], speed: 0.15 },
            warriorMove: { frames: [138] },
            warriorUp: { frames: [139, 140, 141] },
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
