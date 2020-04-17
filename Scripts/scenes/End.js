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
    var End = /** @class */ (function (_super) {
        __extends(End, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function End() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        // Initializing and Instantiating
        End.prototype.Start = function () {
            // Background
            this._background = new objects.Background(config.Game.ASSETS.getResult("blackBackground"));
            //instantiate a new Text object
            this._endLabel = new objects.Label("Game Over", "80px", "Consolas", "#FFFF00", 620, 80, true);
            this._winnerLabel = new objects.Label("Player " + (config.Game.WINNER + 1) + " Won", "80px", "Consolas", "#FFFF00", 620, 180, true);
            var loserChar;
            var winnerChar;
            var loserSide;
            var winnerSide;
            if (config.Game.WINNER == enums.PlayerId.PLAYER_ONE) {
                loserChar = config.Game.PLAYER2_CHARACTER;
                winnerChar = config.Game.PLAYER1_CHARACTER;
                loserSide = -1;
                winnerSide = 1;
            }
            else {
                loserChar = config.Game.PLAYER1_CHARACTER;
                winnerChar = config.Game.PLAYER2_CHARACTER;
                loserSide = 1;
                winnerSide = -1;
            }
            this._loserImage = new objects.Image(loserChar + "Death", config.Game.SCREEN_WIDTH * 0.5, config.Game.SCREEN_HEIGHT * 0.5, true);
            this._loserImage.scaleX = 2 * loserSide;
            this._loserImage.scaleY = 2;
            this._winnerImage = new objects.Image(winnerChar + "Idle", config.Game.SCREEN_WIDTH * 0.5, config.Game.SCREEN_HEIGHT * 0.5, true);
            this._winnerImage.scaleX = 2.5 * winnerSide;
            this._winnerImage.scaleY = 2.5;
            config.Game.SOUND_MANAGER.PlaySound("winner", 0.25);
            // buttons
            this._backButton = new objects.Button("btnBack", 620, 580, true);
            this.Main();
        };
        End.prototype.Update = function () {
            if (!this._winnerShow && this._loserImage.currentAnimation.match(".*DeathEnd")) {
                this.addChild(this._winnerLabel);
                this.addChild(this._winnerImage);
                this.removeChild(this._loserImage);
            }
        };
        End.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._endLabel);
            this.addChild(this._backButton);
            this.addChild(this._loserImage);
            this._backButton.on("click", function () {
                config.Game.SCENE = scenes.State.START;
            });
        };
        return End;
    }(objects.Scene));
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=End.js.map