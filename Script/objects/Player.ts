module objects {
    export class Player extends objects.GameObject {
        private velocity:number = 3;
        private isMoving:boolean = false;
        private direction:string = 'U';// U - Up, D - Down
        // private bullet1?:objects.Bullet;
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
        // public Shot(stage:createjs.Stage): void {
        //     //console.log("Shot");
        //     this.bullet1 = new objects.Bullet(this.position);
        //     stage.addChild(this.bullet1);
        //     //bullet1.move();
        // }
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
            } else if (y > 655) {
                y = 655;
            }
            this.position = new Vector2(this.position.x, y);
            // if (this.bullet1){
            //     this.bullet1.Update();
            //     if (this.bullet1.isOutOfBounds()){
            //         this.bullet1 = undefined;
            //     }
            // } 
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