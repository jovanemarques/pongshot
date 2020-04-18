module scenes {
    export class Howto extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _background: objects.Background;
        private _gameTitle: objects.Label;
        private _charactersLabel: objects.Label;
        private _mageLabel: objects.Label;
        private _warriorLabel: objects.Label;
        private _rogueLabel: objects.Label;
        private _itemsLabel: objects.Label;
        private _backButton: objects.Button;
        
        // Characteres
        private _characterMage: objects.Image;
        private _characterRogue: objects.Image;
        private _characterWarrior: objects.Image;
         
        //Items
        private _armorItem: objects.Image;
        private _armorLabel: objects.Label;
        private _spellScrollItem: objects.Image;
        private _spellScrollLabel: objects.Label;
        private _bootsItem: objects.Image;
        private _bootsLabel: objects.Label;
        private _trapItem: objects.Image;
        private _trapLabel: objects.Label;
        private _itemHpItem: objects.Image;
        private _itemHpLabel: objects.Label;
        private _itemXpItem: objects.Image;
        private _itemXpLabel: objects.Label;


        // CONSTRUCTOR
        constructor() {
            super();
            this.Start();
        }

        // PUBLIC METHODS
        public Start(): void {
            // Background
            this._background = new objects.Background(config.Game.ASSETS.getResult("blackBackground"));

            // Labels
            this._charactersLabel = new objects.Label("Characters", "60px", "Pixel", "#ffcc5c", 400, 150, true);
            this._itemsLabel = new objects.Label("Items", "60px", "Pixel", "#ffcc5c", 800, 150, true);
            this._mageLabel = new objects.Label('Mage \n Atk. Power: 20 / 32 \n Atk. Speed: 120 / 80 \n Armor: 6 / 10' , "30px", "Pixel", "#FFFFFF", 400, 250, true);
            this._rogueLabel = new objects.Label('Rogue \n Atk. Power: 12 / 20 \n Atk. Speed: 80 / 48 \n Armor: 10 / 14' , "30px", "Pixel", "#FFFFFF", 400, 350, true);
            this._warriorLabel = new objects.Label('Warrior \n Atk. Power: 15 / 23 \n Atk. Speed: 90 / 70 \n Armor: 12 / 20 \n' , "30px", "Pixel", "#FFFFFF", 400, 450, true);
            
            this._gameTitle = new objects.Label(
                "Pongshot - How to play",
                "120px",
                "Pixel",
                "#96ceb2",
                config.Game.SCREEN_WIDTH / 2,
                50,
                true
            );

            // Buttons
            this._backButton = new objects.Button("btnBack", 90, 630, true);
            
            //Items
            this._armorItem = new objects.Image("armor", 700, 265, true);
            this._armorLabel = new objects.Label('2x Armor (15s)' , "30px", "Pixel", "#FFFFFF", 750, 250, false);
            this._spellScrollItem = new objects.Image("spellScroll", 700, 315, true);
            this._spellScrollLabel = new objects.Label('2x Atack Power (15s)' , "30px", "Pixel", "#FFFFFF", 750, 300, false);
            this._bootsItem = new objects.Image("boots", 700, 365, true);
            this._bootsLabel = new objects.Label('2x Attack Speed (15s)' , "30px", "Pixel", "#FFFFFF", 750, 350, false);
            this._trapItem = new objects.Image("trap", 700, 415, true);
            this._trapLabel = new objects.Label('Trap enemy (5s)' , "30px", "Pixel", "#FFFFFF", 750, 400, false);
            this._itemHpItem = new objects.Image("itemHp", 700, 465, true);
            this._itemHpLabel = new objects.Label('HP potion (25%)' , "30px", "Pixel", "#FFFFFF", 750, 450, false);
            this._itemXpItem = new objects.Image("itemXp", 700, 515, true);
            this._itemXpLabel = new objects.Label('XP potion (10 XP)' , "30px", "Pixel", "#FFFFFF", 750, 500, false);
            
            this._trapItem.filters = [
                new createjs.ColorFilter(0,0,0,1,255,255,255,0)
            ];
            this._trapItem.cache(0,0,72,72);

            // Player one
            this._characterMage = new objects.Image("mage", 200, 250, true, 1.5);
            this._characterRogue = new objects.Image("rogue", 200, 350, true, 1.5);
            this._characterWarrior = new objects.Image("warrior", 200, 470, true, 1.5);

            // Player two
            this.Main();
        }

        public Update(): void {}

        public Main(): void {
            this.addChild(this._background);
            this.addChild(this._gameTitle);
            this.addChild(this._charactersLabel);
            this.addChild(this._itemsLabel);
            this.addChild(this._mageLabel);
            this.addChild(this._rogueLabel);
            this.addChild(this._warriorLabel);

            this.addChild(this._characterMage);
            this.addChild(this._characterRogue);
            this.addChild(this._characterWarrior);

            this.addChild(this._backButton);
            
            //Items
            this.addChild(this._armorItem);
            this.addChild(this._armorLabel);
            this.addChild(this._spellScrollItem);
            this.addChild(this._spellScrollLabel);
            this.addChild(this._bootsItem);
            this.addChild(this._bootsLabel);
            this.addChild(this._trapItem);
            this.addChild(this._trapLabel);
            this.addChild(this._itemHpItem);
            this.addChild(this._itemHpLabel);
            this.addChild(this._itemXpItem);
            this.addChild(this._itemXpLabel);

            this._backButton.on("click", () => {
                config.Game.SCENE = scenes.State.START;
            });
        }
    }
}
