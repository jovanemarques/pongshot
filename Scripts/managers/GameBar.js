"use strict";
var managers;
(function (managers) {
    // Constants
    var BARS_WIDTH = 450;
    var BARS_POS_X_P1 = 10;
    var BARS_POS_X_P2 = config.Game.SCREEN_WIDTH - BARS_WIDTH - 12;
    var HB_HEIGHT = 18;
    var HB_POS_Y = 10;
    var XPB_HEIGHT = 8;
    var XPB_POS_Y = 35;
    var STATUS_POS_Y = 50;
    var GameBar = /** @class */ (function () {
        // CONSTRUCTOR
        function GameBar() {
            this._plrOneLife = 100;
            this._plrTwoLife = 100;
            this._plrOneXp = 0;
            this._plrTwoXp = 0;
            this._gameStart = new Date().getTime();
            this._plrOneLifeBar = new objects.GraphicBar(BARS_POS_X_P1, HB_POS_Y, BARS_WIDTH, HB_HEIGHT, objects.GameBarType.HEALTH);
            this._plrOneHeartIcon = new objects.Image(config.Game.ASSETS.getResult("heart"), BARS_POS_X_P1 + BARS_WIDTH + 10, HB_POS_Y);
            this._plrOneXpBar = new objects.GraphicBar(BARS_POS_X_P1, XPB_POS_Y, BARS_WIDTH, XPB_HEIGHT, objects.GameBarType.EXPERIENCE);
            this._plrOneStatus = this._createStatusBarImages(BARS_POS_X_P1, STATUS_POS_Y, 25);
            this._plrTwoLifeBar = new objects.GraphicBar(BARS_POS_X_P2, HB_POS_Y, BARS_WIDTH, HB_HEIGHT, objects.GameBarType.HEALTH, true);
            this._plrTwoHeartIcon = new objects.Image(config.Game.ASSETS.getResult("heart"), BARS_POS_X_P2 - 30, HB_POS_Y);
            this._plrTwoXpBar = new objects.GraphicBar(BARS_POS_X_P2, XPB_POS_Y, BARS_WIDTH, XPB_HEIGHT, objects.GameBarType.EXPERIENCE, true);
            this._plrTwoStatus = this._createStatusBarImages(BARS_POS_X_P2 + BARS_WIDTH - 14, STATUS_POS_Y, -25);
            this._timerLabel = new objects.Label("000:00", "48px", "Consolas", "#000000", 640, 40, true);
        }
        Object.defineProperty(GameBar.prototype, "ScreenObjects", {
            // PUBLIC PROPERTIES
            get: function () {
                var result = [
                    this._timerLabel,
                    this._plrOneLifeBar,
                    this._plrTwoLifeBar,
                    this._plrOneXpBar,
                    this._plrTwoXpBar,
                    this._plrOneHeartIcon,
                    this._plrTwoHeartIcon
                ];
                this._plrOneStatus.forEach(function (i) { return result.push(i); });
                this._plrTwoStatus.forEach(function (i) { return result.push(i); });
                return result;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        GameBar.prototype._createStatusBarImages = function (posX, posY, incPosX) {
            var result = new Array();
            var imagesToCreate = ["itemArmor", "itemBoots", "itemSpellScroll"];
            var currentPosX = posX;
            imagesToCreate.forEach(function (item) {
                var image = new objects.Image(config.Game.ASSETS.getResult(item), currentPosX, posY, false);
                image.scaleX = 0.5;
                image.scaleY = 0.5;
                image.alpha = 0.25;
                result.push(image);
                currentPosX += incPosX;
            });
            return result;
        };
        // PUBLIC METHODS
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
                    config.Game.WINNER = enums.PlayerId.PLAYER_TWO;
                }
            }
            else {
                this._plrTwoLife -= damage;
                this._plrTwoLifeBar.Value = this._plrTwoLife;
                if (this._plrTwoLife <= 0) {
                    config.Game.SCENE = scenes.State.END;
                    config.Game.WINNER = enums.PlayerId.PLAYER_ONE;
                }
            }
        };
        return GameBar;
    }());
    managers.GameBar = GameBar;
})(managers || (managers = {}));
//# sourceMappingURL=GameBar.js.map