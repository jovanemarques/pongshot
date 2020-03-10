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
            this._player1Label = new objects.Label("Player One", "30px", "Consolas", "#ffcc5c", 300, 200, true);
            this._player2Label = new objects.Label("Player Two", "30px", "Consolas", "#ffcc5c", config.Game.SCREEN_WIDTH - 300, 200, true);
            this._welcomeLabel = new objects.Label("The Game", "80px", "Consolas", "#96ceb2", 640, 100, true);
            // Buttons
            // TODO: create player type images.
            this._startButton = new objects.Button(config.Game.ASSETS.getResult("startButton"), 640, config.Game.SCREEN_HEIGHT - 100, true);
            this._p1AssaultButton = new objects.Button(config.Game.ASSETS.getResult("startButton"), 300, 300, true);
            this._p1SniperButton = new objects.Button(config.Game.ASSETS.getResult("startButton"), 300, 400, true);
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
            this.addChild(this._p1AssaultButton);
            this.addChild(this._p1SniperButton);
            //   this.addChild(this._p2AssaultButton);
            //   this.addChild(this._p2SniperButton);
            this._startButton.on("click", function () {
                config.Game.SCENE = scenes.State.PLAY;
            });
            this._p1AssaultButton.on("click", function () {
                _this._p1Selection = enums.PlayerType.ASSAULT;
            });
            this._p1SniperButton.on("click", function () {
                _this._p1Selection = enums.PlayerType.SNIPER;
            });
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map