"use strict";
var objects;
(function (objects) {
    var PlayerStatus = /** @class */ (function () {
        // CONSTRUCTORS
        function PlayerStatus(initialAttackSpeed, incAS, initialAttackPower, incAP, initialArmor, incAr) {
            this._level = 1;
            this._attackSpeed = initialAttackSpeed;
            this._attackSpeedIncrement = incAS;
            this._attackPower = initialAttackPower;
            this._attackPowerIncrement = incAP;
            this._armor = initialArmor;
            this._armorIncrement = incAr;
            this._attackSpeedPUTick = -1;
            this._attackPowerPUTick = -1;
            this._armorPUTick = -1;
        }
        Object.defineProperty(PlayerStatus.prototype, "Level", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._level;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerStatus.prototype, "AttackSpeed", {
            get: function () {
                return this._attackSpeed * (this._attackSpeedPUTick > 0 ? 2 : 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerStatus.prototype, "AtackPower", {
            get: function () {
                return this._attackPower * (this._attackPowerPUTick > 0 ? 2 : 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerStatus.prototype, "Armor", {
            get: function () {
                return this._armor * (this._armorPUTick > 0 ? 2 : 1);
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        // PUBLIC METHODS
        PlayerStatus.prototype.LevelUp = function () {
            if (this._level < 5) {
                this._level++;
                this._attackSpeed += this._attackSpeedIncrement;
                this._attackPower += this._attackPowerIncrement;
                this._armor += this._armorIncrement;
            }
        };
        PlayerStatus.prototype.CalculateDamage = function (attack) {
            return attack - attack * this.Armor * 0.01;
        };
        PlayerStatus.prototype.ActivatePowerUp = function (power, tick) {
            switch (power.PowerType) {
                case "itemArmor":
                    this._armorPUTick = tick;
                    break;
                case "itemSpellScroll":
                    this._attackPowerPUTick = tick;
                    break;
                case "itemBoots":
                    this._attackSpeedPUTick = tick;
                    break;
                case "itemHp":
                    break;
                case "itemXp":
                    break;
            }
        };
        return PlayerStatus;
    }());
    objects.PlayerStatus = PlayerStatus;
    // Character status
    objects.CharacterStatusMage = new objects.PlayerStatus(120, 10, 20, 3, 6, 1);
    objects.CharacterStatusRogue = new objects.PlayerStatus(80, 8, 12, 2, 10, 1);
    objects.CharacterStatusWarrior = new objects.PlayerStatus(90, 5, 15, 2, 12, 2);
    objects.CharacterStatusArcher = new objects.PlayerStatus(60, 5, 10, 2, 8, 1);
})(objects || (objects = {}));
//# sourceMappingURL=PlayerStatus.js.map