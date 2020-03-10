module objects {
    export class Bullet extends objects.GameObject {
        private _bulletVel: number = 10;
        private _isPlayer2: boolean;
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

        constructor(startPosition: Vector2, isPlayer2: boolean = false) {
            // from https://opengameart.org/content/bullets-game-asset
            super(config.Game.ASSETS.getResult("bullet"));
            this.position = new Vector2(startPosition.x, startPosition.y, this);
            //this.x = startPosition.x;
            //this.y = startPosition.y;
            this._isPlayer2 = isPlayer2;
            //this._active = true;
        }

        protected _checkBounds(): void {}

        public isOutOfBounds(): boolean {
            if (this._isPlayer2) {
                return this.x > config.Game.SCREEN_WIDTH;
            } else {
                return this.x < 0;
            }
        }

        public Start(): void {}

        public Update(): void {
            if (this._isPlayer2) {
                this.position.x -= this._bulletVel;
            } else {
                this.position.x += this._bulletVel;
            }
        }

        public Reset(): void {}
    }
}
