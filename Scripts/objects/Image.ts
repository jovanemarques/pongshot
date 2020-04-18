module objects {
    export class Image extends GameObject {
        // constructor
        constructor(
            imageName: string = "placeholder",
            x: number = 0,
            y: number = 0,
            isCentered: boolean = false,
            scale: number = 1,
            mirror: boolean = false
        ) {
            super(config.Game.ATLAS, imageName, x, y, isCentered);

            this.scaleX = mirror ? scale * -1 : scale;
            this.scaleY = scale;

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {}

        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        public Start(): void {
            this.type = enums.GameObjectType.IMAGE;
        }

        public Update(): void {}

        public Reset(): void {}
    }
}
