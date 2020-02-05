module objects {
    export class Player extends objects.GameObject {
        // constuctor 

        constructor() {
            super();
        }
        protected _checkBounds(): void {
            throw new Error("Method not implemented.");
        }
        public Start(): void {
            throw new Error("Method not implemented.");
        }
        public Update(): void {
            throw new Error("Method not implemented.");
        }
        public Reset(): void {
            throw new Error("Method not implemented.");
        }
    }
}