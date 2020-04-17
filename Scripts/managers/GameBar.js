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
    var XP_POTION_VALUE = 10;
    var XP_PER_LEVEL = [20, 30, 40, 80];
    var HP_POTION_VALUE = 25;
    var HP_MAX_VALUE = 100;
    var GameBar = /** @class */ (function () {
        // CONSTRUCTOR
        function GameBar() {
            // This should match the same order as StatusType, so it is easier to get the index
            this._statusOrder = [
                enums.PowerUpTypes.ARMOR,
                enums.PowerUpTypes.ATTACK_POWER,
                enums.PowerUpTypes.ATTACK_SPEED,
                enums.PowerUpTypes.TRAP,
            ];
            this._plrOneLife = 100;
            this._plrTwoLife = 100;
            this._plrOneXp = 0;
            this._plrTwoXp = 0;
            this._gameStart = new Date().getTime();
            this._plrOneLifeBar = new objects.GraphicBar(BARS_POS_X_P1, HB_POS_Y, BARS_WIDTH, HB_HEIGHT, objects.GameBarType.HEALTH);
            this._plrOneHeartIcon = new objects.Image("heart", BARS_POS_X_P1 + BARS_WIDTH + 10, HB_POS_Y);
            this._plrOneXpBar = new objects.GraphicBar(BARS_POS_X_P1, XPB_POS_Y, BARS_WIDTH, XPB_HEIGHT, objects.GameBarType.EXPERIENCE);
            this._plrOneStatus = this._createStatusBarImages(BARS_POS_X_P1, STATUS_POS_Y, 25);
            this._plrOneLevelLabel = new objects.Label("LVL 1", "bold 16px", "Consolas", "#021775", BARS_POS_X_P1 + BARS_WIDTH + 10, XPB_POS_Y);
            this._plrTwoLifeBar = new objects.GraphicBar(BARS_POS_X_P2, HB_POS_Y, BARS_WIDTH, HB_HEIGHT, objects.GameBarType.HEALTH, true);
            this._plrTwoHeartIcon = new objects.Image("heart", BARS_POS_X_P2 - 30, HB_POS_Y);
            this._plrTwoXpBar = new objects.GraphicBar(BARS_POS_X_P2, XPB_POS_Y, BARS_WIDTH, XPB_HEIGHT, objects.GameBarType.EXPERIENCE, true);
            this._plrTwoLevelLabel = new objects.Label("LVL 1", "bold 16px", "Consolas", "#021775", BARS_POS_X_P2 - 55, XPB_POS_Y);
            this._plrTwoStatus = this._createStatusBarImages(BARS_POS_X_P2 + BARS_WIDTH - 14, STATUS_POS_Y, -25);
            this._timerLabel = new objects.Label("000:00", "80px", "Pixel", "#000000", 640, 20, true);
        }
        Object.defineProperty(GameBar.prototype, "ScreenObjects", {
            // PUBLIC PROPERTIES
            get: function () {
                var result = [
                    this._timerLabel,
                    this._plrOneLifeBar,
                    this._plrOneXpBar,
                    this._plrOneLevelLabel,
                    this._plrOneHeartIcon,
                    this._plrTwoLifeBar,
                    this._plrTwoXpBar,
                    this._plrTwoHeartIcon,
                    this._plrTwoLevelLabel,
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
            var currentPosX = posX;
            this._statusOrder.forEach(function (item) {
                var image = new objects.Image(item + "Dis", currentPosX, posY, false);
                image.scaleX = 0.5;
                image.scaleY = 0.5;
                result.push(image);
                currentPosX += incPosX;
            });
            return result;
        };
        GameBar.prototype._checkStatus = function (type, powerStatus) {
            switch (type) {
                case enums.StatusTypes.ARMOR:
            }
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
        GameBar.prototype.ReceiveExperience = function (player) {
            if (player == enums.PlayerId.PLAYER_ONE) {
                var posXpLvl = config.Game.PLAYER1_STATUS.Level;
                if (posXpLvl < constants.MAX_LEVEL) {
                    posXpLvl--;
                    this._plrOneXp += XP_POTION_VALUE;
                    if (this._plrOneXp >= XP_PER_LEVEL[posXpLvl]) {
                        config.Game.PLAYER1_STATUS.LevelUp();
                        this._plrOneLevelLabel.setText("LVL " + config.Game.PLAYER1_STATUS.Level);
                        if (config.Game.PLAYER1_STATUS.Level < constants.MAX_LEVEL) {
                            this._plrOneXp = 0;
                        }
                    }
                    this._plrOneXpBar.Value = (100 * this._plrOneXp) / XP_PER_LEVEL[posXpLvl];
                }
            }
            else if (player == enums.PlayerId.PLAYER_TWO) {
                var posXpLvl = config.Game.PLAYER2_STATUS.Level;
                if (posXpLvl < constants.MAX_LEVEL) {
                    posXpLvl--;
                    this._plrTwoXp += XP_POTION_VALUE;
                    if (this._plrTwoXp >= XP_PER_LEVEL[posXpLvl]) {
                        config.Game.PLAYER2_STATUS.LevelUp();
                        this._plrTwoLevelLabel.setText("LVL " + config.Game.PLAYER2_STATUS.Level);
                        if (config.Game.PLAYER2_STATUS.Level < constants.MAX_LEVEL) {
                            this._plrTwoXp = 0;
                        }
                    }
                    this._plrTwoXpBar.Value = (100 * this._plrTwoXp) / XP_PER_LEVEL[posXpLvl];
                }
            }
        };
        GameBar.prototype.ReceiveHealing = function (player) {
            if (player == enums.PlayerId.PLAYER_ONE) {
                this._plrOneLife += HP_POTION_VALUE;
                if (this._plrOneLife > HP_MAX_VALUE) {
                    this._plrOneLife = HP_MAX_VALUE;
                }
                this._plrOneLifeBar.Value = this._plrOneLife;
            }
            else if (player == enums.PlayerId.PLAYER_TWO) {
                this._plrTwoLife += HP_POTION_VALUE;
                if (this._plrTwoLife > HP_MAX_VALUE) {
                    this._plrTwoLife = HP_MAX_VALUE;
                }
                this._plrTwoLifeBar.Value = this._plrTwoLife;
            }
        };
        GameBar.prototype.ChangePlayerStatus = function (player, type, status) {
            var statusBar = player == enums.PlayerId.PLAYER_ONE ? this._plrOneStatus : this._plrTwoStatus;
            var suffix = "";
            switch (status) {
                case enums.PowerUpStatus.INACTIVE:
                    suffix = "Dis";
                    break;
                case enums.PowerUpStatus.ACTIVE_HALF_TIME:
                    suffix = "Halftime";
                    break;
                case enums.PowerUpStatus.ACTIVE_QUARTER_TIME:
                    suffix = "Expiring";
                    break;
            }
            statusBar[type].gotoAndPlay("" + this._statusOrder[type] + suffix);
        };
        return GameBar;
    }());
    managers.GameBar = GameBar;
})(managers || (managers = {}));
//# sourceMappingURL=GameBar.js.map