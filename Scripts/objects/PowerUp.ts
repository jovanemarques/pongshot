module objects {
    export class PowerUp extends GameObject {

        // CONSTRUCTOR
        constructor() {
            super(config.Game.ASSETS.getResult(
                constants.PowerUps[Math.floor(Math.random() * constants.PowerUps.length)]),
                Math.floor(config.Game.SCREEN_WIDTH / 2),
                Math.floor(Math.random() * config.Game.SCREEN_HEIGHT - config.Game.GAME_BAR_HEIGHT) + config.Game.GAME_BAR_HEIGHT,
                true);

            this.Reset();
            this.Start();
            this.scaleX = 2;
            this.scaleY = 2;
        }

        // PUBLIC METHODS
        public Start(): void {
            this.type = enums.GameObjectType.PLAYER;
        }

        public Update(): void {
            this._checkBounds();
        }

        public Reset(): void {

        }

        protected _checkBounds(): void {
        }
    }
}
