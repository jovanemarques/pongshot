module objects {
    export class Bullet extends objects.GameObject {
        private _bulletVel: number = 20;
        private _player: enums.PlayerId;
        //private _active:boolean;

        // PUBLIC PROPERTIES
        // get active():boolean
        // {
        //     return this._active;
        // }
        // set active(value:boolean)
        // {
        //     this._active = value;
        // }
        // constuctor
        get Player(): enums.PlayerId {
            return this._player;
        }

        constructor(char: string, startPosition: Vector2, player: enums.PlayerId = enums.PlayerId.PLAYER_ONE) {
            // from https://opengameart.org/content/bullets-game-asset
            super(config.Game.ATLAS, `${char}Bullet`);
            this.position = new Vector2(startPosition.x, startPosition.y, this);
            this._player = player;
            if (player == enums.PlayerId.PLAYER_TWO) {
                this.scaleX = -1;
            }
        }

        protected _checkBounds(): void {}

        public isOutOfBounds(): boolean {
            if (this._player == enums.PlayerId.PLAYER_TWO) {
                return this.x > config.Game.SCREEN_WIDTH;
            } else {
                return this.x < 0;
            }
        }

        public Start(): void {}

        public Update(): void {
            if (this._player == enums.PlayerId.PLAYER_TWO) {
                this.position.x -= this._bulletVel;
            } else {
                this.position.x += this._bulletVel;
            }
        }

        public Reset(): void {}
    }
}
