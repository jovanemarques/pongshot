module scenes {
    enum LogoState {
        APPEARING,
        WAITING,
        FADING,
        COMPLETE,
        NUM_OF_STATES
    }

    export class CompanyLogo extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _presentLabel: objects.Label;
        private _background: objects.Image;
        private _companyLogo: objects.Image;
        private _state: LogoState;
        private _waitCounter: number;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS
        public Start(): void {
            //instantiate a new Text object
            //this._presentLabel = new objects.Label("PRESENTS:", "80px", "Consolas", "#FFFFFF", 320, 180, true);

            this._background = new objects.Image(config.Game.ASSETS.getResult("blackBackground"));

            // buttons
            this._companyLogo = new objects.Image(
                config.Game.ASSETS.getResult("companyLogo"),
                config.Game.SCREEN_WIDTH / 2,
                config.Game.SCREEN_HEIGHT / 2,
                true
            );

            this._companyLogo.alpha = 0.1;
            this._waitCounter = 0;
            this._state = LogoState.APPEARING;

            this.Main();
        }

        public Update(): void {
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
        }

        public Main(): void {
            this.addChild(this._background);

            this.addChild(this._companyLogo);

            this._background.on("click", () => {
                config.Game.SCENE = scenes.State.PLAY;
            });

            this._companyLogo.on("click", () => {
                config.Game.SCENE = scenes.State.PLAY;
            });
        }
    }
}
