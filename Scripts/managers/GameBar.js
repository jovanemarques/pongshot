"use strict";
var managers;
(function (managers) {
    var GameBar = /** @class */ (function () {
        // CONSTRUCTOR
        function GameBar() {
            this._plrOneLife = 100;
            this._plrTwoLife = 100;
            this._plrOneXp = 0;
            this._plrTwoXp = 0;
            this._gameStart = new Date().getTime();
            this._plrOneLifeBar = new createjs.Graphics();
            this._plrTwoLifeBar = new createjs.Graphics();
            this._plrOneXpBar = new createjs.Graphics();
            this._plrTwoXpBar = new createjs.Graphics();
            this._timerLabel = new objects.Label("000:00", "48px", "Consolas", "#000000", 640, 40, true);
            this._plrOneHealth = new objects.Label("100", "30px", "Consolas", "#000000", 40, 40, true);
            this._plrTwoHealth = new objects.Label("100", "30px", "Consolas", "#000000", 1000, 40, true);
        }
        Object.defineProperty(GameBar.prototype, "ScreenObjects", {
            // PUBLIC PROPERTIES
            get: function () {
                return [this._timerLabel, this._plrOneHealth, this._plrTwoHealth];
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
            this._plrOneHealth.text = this._plrOneLife.toFixed(0);
            this._plrTwoHealth.text = this._plrTwoLife.toFixed(0);
        };
        GameBar.prototype.PostDamage = function (player, damage) {
            if (player == enums.PlayerId.PLAYER_ONE) {
                this._plrOneLife -= damage;
                if (this._plrOneLife <= 0) {
                    config.Game.SCENE = scenes.State.END;
                }
            }
            else {
                this._plrTwoLife -= damage;
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