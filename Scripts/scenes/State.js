"use strict";
var scenes;
(function (scenes) {
    var State;
    (function (State) {
        State[State["NO_SCENE"] = -1] = "NO_SCENE";
        State[State["COMPANY_LOGO"] = 0] = "COMPANY_LOGO";
        State[State["HOWTO"] = 1] = "HOWTO";
        State[State["START"] = 2] = "START";
        State[State["CONFIGURATION"] = 3] = "CONFIGURATION";
        State[State["HIGHSCORE"] = 4] = "HIGHSCORE";
        State[State["CHAR_SELECTOR"] = 5] = "CHAR_SELECTOR";
        State[State["PLAY"] = 6] = "PLAY";
        State[State["END"] = 7] = "END";
        State[State["NUM_OF_SCENES"] = 8] = "NUM_OF_SCENES";
    })(State = scenes.State || (scenes.State = {}));
})(scenes || (scenes = {}));
//# sourceMappingURL=State.js.map