"use strict";
var managers;
(function (managers) {
    // Constants
    var HB_HEIGHT = 20;
    var HB_WIDTH = 450;
    var HB_POS_Y = 15;
    var HB_POS_X_P1 = 10;
    var HB_POS_X_P2 = config.Game.SCREEN_WIDTH - HB_WIDTH - 12;
    var GameBar = /** @class */ (function () {
        // CONSTRUCTOR
        function GameBar() {
            this._plrOneLife = 100;
            this._plrTwoLife = 100;
            this._plrOneXp = 0;
            this._plrTwoXp = 0;
            this._gameStart = new Date().getTime();
            this._plrOneLifeBar = new objects.GraphicBar(HB_POS_X_P1, HB_POS_Y, HB_WIDTH, HB_HEIGHT, objects.GameBarType.HEALTH);
            this._plrTwoLifeBar = new objects.GraphicBar(HB_POS_X_P2, HB_POS_Y, HB_WIDTH, HB_HEIGHT, objects.GameBarType.HEALTH);
            this._plrOneXpBar = new createjs.Graphics();
            this._plrTwoXpBar = new createjs.Graphics();
            this._timerLabel = new objects.Label("000:00", "48px", "Consolas", "#000000", 640, 40, true);
        }
        Object.defineProperty(GameBar.prototype, "ScreenObjects", {
            // PUBLIC PROPERTIES
            get: function () {
                return [this._timerLabel, this._plrOneLifeBar, this._plrTwoLifeBar];
            },
            enumerable: true,
            configurable: true
        });
        GameBar.prototype.Update = function () {
            var curMilis = new Date().getTime();
            var secondsDiff = (curMilis - this._gameStart) / 1000;
            var seconds = ("00" + (Math.floor(secondsDiff) % 60)).substr(-2);
            var minutes = ("000" + Math.floor(secondsDiff / 60)).substr(-3);
            this._timerLabel.text = minutes + ":" + seconds;
        };
        GameBar.prototype.PostDamage = function (player, damage) {
            if (player == enums.PlayerId.PLAYER_ONE) {
                this._plrOneLife -= damage;
                this._plrOneLifeBar.Value = this._plrOneLife;
                if (this._plrOneLife <= 0) {
                    config.Game.SCENE = scenes.State.END;
                }
            }
            else {
                this._plrTwoLife -= damage;
                this._plrOneLifeBar.Value = this._plrTwoLife;
                if (this._plrTwoLife <= 0) {
                    config.Game.SCENE = scenes.State.END;
                }
            }
        };
        return GameBar;
    }());
    managers.GameBar = GameBar;
})(managers || (managers = {}));
//# sourceMappingURL=GameBar.js.map