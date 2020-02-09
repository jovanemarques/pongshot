module objects {
    export class Bullet extends objects.GameObject {
        private velocity:number = 10;
        private isPlayer2:boolean;
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

        constructor(startPosition:Vector2, isPlayer2:boolean = false) {
            // from https://opengameart.org/content/bullets-game-asset
            super('./Assets/images/bullet4-16.png'); 
            this.position = new Vector2(startPosition.x, startPosition.y, this);
            //this.x = startPosition.x;
            //this.y = startPosition.y;
            this.isPlayer2 = isPlayer2;
            //this._active = true;
        }

        protected _checkBounds(): void {
            throw new Error("Method not implemented.");
        }
        public isOutOfBounds():boolean{
            if (this.isPlayer2){
                return this.x > GameObject.GetCanvasSize().x;
            } else {
                return this.x < 0;
            }
        }
        public Start(): void {
            throw new Error("Method not implemented.");
        }
        public Update(): void {
            if (this.isPlayer2){
                this.position.x -= this.velocity;
            } else {
                this.position.x += this.velocity;
            }
        }
        public Reset(): void {
            throw new Error("Method not implemented.");
        }
    }
}