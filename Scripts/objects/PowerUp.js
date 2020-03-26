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
var objects;
(function (objects) {
    var PowerUp = /** @class */ (function (_super) {
        __extends(PowerUp, _super);
        // CONSTRUCTOR
        function PowerUp() {
            var _this = _super.call(this, config.Game.ASSETS.getResult(constants.PowerUps[Math.floor(Math.random() * constants.PowerUps.length)]), Math.floor(config.Game.SCREEN_WIDTH / 2), Math.floor(Math.random() * config.Game.SCREEN_HEIGHT - config.Game.GAME_BAR_HEIGHT) + config.Game.GAME_BAR_HEIGHT, true) || this;
            _this.Reset();
            _this.Start();
            _this.scaleX = 2;
            _this.scaleY = 2;
            return _this;
        }
        // PUBLIC METHODS
        PowerUp.prototype.Start = function () {
            this.type = enums.GameObjectType.PLAYER;
        };
        PowerUp.prototype.Update = function () {
            this._checkBounds();
        };
        PowerUp.prototype.Reset = function () {
        };
        PowerUp.prototype._checkBounds = function () {
        };
        return PowerUp;
    }(objects.GameObject));
    objects.PowerUp = PowerUp;
})(objects || (objects = {}));
//# sourceMappingURL=PowerUp.js.map