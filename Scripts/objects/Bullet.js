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
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        //private _active:boolean;
        // PUBLIC PROPERTIES
        // get active():boolean
        // {
        //     return this._active;
        // }
        // set active(value:boolean)
        // {
        //     this._active = value;
        // }
        // constuctor
        function Bullet(startPosition, isPlayer2) {
            if (isPlayer2 === void 0) { isPlayer2 = false; }
            var _this = 
            // from https://opengameart.org/content/bullets-game-asset
            _super.call(this, config.Game.ASSETS.getResult("bullet")) || this;
            _this._bulletVel = 10;
            _this.position = new objects.Vector2(startPosition.x, startPosition.y, _this);
            //this.x = startPosition.x;
            //this.y = startPosition.y;
            _this._isPlayer2 = isPlayer2;
            return _this;
            //this._active = true;
        }
        Bullet.prototype._checkBounds = function () { };
        Bullet.prototype.isOutOfBounds = function () {
            if (this._isPlayer2) {
                return this.x > config.Game.SCREEN_WIDTH;
            }
            else {
                return this.x < 0;
            }
        };
        Bullet.prototype.Start = function () { };
        Bullet.prototype.Update = function () {
            if (this._isPlayer2) {
                this.position.x -= this._bulletVel;
            }
            else {
                this.position.x += this._bulletVel;
            }
        };
        Bullet.prototype.Reset = function () { };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=Bullet.js.map