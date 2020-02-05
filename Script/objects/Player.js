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
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // constuctor 
        function Player(x) {
            var _this = _super.call(this) || this;
            _this.VELOCITY = 3;
            _this.isMoving = false;
            _this.direction = 'U'; // U - Up, D - Down
            if (x == 2) {
                _this.x = 735;
            }
            return _this;
        }
        // constructor(playerImage?:string, x: number, y: number) {
        //     super(playerImage, x);
        // }
        Player.prototype._checkBounds = function () {
            throw new Error("Method not implemented.");
        };
        Player.prototype.Start = function () {
            throw new Error("Method not implemented.");
        };
        Player.prototype.Update = function () {
            if (this.isMoving) {
                if (this.direction == 'U') {
                    this.y -= this.VELOCITY;
                }
                else {
                    this.y += this.VELOCITY;
                }
            }
        };
        Player.prototype.Reset = function () {
            throw new Error("Method not implemented.");
        };
        Player.prototype.StartMoveUp = function () {
            this.direction = 'U';
            this.isMoving = true;
        };
        Player.prototype.StartMoveDown = function () {
            this.direction = 'D';
            this.isMoving = true;
        };
        Player.prototype.StopMove = function () {
            this.isMoving = false;
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map