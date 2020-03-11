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
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // CONSTRUCTOR
        function Start() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        /**
         * Pallete
         * Orange #ffcc5c
         * Green #96ceb2
         * Red #ff6f69
         * White #ffffff
         */
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            // Background
            this._background = new objects.Image(config.Game.ASSETS.getResult("blackBackground"));
            // Labels
            this._player1Label = new objects.Label("Player One", "60px", "Pixel", "#ffcc5c", 300, 200, true);
            this._player2Label = new objects.Label("Player Two", "60px", "Pixel", "#ffcc5c", config.Game.SCREEN_WIDTH - 300, 200, true);
            this._welcomeLabel = new objects.Label("The Game", "120px", "Pixel", "#96ceb2", 640, 100, true);
            // Buttons
            this._startButton = new objects.Button(config.Game.ASSETS.getResult("btnPlay"), 640, config.Game.SCREEN_HEIGHT - 100, true, 5);
            // Player one
            this._p1MageButton = new objects.Button(config.Game.ASSETS.getResult("mage"), 300, 300, true, 1.5);
            this._p1RogueButton = new objects.Button(config.Game.ASSETS.getResult("rogue"), 300, 400, true, 1.5);
            // Player two
            this._p2MageButton = new objects.Button(config.Game.ASSETS.getResult("mage2"), config.Game.SCREEN_WIDTH - 300, 300, true, 1.5);
            this._p2RogueButton = new objects.Button(config.Game.ASSETS.getResult("rogue2"), config.Game.SCREEN_WIDTH - 300, 400, true, 1.5);
            this.Main();
        };
        Start.prototype.Update = function () { };
        Start.prototype.Main = function () {
            var _this = this;
            this.addChild(this._background);
            this.addChild(this._welcomeLabel);
            this.addChild(this._player1Label);
            this.addChild(this._player2Label);
            this.addChild(this._startButton);
            this.addChild(this._p1MageButton);
            this.addChild(this._p1RogueButton);
            this.addChild(this._p2MageButton);
            this.addChild(this._p2RogueButton);
            this._startButton.on("click", function () {
                config.Game.SCENE = scenes.State.PLAY;
            });
            // Player one handlers.
            this._p1MageButton.on("click", function () {
                _this._p1RogueButton.SetInactive();
                _this._p1MageButton.SetActive();
                _this._p1Selection = enums.PlayerType.MAGE;
            });
            this._p1RogueButton.on("click", function () {
                _this._p1RogueButton.SetActive();
                _this._p1MageButton.SetInactive();
                _this._p1Selection = enums.PlayerType.ROGUE;
            });
            // Player two handlers.
            this._p2MageButton.on("click", function () {
                _this._p2RogueButton.SetInactive();
                _this._p2MageButton.SetActive();
                _this._p2Selection = enums.PlayerType.MAGE;
            });
            this._p2RogueButton.on("click", function () {
                _this._p2RogueButton.SetActive();
                _this._p2MageButton.SetInactive();
                _this._p2Selection = enums.PlayerType.ROGUE;
            });
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map