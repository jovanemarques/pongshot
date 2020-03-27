module scenes {
    export class Play extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _player1: objects.Player;
        private _player2: objects.Player;
        private _powerUp: objects.PowerUp;

        private _bullets: Array<objects.Bullet> = [];
        private _gameBar: managers.GameBar;
        private _plrOneBulletTick: number;
        private _plrTwoBulletTick: number;

        constructor() {
            super();
            this.Start();
        }

        public Start(): void {
            // Create the players
            this._player1 = new objects.Player(enums.PlayerId.PLAYER_ONE, config.Game.PLAYER1_CHARACTER);
            this._player2 = new objects.Player(enums.PlayerId.PLAYER_TWO, config.Game.PLAYER2_CHARACTER);

            setInterval(() => {
                // TODO: make this timer logic work somehow and check for item collision.
                // this._powerUp = new objects.PowerUp();
            }, 5000 || Math.random() * 100);

            this._powerUp = new objects.PowerUp();

            // Create the GamaBar
            this._gameBar = new managers.GameBar();

            // Initialize the keyboard
            managers.Keyboard.Start();

            this._plrOneBulletTick = 0;
            this._plrTwoBulletTick = 0;

            this.Main();
        }

        public Update(): void {
            this._player1.Update();
            this._player2.Update();
            this._gameBar.Update();

            if (managers.Keyboard.IsActive(enums.PlayerId.PLAYER_ONE, enums.PlayerKeys.SHOOT)) {
                let curTick = createjs.Ticker.getTicks();
                if (curTick - this._plrOneBulletTick >= config.Game.PLAYER1_STATUS.AttackSpeed) {
                    this._player1.Attack();
                    let bullet = new objects.Bullet(this._player1.position, enums.PlayerId.PLAYER_ONE);
                    this._bullets.push(bullet);
                    this.addChild(bullet);
                    this._plrOneBulletTick = curTick;
                }
            }

            if (managers.Keyboard.IsActive(enums.PlayerId.PLAYER_TWO, enums.PlayerKeys.SHOOT)) {
                let curTick = createjs.Ticker.getTicks();
                if (curTick - this._plrTwoBulletTick >= config.Game.PLAYER1_STATUS.AttackSpeed) {
                    this._player2.Attack();
                    let bullet = new objects.Bullet(this._player2.position, enums.PlayerId.PLAYER_TWO);
                    this._bullets.push(bullet);
                    this.addChild(bullet);
                    this._plrTwoBulletTick = curTick;
                }
            }

            this._bullets.forEach((e, index) => {
                if (e && e.isOutOfBounds()) {
                    this.removeChild(e);
                    delete this._bullets[index];
                } else if (e) {
                    e.Update();
                }

                if (e.Player == enums.PlayerId.PLAYER_TWO && managers.Collision.AABBCheck(this._player1, e)) {
                    this.removeChild(e);
                    delete this._bullets[index];
                    this._player1.Hit();
                    this._gameBar.PostDamage(
                        enums.PlayerId.PLAYER_ONE,
                        config.Game.PLAYER1_STATUS.CalculateDamage(config.Game.PLAYER2_STATUS.AtackPower)
                    );
                }
                if (e.Player == enums.PlayerId.PLAYER_ONE && managers.Collision.AABBCheck(this._player2, e)) {
                    this.removeChild(e);
                    delete this._bullets[index];
                    this._player2.Hit();
                    this._gameBar.PostDamage(
                        enums.PlayerId.PLAYER_TWO,
                        config.Game.PLAYER2_STATUS.CalculateDamage(config.Game.PLAYER1_STATUS.AtackPower)
                    );
                }
            });
        }

        public Main(): void {
            this.addChild(this._player1);
            this.addChild(this._player2);
            this.addChild(this._powerUp);
            this._gameBar.ScreenObjects.forEach(obj => this.addChild(obj));
        }
    }
}
