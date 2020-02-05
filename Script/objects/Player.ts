module objects {
    export class Player extends objects.GameObject {
        private VELOCITY:number = 3;
        private isMoving:boolean = false;
        private direction:string = 'U';// U - Up, D - Down
        // constuctor 

        constructor(x?:number) {
            super();
            if (x == 2){
                this.x = 735;
            }
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
            if (this.isMoving){
                if (this.direction == 'U'){
                    this.y -= this.VELOCITY;
                } else {
                    this.y += this.VELOCITY;
                }
            }
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