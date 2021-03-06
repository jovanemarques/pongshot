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
    var Image = /** @class */ (function (_super) {
        __extends(Image, _super);
        // constructor
        function Image(imageName, x, y, isCentered, scale, mirror) {
            if (imageName === void 0) { imageName = "placeholder"; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            if (scale === void 0) { scale = 1; }
            if (mirror === void 0) { mirror = false; }
            var _this = _super.call(this, config.Game.ATLAS, imageName, x, y, isCentered) || this;
            _this.scaleX = mirror ? scale * -1 : scale;
            _this.scaleY = scale;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Image.prototype._checkBounds = function () { };
        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        Image.prototype.Start = function () {
            this.type = enums.GameObjectType.IMAGE;
        };
        Image.prototype.Update = function () { };
        Image.prototype.Reset = function () { };
        return Image;
    }(objects.GameObject));
    objects.Image = Image;
})(objects || (objects = {}));
//# sourceMappingURL=Image.js.map