"use strict";
var config;
(function (config) {
    var Game = /** @class */ (function () {
        function Game() {
        }
        Game.SCREEN_WIDTH = 1280;
        Game.SCREEN_HEIGHT = 720;
        Game.FPS = 60; // 60 Frames per second
        Game.GAME_BAR_HEIGHT = 80;
        return Game;
    }());
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=game.js.map