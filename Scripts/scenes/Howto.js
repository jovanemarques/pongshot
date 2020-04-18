"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Howto = /** @class */ (function (_super) {
        __extends(Howto, _super);
        // CONSTRUCTOR
        function Howto() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        Howto.prototype.Start = function () {
            // Background
            this._background = new objects.Background(config.Game.ASSETS.getResult("blackBackground"));
            // Labels
            this._charactersLabel = new objects.Label("Characters", "60px", "Pixel", "#ffcc5c", 400, 150, true);
            this._itemsLabel = new objects.Label("Items", "60px", "Pixel", "#ffcc5c", 800, 150, true);
            this._mageLabel = new objects.Label('Mage \n Atk. Power: 20 / 32 \n Atk. Speed: 120 / 80 \n Armor: 6 / 10', "30px", "Pixel", "#FFFFFF", 400, 250, true);
            this._rogueLabel = new objects.Label('Rogue \n Atk. Power: 12 / 20 \n Atk. Speed: 80 / 48 \n Armor: 10 / 14', "30px", "Pixel", "#FFFFFF", 400, 350, true);
            this._warriorLabel = new objects.Label('Warrior \n Atk. Power: 15 / 23 \n Atk. Speed: 90 / 70 \n Armor: 12 / 20 \n', "30px", "Pixel", "#FFFFFF", 400, 450, true);
            this._gameTitle = new objects.Label("Pongshot - How to play", "120px", "Pixel", "#96ceb2", config.Game.SCREEN_WIDTH / 2, 50, true);
            // Buttons
            this._backButton = new objects.Button("btnBack", 90, 630, true);
            //Items
            this._armorItem = new objects.Image("armor", 700, 265, true);
            this._armorLabel = new objects.Label('2x Armor (15s)', "30px", "Pixel", "#FFFFFF", 750, 250, false);
            this._spellScrollItem = new objects.Image("spellScroll", 700, 315, true);
            this._spellScrollLabel = new objects.Label('2x Atack Power (15s)', "30px", "Pixel", "#FFFFFF", 750, 300, false);
            this._bootsItem = new objects.Image("boots", 700, 365, true);
            this._bootsLabel = new objects.Label('2x Attack Speed (15s)', "30px", "Pixel", "#FFFFFF", 750, 350, false);
            this._trapItem = new objects.Image("trap", 700, 415, true);
            this._trapLabel = new objects.Label('Trap enemy (5s)', "30px", "Pixel", "#FFFFFF", 750, 400, false);
            this._itemHpItem = new objects.Image("itemHp", 700, 465, true);
            this._itemHpLabel = new objects.Label('HP potion (25%)', "30px", "Pixel", "#FFFFFF", 750, 450, false);
            this._itemXpItem = new objects.Image("itemXp", 700, 515, true);
            this._itemXpLabel = new objects.Label('XP potion (10 XP)', "30px", "Pixel", "#FFFFFF", 750, 500, false);
            this._trapItem.filters = [
                new createjs.ColorFilter(0, 0, 0, 1, 255, 255, 255, 0)
            ];
            this._trapItem.cache(0, 0, 72, 72);
            // Player one
            this._characterMage = new objects.Image("mage", 200, 250, true, 1.5);
            this._characterRogue = new objects.Image("rogue", 200, 350, true, 1.5);
            this._characterWarrior = new objects.Image("warrior", 200, 470, true, 1.5);
            // Player two
            this.Main();
        };
        Howto.prototype.Update = function () { };
        Howto.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._gameTitle);
            this.addChild(this._charactersLabel);
            this.addChild(this._itemsLabel);
            this.addChild(this._mageLabel);
            this.addChild(this._rogueLabel);
            this.addChild(this._warriorLabel);
            this.addChild(this._characterMage);
            this.addChild(this._characterRogue);
            this.addChild(this._characterWarrior);
            this.addChild(this._backButton);
            //Items
            this.addChild(this._armorItem);
            this.addChild(this._armorLabel);
            this.addChild(this._spellScrollItem);
            this.addChild(this._spellScrollLabel);
            this.addChild(this._bootsItem);
            this.addChild(this._bootsLabel);
            this.addChild(this._trapItem);
            this.addChild(this._trapLabel);
            this.addChild(this._itemHpItem);
            this.addChild(this._itemHpLabel);
            this.addChild(this._itemXpItem);
            this.addChild(this._itemXpLabel);
            this._backButton.on("click", function () {
                config.Game.SCENE = scenes.State.START;
            });
        };
        return Howto;
    }(objects.Scene));
    scenes.Howto = Howto;
})(scenes || (scenes = {}));
//# sourceMappingURL=Howto.js.map