"use strict";
var objects;
(function (objects) {
    //
    var COMMON_POWER_UP_DURATION = 15 * config.Game.FPS;
    var TRAP_POWER_UP_DURATION = 5 * config.Game.FPS;
    var PowerUpInfo = /** @class */ (function () {
        function PowerUpInfo(value, increment, powerMultiplier, powerDuration) {
            this._value = value;
            this._increment = increment;
            this._tick = -1;
            this._status = enums.PowerUpStatus.INACTIVE;
            this._powerMultiplier = powerMultiplier;
            this._powerDuration = powerDuration;
        }
        Object.defineProperty(PowerUpInfo.prototype, "Value", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PowerUpInfo.prototype, "Increment", {
            get: function () {
                return this._increment;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PowerUpInfo.prototype, "Tick", {
            get: function () {
                return this._tick;
            },
            set: function (value) {
                this._tick = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PowerUpInfo.prototype, "Status", {
            get: function () {
                return this._status;
            },
            set: function (value) {
                this._status = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PowerUpInfo.prototype, "PowerMultiplier", {
            get: function () {
                return this._powerMultiplier;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PowerUpInfo.prototype, "PowerDuration", {
            get: function () {
                return this._powerDuration;
            },
            enumerable: true,
            configurable: true
        });
        return PowerUpInfo;
    }());
    var PlayerStatus = /** @class */ (function () {
        // CONSTRUCTORS
        function PlayerStatus(initialAttackSpeed, incAS, initialAttackPower, incAP, initialArmor, incAr) {
            this._level = 1;
            this._status = new Array(enums.StatusTypes.NUM_OF_STATUS);
            this._status[enums.StatusTypes.ATK_SPEED] = new PowerUpInfo(initialAttackSpeed, -incAS, 0.5, COMMON_POWER_UP_DURATION);
            this._status[enums.StatusTypes.ATK_POWER] = new PowerUpInfo(initialAttackPower, incAP, 2, COMMON_POWER_UP_DURATION);
            this._status[enums.StatusTypes.ARMOR] = new PowerUpInfo(initialArmor, incAr, 2, COMMON_POWER_UP_DURATION);
            this._status[enums.StatusTypes.TRAP] = new PowerUpInfo(0, 0, 0, TRAP_POWER_UP_DURATION);
        }
        Object.defineProperty(PlayerStatus.prototype, "Level", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._level;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        // PUBLIC METHODS
        PlayerStatus.prototype.Update = function () {
            var currentTick = createjs.Ticker.getTicks();
            this._status.forEach(function (s) {
                if (s.Status != enums.PowerUpStatus.INACTIVE) {
                    var diff = currentTick - s.Tick;
                    switch (s.Status) {
                        case enums.PowerUpStatus.ACTIVE:
                            if (diff >= s.PowerDuration * 0.5) {
                                s.Status = enums.PowerUpStatus.ACTIVE_HALF_TIME;
                            }
                            break;
                        case enums.PowerUpStatus.ACTIVE_HALF_TIME:
                            if (diff >= s.PowerDuration * 0.75) {
                                s.Status = enums.PowerUpStatus.ACTIVE_QUARTER_TIME;
                            }
                            break;
                        case enums.PowerUpStatus.ACTIVE_QUARTER_TIME:
                            if (diff > s.PowerDuration) {
                                s.Status = enums.PowerUpStatus.INACTIVE;
                                s.Tick = constants.DEFAULT_POWER_UP_TICK;
                            }
                            break;
                    }
                }
            });
        };
        PlayerStatus.prototype.LevelUp = function () {
            if (this._level < constants.MAX_LEVEL) {
                this._level++;
                this._status.forEach(function (s) { return (s.Value += s.Increment); });
            }
        };
        PlayerStatus.prototype.CalculateDamage = function (attack) {
            return attack - attack * this.GetValue(enums.StatusTypes.ARMOR) * 0.01;
        };
        PlayerStatus.prototype.ActivatePowerUp = function (power, tick) {
            var powerInfo;
            switch (power.PowerType) {
                case enums.PowerUpTypes.ARMOR:
                    powerInfo = this._status[enums.StatusTypes.ARMOR];
                    break;
                case enums.PowerUpTypes.ATTACK_POWER:
                    powerInfo = this._status[enums.StatusTypes.ATK_POWER];
                    break;
                case enums.PowerUpTypes.ATTACK_SPEED:
                    powerInfo = this._status[enums.StatusTypes.ATK_SPEED];
                    break;
            }
            if (powerInfo) {
                powerInfo.Tick = tick;
                powerInfo.Status = enums.PowerUpStatus.ACTIVE;
            }
        };
        PlayerStatus.prototype.GetValue = function (type) {
            var power = this._status[type];
            // Verify if the power up is active
            if (power.Status != enums.PowerUpStatus.INACTIVE) {
                return power.Value * power.Increment;
            }
            return power.Value;
        };
        PlayerStatus.prototype.GetPowerStatus = function (type) {
            return this._status[type].Status;
        };
        return PlayerStatus;
    }());
    objects.PlayerStatus = PlayerStatus;
    // Character status
    objects.CharacterStatusMage = new objects.PlayerStatus(1, 10, 20, 3, 6, 1);
    objects.CharacterStatusRogue = new objects.PlayerStatus(80, 8, 12, 2, 10, 1);
    objects.CharacterStatusWarrior = new objects.PlayerStatus(90, 5, 15, 2, 12, 2);
    objects.CharacterStatusArcher = new objects.PlayerStatus(60, 5, 10, 2, 8, 1);
})(objects || (objects = {}));
//# sourceMappingURL=PlayerStatus.js.map