"use strict";
var constants;
(function (constants) {
    // Why not enums?
    // Enums were giving more work than making it simpler, this is the same but now I'm using the string value instead of positions.
    constants.PlayerType = {
        MAGE: 'mage',
        ROGUE: 'rogue'
    };
})(constants || (constants = {}));
//# sourceMappingURL=PlayerType.js.map