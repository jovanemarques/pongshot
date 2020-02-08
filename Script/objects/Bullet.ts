module objects {
    export class Bullet extends objects.GameObject {
        private velocity:number = 10;
        private _active:boolean;

        // PUBLIC PROPERTIES
        get active():boolean 
        {
            return this._active;
        }
        set active(value:boolean)
        {
            this._active = value;
        }

        // constuctor 
        constructor(startPosition:Vector2) {
            super(); 
            this.x = startPosition.x;
            this.y = startPosition.y;
            this._active = true;
        }

        protected _checkBounds(): void {
            throw new Error("Method not implemented.");
        }
        public isOutOfBounds():boolean{
            return this.x > 1200;
        }
        public Start(): void {
            throw new Error("Method not implemented.");
        }
        public Update(): void {
            this.position.x += this.velocity;
        }
        public Reset(): void {
            throw new Error("Method not implemented.");
        }
    }
}