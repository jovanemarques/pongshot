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
    var LogoState;
    (function (LogoState) {
        LogoState[LogoState["APPEARING"] = 0] = "APPEARING";
        LogoState[LogoState["WAITING"] = 1] = "WAITING";
        LogoState[LogoState["FADING"] = 2] = "FADING";
        LogoState[LogoState["COMPLETE"] = 3] = "COMPLETE";
        LogoState[LogoState["NUM_OF_STATES"] = 4] = "NUM_OF_STATES";
    })(LogoState || (LogoState = {}));
    var CompanyLogo = /** @class */ (function (_super) {
        __extends(CompanyLogo, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function CompanyLogo() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        CompanyLogo.prototype.Start = function () {
            //instantiate a new Text object
            //this._presentLabel = new objects.Label("PRESENTS:", "80px", "Consolas", "#FFFFFF", 320, 180, true);
            this._background = new objects.Image(config.Game.ASSETS.getResult("blackBackground"));
            // buttons
            this._companyLogo = new objects.Image(config.Game.ASSETS.getResult("companyLogo"), config.Game.SCREEN_WIDTH / 2, config.Game.SCREEN_HEIGHT / 2, true);
            this._companyLogo.alpha = 0.1;
            this._waitCounter = 0;
            this._state = LogoState.APPEARING;
            this.Main();
        };
        CompanyLogo.prototype.Update = function () {
            switch (this._state) {
                case LogoState.APPEARING:
                    this._companyLogo.alpha += 0.01;
                    if (this._companyLogo.alpha >= 1) {
                        this._state = LogoState.WAITING;
                    }
                    break;
                case LogoState.WAITING:
                    this._waitCounter += 1;
                    if (this._waitCounter >= 180) {
                        this._state = LogoState.FADING;
                    }
                    break;
                case LogoState.FADING:
                    this._companyLogo.alpha -= 0.01;
                    if (this._companyLogo.alpha <= 0.1) {
                        this._state = LogoState.COMPLETE;
                    }
                    break;
                case LogoState.COMPLETE:
                    config.Game.SCENE = scenes.State.START;
                    break;
            }
        };
        CompanyLogo.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._companyLogo);
            this._background.on("click", function () {
                config.Game.SCENE = scenes.State.PLAY;
            });
            this._companyLogo.on("click", function () {
                config.Game.SCENE = scenes.State.PLAY;
            });
        };
        return CompanyLogo;
    }(objects.Scene));
    scenes.CompanyLogo = CompanyLogo;
})(scenes || (scenes = {}));
//# sourceMappingURL=CompanyLogo.js.map