module objects 
{
    export class Button extends createjs.Bitmap
    {
        // constuctor 

        constructor(imagePath:string, x:number, y:number, isCentered:boolean)
        {
            super(imagePath);

            if(isCentered)
            {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getBounds().height * 0.5;


            }
            this.x = x;
            this.y = y;

            this.on("mouseover", this.HoverOver);
            this.on("mouseout", this.HoverOut);
        }

        HoverOver():void
        {
            this.alpha = 0.7;
        }

        HoverOut():void
        {
            this.alpha = 0.7;
        }
    }
}