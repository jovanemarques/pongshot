"use strict";
/*
 * File: managers/Sound.ts
 * Author: Ailton De Lima - 301018951
 * Description: Manager for sound, control the sound/music on/off and play sounds during the play
 *
 * Created: 2020-04-06
 */
var managers;
(function (managers) {
    var Sound = /** @class */ (function () {
        // CONSTRUCTOR
        function Sound() {
            var _this = this;
            // Create the background sound
            this._background = createjs.Sound.play("bgSound", { loop: -1, volume: 0.01 });
            this._music = true;
            this._sound = true;
            // Button which will appear in all scenes (Added by main game.ts)
            this._buttonMusic = new objects.Label("█ Music", "20px", "Pixel", "#00FF00", config.Game.SCREEN_WIDTH * 0.5 - 107, 15, true);
            this._buttonSound = new objects.Label("Sound █", "20px", "Pixel", "#00FF00", config.Game.SCREEN_WIDTH * 0.5 + 115, 15, true);
            // Event to handle the music
            this._buttonMusic.on("click", function () {
                _this._music = !_this._music;
                _this._buttonMusic.color = _this._music ? "#00FF00" : "#FF0000";
                _this._background.paused = !_this._music;
            });
            // Event to handle the sounds
            this._buttonSound.on("click", function () {
                _this._sound = !_this._sound;
                _this._buttonSound.color = _this._sound ? "#00FF00" : "#FF0000";
            });
        }
        Sound.prototype.AddObjectsToScene = function (scene) {
            // Added both button on the top left of the scenes
            scene.addChild(this._buttonMusic);
            scene.addChild(this._buttonSound);
        };
        Sound.prototype.PlaySound = function (soundName, volume, loop) {
            if (loop === void 0) { loop = 0; }
            if (this._sound) {
                createjs.Sound.play(soundName, { loop: loop, volume: volume });
            }
        };
        return Sound;
    }());
    managers.Sound = Sound;
})(managers || (managers = {}));
//# sourceMappingURL=Sound.js.map