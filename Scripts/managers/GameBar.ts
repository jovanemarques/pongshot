module managers {
    // Constants
    const BARS_WIDTH: number = 450;
    const BARS_POS_X_P1: number = 10;
    const BARS_POS_X_P2: number = config.Game.SCREEN_WIDTH - BARS_WIDTH - 12;

    const HB_HEIGHT: number = 18;
    const HB_POS_Y: number = 10;

    const XPB_HEIGHT: number = 8;
    const XPB_POS_Y: number = 35;

    const STATUS_POS_Y: number = 50;

    export class GameBar {
        // PRIVATE INSTANCE MEMBERS
        private _plrOneLife: number;
        private _plrTwoLife: number;
        private _plrOneXp: number;
        private _plrTwoXp: number;
        private _gameStart: number;

        private _plrOneLifeBar: objects.GraphicBar;
        private _plrOneHeartIcon: objects.Image;
        private _plrOneXpBar: objects.GraphicBar;
        private _plrOneStatus: Array<objects.Image>;

        private _plrTwoLifeBar: objects.GraphicBar;
        private _plrTwoHeartIcon: objects.Image;
        private _plrTwoXpBar: objects.GraphicBar;
        private _plrTwoStatus: Array<objects.Image>;

        private _timerLabel: objects.Label;

        // PUBLIC PROPERTIES
        get ScreenObjects(): Array<createjs.DisplayObject> {
            let result: Array<createjs.DisplayObject> = [
                this._timerLabel,
                this._plrOneLifeBar,
                this._plrTwoLifeBar,
                this._plrOneXpBar,
                this._plrTwoXpBar,
                this._plrOneHeartIcon,
                this._plrTwoHeartIcon
            ];
            this._plrOneStatus.forEach(i => result.push(i));
            this._plrTwoStatus.forEach(i => result.push(i));
            return result;
        }

        // CONSTRUCTOR
        constructor() {
            this._plrOneLife = 100;
            this._plrTwoLife = 100;
            this._plrOneXp = 0;
            this._plrTwoXp = 0;
            this._gameStart = new Date().getTime();

            this._plrOneLifeBar = new objects.GraphicBar(
                BARS_POS_X_P1,
                HB_POS_Y,
                BARS_WIDTH,
                HB_HEIGHT,
                objects.GameBarType.HEALTH
            );
            this._plrOneHeartIcon = new objects.Image(
                config.Game.ASSETS.getResult("heart"),
                BARS_POS_X_P1 + BARS_WIDTH + 10,
                HB_POS_Y
            );
            this._plrOneXpBar = new objects.GraphicBar(
                BARS_POS_X_P1,
                XPB_POS_Y,
                BARS_WIDTH,
                XPB_HEIGHT,
                objects.GameBarType.EXPERIENCE
            );
            this._plrOneStatus = this._createStatusBarImages(BARS_POS_X_P1, STATUS_POS_Y, 25);

            this._plrTwoLifeBar = new objects.GraphicBar(
                BARS_POS_X_P2,
                HB_POS_Y,
                BARS_WIDTH,
                HB_HEIGHT,
                objects.GameBarType.HEALTH,
                true
            );
            this._plrTwoHeartIcon = new objects.Image(
                config.Game.ASSETS.getResult("heart"),
                BARS_POS_X_P2 - 30,
                HB_POS_Y
            );
            this._plrTwoXpBar = new objects.GraphicBar(
                BARS_POS_X_P2,
                XPB_POS_Y,
                BARS_WIDTH,
                XPB_HEIGHT,
                objects.GameBarType.EXPERIENCE,
                true
            );
            this._plrTwoStatus = this._createStatusBarImages(BARS_POS_X_P2 + BARS_WIDTH - 14, STATUS_POS_Y, -25);

            this._timerLabel = new objects.Label("000:00", "48px", "Consolas", "#000000", 640, 40, true);
        }

        // PRIVATE METHODS
        private _createStatusBarImages(posX: number, posY: number, incPosX: number): Array<objects.Image> {
            let result = new Array<objects.Image>();
            let imagesToCreate = ["itemArmor", "itemBoots", "itemSpellScroll"];
            let currentPosX: number = posX;

            imagesToCreate.forEach(item => {
                let image = new objects.Image(config.Game.ASSETS.getResult(item), currentPosX, posY, false);
                image.scaleX = 0.5;
                image.scaleY = 0.5;
                image.alpha = 0.25;
                result.push(image);
                currentPosX += incPosX;
            });

            return result;
        }

        // PUBLIC METHODS
        public Update(): void {
            let curMilis: number = new Date().getTime();
            let secondsDiff: number = (curMilis - this._gameStart) / 1000;
            let seconds: string = ("00" + (Math.floor(secondsDiff) % 60)).substr(-2);
            let minutes: string = ("000" + Math.floor(secondsDiff / 60)).substr(-3);

            this._timerLabel.text = `${minutes}:${seconds}`;
        }

        public PostDamage(player: enums.PlayerId, damage: number): void {
            if (player == enums.PlayerId.PLAYER_ONE) {
                this._plrOneLife -= damage;
                this._plrOneLifeBar.Value = this._plrOneLife;

                if (this._plrOneLife <= 0) {
                    config.Game.SCENE = scenes.State.END;
                    config.Game.WINNER = enums.PlayerId.PLAYER_TWO;
                }
            } else {
                this._plrTwoLife -= damage;
                this._plrTwoLifeBar.Value = this._plrTwoLife;

                if (this._plrTwoLife <= 0) {
                    config.Game.SCENE = scenes.State.END;
                    config.Game.WINNER = enums.PlayerId.PLAYER_ONE;
                }
            }
        }
    }
}
