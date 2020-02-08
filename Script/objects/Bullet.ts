module objects {
    export class Bullet extends objects.GameObject {
        private velocity:number = 10;
        // constuctor 

        constructor(startPosition:Vector2) {
            super(); 
            this.x = startPosition.x;
            this.y = startPosition.y;
        }
        protected _checkBounds(): void {
            throw new Error("Method not implemented.");
        }
        public isOutOfBounds():boolean{
            return this.x > 700;
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