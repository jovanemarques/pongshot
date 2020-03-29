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
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        function Play() {
            var _this = _super.call(this) || this;
            _this._powerUp = [];
            _this._bullets = [];
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Play.prototype._plrShoot = function (player, status, bulletTick) {
            // Verify if the shoot button is active
            if (managers.Keyboard.IsActive(player.PlayerId, enums.PlayerKeys.SHOOT)) {
                // Verify if the player can shoot
                var curTick = createjs.Ticker.getTicks();
                if (curTick - bulletTick >= status.AttackSpeed) {
                    player.Attack();
                    var bullet = new objects.Bullet(player.position, player.PlayerId);
                    this._bullets.push(bullet);
                    this.addChild(bullet);
                    return curTick;
                }
            }
            return bulletTick;
        };
        Play.prototype._checkBullet = function (e, index) {
            // If is out of screen, remove it and return, otherwise, update it
            if (e && e.isOutOfBounds()) {
                this.removeChild(e);
                delete this._bullets[index];
                return;
            }
            else if (e) {
                e.Update();
            }
            // Check for player two bullet collisions
            var bulletHit = false;
            if (e.Player == enums.PlayerId.PLAYER_TWO) {
                if (managers.Collision.AABBCheck(this._player1, e)) {
                    this._player1.Hit();
                    this._gameBar.PostDamage(enums.PlayerId.PLAYER_ONE, config.Game.PLAYER1_STATUS.CalculateDamage(config.Game.PLAYER2_STATUS.AtackPower));
                    bulletHit = true;
                }
                bulletHit = bulletHit || this._checkPowerUpCollision(e, config.Game.PLAYER2_STATUS);
            }
            else if (e.Player == enums.PlayerId.PLAYER_ONE) {
                if (managers.Collision.AABBCheck(this._player2, e)) {
                    this._player2.Hit();
                    this._gameBar.PostDamage(enums.PlayerId.PLAYER_TWO, config.Game.PLAYER2_STATUS.CalculateDamage(config.Game.PLAYER1_STATUS.AtackPower));
                    bulletHit = true;
                }
                bulletHit = bulletHit || this._checkPowerUpCollision(e, config.Game.PLAYER1_STATUS);
            }
            // If the bullet hit something, remove it
            if (bulletHit) {
                this.removeChild(e);
                delete this._bullets[index];
            }
        };
        Play.prototype._checkPowerUpCollision = function (e, status) {
            var _this = this;
            var result = false;
            // Checks if the bullet activate the power up
            this._powerUp.forEach(function (pu, index) {
                if (managers.Collision.squaredRadiusCheck(pu, e)) {
                    status.ActivatePowerUp(pu, createjs.Ticker.getTicks());
                    _this.removeChild(pu);
                    delete _this._powerUp[index];
                    result = true;
                }
            });
            return result;
        };
        Play.prototype._createPowerUp = function () {
            // Create an item every 30s to a minium of 10s (reducing 1s per item showed)
            if (createjs.Ticker.getTicks() % this._itemSpawnTicks == 0) {
                var powerUp = new objects.PowerUp();
                this._powerUp.push(powerUp);
                this.addChild(powerUp);
                if (this._itemSpawnTicks > 10 * config.Game.FPS) {
                    this._itemSpawnTicks -= config.Game.FPS;
                }
            }
        };
        // PUBLIC METHODS
        Play.prototype.Start = function () {
            // Background
            this._background = new objects.Image(config.Game.ASSETS.getResult("forestBackground"));
            // Create the players
            this._player1 = new objects.Player(enums.PlayerId.PLAYER_ONE, config.Game.PLAYER1_CHARACTER);
            this._player2 = new objects.Player(enums.PlayerId.PLAYER_TWO, config.Game.PLAYER2_CHARACTER);
            setInterval(function () {
                // TODO: make this timer logic work somehow and check for item collision.
                // this._powerUp = new objects.PowerUp();
            }, 5000 || Math.random() * 100);
            this._powerUp = new Array();
            // Create the GamaBar
            this._gameBar = new managers.GameBar();
            // Initialize the keyboard
            managers.Keyboard.Start();
            this._plrOneBulletTick = 0;
            this._plrTwoBulletTick = 0;
            this._itemSpawnTicks = config.Game.INITIAL_ITEM_SPAWN_TICKER;
            this.Main();
        };
        Play.prototype.Update = function () {
            var _this = this;
            this._player1.Update();
            this._player2.Update();
            this._gameBar.Update();
            this._plrOneBulletTick = this._plrShoot(this._player1, config.Game.PLAYER1_STATUS, this._plrOneBulletTick);
            this._plrTwoBulletTick = this._plrShoot(this._player2, config.Game.PLAYER2_STATUS, this._plrTwoBulletTick);
            this._bullets.forEach(function (e, index) {
                _this._checkBullet(e, index);
                if (e.Player == enums.PlayerId.PLAYER_ONE) {
                }
            });
            this._createPowerUp();
        };
        Play.prototype.Main = function () {
            var _this = this;
            this.addChild(this._background);
            this.addChild(this._player1);
            this.addChild(this._player2);
            this._gameBar.ScreenObjects.forEach(function (obj) { return _this.addChild(obj); });
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map