module scenes {
    export class End extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _background: objects.Background;
        private _endLabel: objects.Label;
        private _winnerLabel: objects.Label;
        private _backButton: objects.Button;
        private _loserImage: objects.Image;
        private _winnerImage: objects.Image;
        private _winnerShow: boolean;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        // Initializing and Instantiating
        public Start(): void {
            // Background
            this._background = new objects.Background(config.Game.ASSETS.getResult("blackBackground"));

            //instantiate a new Text object
            this._endLabel = new objects.Label(`Game Over`, "80px", "Consolas", "#FFFF00", 620, 80, true);
            this._winnerLabel = new objects.Label(
                `Player ${config.Game.WINNER + 1} Won`,
                "80px",
                "Consolas",
                "#FFFF00",
                620,
                180,
                true
            );

            let loserChar;
            let winnerChar;
            let loserSide;
            let winnerSide;

            if (config.Game.WINNER == enums.PlayerId.PLAYER_ONE) {
                loserChar = config.Game.PLAYER2_CHARACTER;
                winnerChar = config.Game.PLAYER1_CHARACTER;
                loserSide = -1;
                winnerSide = 1;
            } else {
                loserChar = config.Game.PLAYER1_CHARACTER;
                winnerChar = config.Game.PLAYER2_CHARACTER;
                loserSide = 1;
                winnerSide = -1;
            }

            this._loserImage = new objects.Image(
                `${loserChar}Death`,
                config.Game.SCREEN_WIDTH * 0.5,
                config.Game.SCREEN_HEIGHT * 0.5,
                true
            );
            this._loserImage.scaleX = 2 * loserSide;
            this._loserImage.scaleY = 2;

            this._winnerImage = new objects.Image(
                `${winnerChar}Idle`,
                config.Game.SCREEN_WIDTH * 0.5,
                config.Game.SCREEN_HEIGHT * 0.5,
                true
            );
            this._winnerImage.scaleX = 2.5 * winnerSide;
            this._winnerImage.scaleY = 2.5;

            config.Game.SOUND_MANAGER.PlaySound(`winner`, 0.25);

            // buttons
            this._backButton = new objects.Button("btnBack", 620, 580, true);

            this.Main();
        }

        public Update(): void {
            if (!this._winnerShow && this._loserImage.currentAnimation.match(".*DeathEnd")) {
                this.addChild(this._winnerLabel);
                this.addChild(this._winnerImage);
                this.removeChild(this._loserImage);
            }
        }

        public Main(): void {
            this.addChild(this._background);
            this.addChild(this._endLabel);

            this.addChild(this._backButton);
            this.addChild(this._loserImage);

            this._backButton.on("click", () => {
                config.Game.SCENE = scenes.State.START;
            });
        }
    }
}
