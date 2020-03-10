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
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this._bullets = [];
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            // Create the players
            this._player1 = new objects.Player(managers.PlayerId.PLAYER_ONE);
            this._player2 = new objects.Player(managers.PlayerId.PLAYER_TWO);
            // Create the GamaBar
            this._gameBar = new managers.GameBar();
            // Initialize the keyboard
            managers.Keyboard.Start();
            this.Main();
        };
        Play.prototype.Update = function () {
            var _this = this;
            this._player1.Update();
            this._player2.Update();
            this._gameBar.Update();
            if (managers.Keyboard.IsActive(managers.PlayerId.PLAYER_ONE, managers.PlayerKeys.SHOOT)) {
                var bullet = new objects.Bullet(this._player1.position);
                this._bullets.push(bullet);
                this.addChild(bullet);
            }
            if (managers.Keyboard.IsActive(managers.PlayerId.PLAYER_TWO, managers.PlayerKeys.SHOOT)) {
                var bullet = new objects.Bullet(this._player2.position, true);
                this._bullets.push(bullet);
                this.addChild(bullet);
            }
            this._bullets.forEach(function (e, index) {
                if (e && e.isOutOfBounds()) {
                    _this.removeChild(e);
                    delete _this._bullets[index];
                }
                else if (e) {
                    e.Update();
                }
            });
            // managers.Collision.AABBCheck(this._plane, this._island);
            // this._clouds.forEach(cloud => {
            //     cloud.Update();
            //     managers.Collision.squaredRadiusCheck(this._plane, cloud);
            // });
        };
        Play.prototype.Main = function () {
            var _this = this;
            this.addChild(this._player1);
            this.addChild(this._player2);
            this._gameBar.ScreenObjects.forEach(function (obj) { return _this.addChild(obj); });
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map