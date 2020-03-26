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
        // CONSTRUCTOR
        function Player(playerId, playerCharacter) {
            var _this = _super.call(this, config.Game.ASSETS.getResult(playerCharacter), 0, 0, true) || this;
            // PRIVATE INSTANCE MEMBERS
            _this._playerVel = 3;
            _this._playerId = playerId;
            _this._playerCharacter = playerCharacter;
            _this.Reset();
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Player.prototype._checkBounds = function () {
            // Upper and lower bound
            if (this.position.y < config.Game.GAME_BAR_HEIGHT + this.halfHeight) {
                this.position = new objects.Vector2(this.position.x, config.Game.GAME_BAR_HEIGHT + this.halfHeight);
            }
            else if (this.position.y >
                config.Game.SCREEN_HEIGHT - this.halfHeight) {
                this.position = new objects.Vector2(this.position.x, config.Game.SCREEN_HEIGHT - this.halfHeight);
            }
        };
        Player.prototype._move = function () {
            var velocity = new objects.Vector2(0, 0);
            var playerKeys = managers.Keyboard.GetPlayerKeys(this._playerId);
            // Verify the direction and set the y speed
            if (playerKeys[enums.PlayerKeys.MOVE_UP] &&
                !playerKeys[enums.PlayerKeys.MOVE_DOWN]) {
                velocity = new objects.Vector2(0, -this._playerVel);
            }
            else if (playerKeys[enums.PlayerKeys.MOVE_DOWN] &&
                !playerKeys[enums.PlayerKeys.MOVE_UP]) {
                velocity = new objects.Vector2(0, this._playerVel);
            }
            this.position = objects.Vector2.add(this.position, velocity);
        };
        Player.prototype.Attack = function () {
            var _this = this;
            // Attack position for 250ms then go back.
            this.image = config.Game.ASSETS.getResult(this._playerCharacter + "Attack");
            setTimeout(function () { return _this.image = config.Game.ASSETS.getResult("" + _this._playerCharacter); }, 250);
        };
        Player.prototype.Hit = function () {
            var _this = this;
            // Attack position for 250ms then go back.
            this.image = config.Game.ASSETS.getResult(this._playerCharacter + "Hit");
            setTimeout(function () { return _this.image = config.Game.ASSETS.getResult("" + _this._playerCharacter); }, 250);
        };
        // PUBLIC METHODS
        Player.prototype.Start = function () {
            this.type = enums.GameObjectType.PLAYER;
        };
        Player.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        Player.prototype.Reset = function () {
            if (this._playerId == enums.PlayerId.PLAYER_TWO) {
                // Mirror the second player by default
                this.scaleX = -1;
                this.position = new objects.Vector2(config.Game.SCREEN_WIDTH - this.halfWidth, config.Game.GAME_BAR_HEIGHT + this.halfHeight);
            }
            else {
                this.position = new objects.Vector2(this.halfWidth, config.Game.GAME_BAR_HEIGHT + this.halfHeight);
            }
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map