module managers {
    // Constants
    const HB_HEIGHT: number = 20;
    const HB_WIDTH: number = 450;
    const HB_POS_Y: number = 15;
    const HB_POS_X_P1: number = 10;
    const HB_POS_X_P2: number = config.Game.SCREEN_WIDTH - HB_WIDTH - 12;

    export class GameBar {
        // PRIVATE INSTANCE MEMBERS
        private _plrOneLife: number;
        private _plrTwoLife: number;
        private _plrOneXp: number;
        private _plrTwoXp: number;
        private _gameStart: number;

        private _plrOneLifeBar: objects.GraphicBar;
        private _plrTwoLifeBar: objects.GraphicBar;
        private _plrOneXpBar: createjs.Graphics;
        private _plrTwoXpBar: createjs.Graphics;
        private _timerLabel: objects.Label;

        // PUBLIC PROPERTIES
        get ScreenObjects(): Array<createjs.DisplayObject> {
            return [this._timerLabel, this._plrOneLifeBar, this._plrTwoLifeBar];
        }

        // CONSTRUCTOR
        constructor() {
            this._plrOneLife = 100;
            this._plrTwoLife = 100;
            this._plrOneXp = 0;
            this._plrTwoXp = 0;
            this._gameStart = new Date().getTime();

            this._plrOneLifeBar = new objects.GraphicBar(
                HB_POS_X_P1,
                HB_POS_Y,
                HB_WIDTH,
                HB_HEIGHT,
                objects.GameBarType.HEALTH
            );

            this._plrTwoLifeBar = new objects.GraphicBar(
                HB_POS_X_P2,
                HB_POS_Y,
                HB_WIDTH,
                HB_HEIGHT,
                objects.GameBarType.HEALTH
            );

            this._plrOneXpBar = new createjs.Graphics();
            this._plrTwoXpBar = new createjs.Graphics();
            this._timerLabel = new objects.Label("000:00", "48px", "Consolas", "#000000", 640, 40, true);
        }

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
                }
            } else {
                this._plrTwoLife -= damage;
                this._plrOneLifeBar.Value = this._plrTwoLife;

                if (this._plrTwoLife <= 0) {
                    config.Game.SCENE = scenes.State.END;
                }
            }
        }
    }
}
