module objects {
    export class Player extends objects.GameObject {
        private velocity:number = 3;
        private isMoving:boolean = false;
        private direction:string = 'U';// U - Up, D - Down
        
        // constuctor 
        constructor(plr?:number) {
            super();
            let x:number = 0;
            let y:number = 80;

            if (plr == 2){
                x = 1215;
            }
            this.position = new Vector2(x, y);
        }
        // constructor(playerImage?:string, x: number, y: number) {
        //     super(playerImage, x);
        // }
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

            if (y < 80) {
                y = 80;
            } else if (y > GameObject.GetCanvasSize().y - 65) {
                y = GameObject.GetCanvasSize().y - 65; //65 is the player size
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