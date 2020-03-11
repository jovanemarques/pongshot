module managers {
    export class GameBar {
        // PRIVATE INSTANCE MEMBERS
        private _plrOneLife: number;
        private _plrTwoLife: number;
        private _plrOneXp: number;
        private _plrTwoXp: number;
        private _gameStart: number;

        private _plrOneLifeBar: createjs.Graphics;
        private _plrTwoLifeBar: createjs.Graphics;
        private _plrOneXpBar: createjs.Graphics;
        private _plrTwoXpBar: createjs.Graphics;
        private _timerLabel: objects.Label;
        private _plrOneHealth: objects.Label;
        private _plrTwoHealth: objects.Label;

        // PUBLIC PROPERTIES
        get ScreenObjects(): Array<createjs.DisplayObject> {
            return [this._timerLabel, this._plrOneHealth, this._plrTwoHealth];
        }

        // CONSTRUCTOR
        constructor() {
            this._plrOneLife = 100;
            this._plrTwoLife = 100;
            this._plrOneXp = 0;
            this._plrTwoXp = 0;
            this._gameStart = new Date().getTime();

            this._plrOneLifeBar = new createjs.Graphics();
            this._plrTwoLifeBar = new createjs.Graphics();
            this._plrOneXpBar = new createjs.Graphics();
            this._plrTwoXpBar = new createjs.Graphics();
            this._timerLabel = new objects.Label("000:00", "48px", "Consolas", "#000000", 640, 40, true);
            this._plrOneHealth = new objects.Label("100", "30px", "Consolas", "#000000", 40, 40, true);
            this._plrTwoHealth = new objects.Label("100", "30px", "Consolas", "#000000", 1000, 40, true);
        }

        public Update(): void {
            let curMilis: number = new Date().getTime();
            let secondsDiff: number = (curMilis - this._gameStart) / 1000;
            let seconds: string = ("00" + (Math.floor(secondsDiff) % 60)).substr(-2);
            let minutes: string = ("000" + Math.floor(secondsDiff / 60)).substr(-3);

            this._timerLabel.text = `${minutes}:${seconds}`;

            this._plrOneHealth.text = this._plrOneLife.toFixed(0);
            this._plrTwoHealth.text = this._plrTwoLife.toFixed(0);
        }

        public PostDamage(player: enums.PlayerId, damage: number): void {
            if (player == enums.PlayerId.PLAYER_ONE) {
                this._plrOneLife -= damage;

                if (this._plrOneLife <= 0) {
                    config.Game.SCENE = scenes.State.END;
                }
            } else {
                this._plrTwoLife -= damage;
                if (this._plrTwoLife <= 0) {
                    config.Game.SCENE = scenes.State.END;
                }
            }
        }
    }
}
