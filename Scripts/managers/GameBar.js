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
        }
        Object.defineProperty(GameBar.prototype, "ScreenObjects", {
            // PUBLIC PROPERTIES
            get: function () {
                return [this._timerLabel];
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
        return GameBar;
    }());
    managers.GameBar = GameBar;
})(managers || (managers = {}));
//# sourceMappingURL=GameBar.js.map