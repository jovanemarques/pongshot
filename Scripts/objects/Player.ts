module objects {
    export class Player extends GameObject {
        // PRIVATE INSTANCE MEMBERS
        private _playerVel: number = 3;
        private _playerId: managers.PlayerId;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor(playerId: managers.PlayerId) {
            super(config.Game.ASSETS.getResult("tank"), 0, 0, true);

            this._playerId = playerId;

            this.Reset();
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
            // Upper and lower bound
            if (this.position.y < config.Game.GAME_BAR_HEIGHT + this.halfHeight) {
                this.position = new Vector2(this.position.x, config.Game.GAME_BAR_HEIGHT + this.halfHeight);
            } else if (this.position.y > config.Game.SCREEN_HEIGHT - this.halfHeight) {
                this.position = new Vector2(this.position.x, config.Game.SCREEN_HEIGHT - this.halfHeight);
            }
        }

        private _move(): void {
            let velocity = new Vector2(0, 0);
            let playerKeys = managers.Keyboard.GetPlayerKeys(this._playerId);

            // Verify the direction and set the y speed
            if (playerKeys[managers.PlayerKeys.MOVE_UP] && !playerKeys[managers.PlayerKeys.MOVE_DOWN]) {
                velocity = new Vector2(0, -this._playerVel);
            } else if (playerKeys[managers.PlayerKeys.MOVE_DOWN] && !playerKeys[managers.PlayerKeys.MOVE_UP]) {
                velocity = new Vector2(0, this._playerVel);
            }

            this.position = Vector2.add(this.position, velocity);
        }

        // PUBLIC METHODS
        public Start(): void {
            this.type = enums.GameObjectType.PLAYER;
        }

        public Update(): void {
            this._move();
            this._checkBounds();
        }

        public Reset(): void {
            if (this._playerId == managers.PlayerId.PLAYER_TWO) {
                this.rotation = 180;
                this.position = new Vector2(
                    config.Game.SCREEN_WIDTH - this.halfWidth,
                    config.Game.GAME_BAR_HEIGHT + this.halfHeight
                );
            } else {
                this.position = new Vector2(this.halfWidth, config.Game.GAME_BAR_HEIGHT + this.halfHeight);
            }
        }
    }
}