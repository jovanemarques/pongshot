module constants {
    // Why not enums?
    // Enums were giving more work than making it simpler, this is the same but now I'm using the string value instead of positions.
    export const PlayerType = {
        MAGE: 'mage',
        ROGUE: 'rogue'
    };

    // Why not a private field inside PowerUp class?
    // The super inherited for GameObject should not access 'this', therefore I would't have direct access to this array
    // on PowerUp construction - feel free to try out something else if you want.
    export const PowerUps = ['itemArmor', 'itemBoots', 'itemsHp', 'itemSpellScroll'];
}