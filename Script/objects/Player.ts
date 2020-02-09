module objects {
    export class Player extends objects.GameObject {
        private velocity:number = 3;
        private isMoving:boolean = false;
        private direction:string = 'U';// U - Up, D - Down
        private _playerWidth:number = 137;
        private _playerHeight:number = 87;
        
        // constuctor 
        constructor(img:string, plr?:number) {
            super(img);
            let x:number = 0;
            let y:number = 80;

            if (plr == 2){
                x = GameObject.GetCanvasSize().x - this._playerWidth;
            }
            this.position = new Vector2(x, y);
        }
        protected _checkBounds(): void {
            throw new Error("Method not implemented.");
        }
        public Start(): void {
            throw new Error("Method not implemented.");
        }
        public Update(): void {
            let y = this.position.y;

            if (this.isMoving){
                if (this.direction == 'U'){
                    y -= this.velocity;
                } else {
                    y += this.velocity;
                }
            }

            if (y < 80) {// game bar
                y = 80;
            } else if (y > GameObject.GetCanvasSize().y - this._playerHeight) {
                y = GameObject.GetCanvasSize().y - this._playerHeight;
            }
            this.position = new Vector2(this.position.x, y);
        }
        public Reset(): void {
            throw new Error("Method not implemented.");
        }
        public StartMoveUp(){
            this.direction = 'U';
            this.isMoving = true;
        }
        public StartMoveDown(){
            this.direction = 'D';
            this.isMoving = true;
        }
        public StopMove(){
            this.isMoving = false;
        }
    }
}