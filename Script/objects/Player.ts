module objects {
    export class Player extends objects.GameObject {
        private velocity:number = 3;
        private isMoving:boolean = false;
        private direction:string = 'U';// U - Up, D - Down
        private bullet1?:objects.Bullet;
        // constuctor 

        constructor(x?:number) {
            super(); 
            if (x == 2){
                this.x = 735;
            }
            this.y = 80;
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
        public Shot(stage:createjs.Stage): void {
            console.log("Shot");
            this.bullet1 = new objects.Bullet(this.position);
            stage.addChild(this.bullet1);
            //bullet1.move();
        }
        public Update(): void {
            if (this.isMoving){
                if (this.direction == 'U'){
                    this.y -= this.velocity;
                } else {
                    this.y += this.velocity;
                }
            }

            if (this.y < 80) {
                this.y = 80;
            } else if (this.y > 535) {
                this.y = 535;
            }
            if (this.bullet1){
                this.bullet1.Update();
            } 
            // bullets.forEach(element => {
            //     let bullet1 = new objects.Bullet(this.position);
            //     this.stage.addChild(bullet1);
            //     delete element;
            // });
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