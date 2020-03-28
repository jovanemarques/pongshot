module scenes {
    export class Play extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _player1: objects.Player;
        private _player2: objects.Player;
        private _powerUp: Array<objects.PowerUp> = [];
        private _itemSpawnTicks: number;
        private _bullets: Array<objects.Bullet> = [];
        private _gameBar: managers.GameBar;
        private _plrOneBulletTick: number;
        private _plrTwoBulletTick: number;

        constructor() {
            super();
            this.Start();
        }

        // PRIVATE METHODS
        private _plrShoot(player: objects.Player, status: objects.PlayerStatus, bulletTick: number): number {
            // Verify if the shoot button is active
            if (managers.Keyboard.IsActive(player.PlayerId, enums.PlayerKeys.SHOOT)) {
                // Verify if the player can shoot
                let curTick = createjs.Ticker.getTicks();
                if (curTick - bulletTick >= status.AttackSpeed) {
                    player.Attack();
                    let bullet = new objects.Bullet(player.position, player.PlayerId);
                    this._bullets.push(bullet);
                    this.addChild(bullet);
                    return curTick;
                }
            }
            return bulletTick;
        }

        private _checkBullet(e: objects.Bullet, index: number): void {
            // If is out of screen, remove it and return, otherwise, update it
            if (e && e.isOutOfBounds()) {
                this.removeChild(e);
                delete this._bullets[index];
                return;
            } else if (e) {
                e.Update();
            }

            // Check for player two bullet collisions
            let bulletHit: boolean = false;
            if (e.Player == enums.PlayerId.PLAYER_TWO) {
                if (managers.Collision.AABBCheck(this._player1, e)) {
                    this._player1.Hit();
                    this._gameBar.PostDamage(
                        enums.PlayerId.PLAYER_ONE,
                        config.Game.PLAYER1_STATUS.CalculateDamage(config.Game.PLAYER2_STATUS.AtackPower)
                    );
                    bulletHit = true;
                }
                bulletHit = bulletHit || this._checkPowerUpCollision(e, config.Game.PLAYER2_STATUS);
            } else if (e.Player == enums.PlayerId.PLAYER_ONE) {
                if (managers.Collision.AABBCheck(this._player2, e)) {
                    this._player2.Hit();
                    this._gameBar.PostDamage(
                        enums.PlayerId.PLAYER_TWO,
                        config.Game.PLAYER2_STATUS.CalculateDamage(config.Game.PLAYER1_STATUS.AtackPower)
                    );
                    bulletHit = true;
                }
                bulletHit = bulletHit || this._checkPowerUpCollision(e, config.Game.PLAYER1_STATUS);
            }

            // If the bullet hit something, remove it
            if (bulletHit) {
                this.removeChild(e);
                delete this._bullets[index];
            }
        }

        private _checkPowerUpCollision(e: objects.Bullet, status: objects.PlayerStatus): boolean {
            let result: boolean = false;
            // Checks if the bullet activate the power up
            this._powerUp.forEach((pu, index) => {
                if (managers.Collision.squaredRadiusCheck(pu, e)) {
                    status.ActivatePowerUp(pu, createjs.Ticker.getTicks());
                    this.removeChild(pu);
                    delete this._powerUp[index];
                    result = true;
                }
            });
            return result;
        }

        private _createPowerUp(): void {
            // Create an item every 30s to a minium of 10s (reducing 1s per item showed)

            if (createjs.Ticker.getTicks() % this._itemSpawnTicks == 0) {
                let powerUp = new objects.PowerUp();
                this._powerUp.push(powerUp);
                this.addChild(powerUp);
                if (this._itemSpawnTicks > 10 * config.Game.FPS) {
                    this._itemSpawnTicks -= config.Game.FPS;
                }
            }
        }

        // PUBLIC METHODS
        public Start(): void {
            // Create the players
            this._player1 = new objects.Player(enums.PlayerId.PLAYER_ONE, config.Game.PLAYER1_CHARACTER);
            this._player2 = new objects.Player(enums.PlayerId.PLAYER_TWO, config.Game.PLAYER2_CHARACTER);

            setInterval(() => {
                // TODO: make this timer logic work somehow and check for item collision.
                // this._powerUp = new objects.PowerUp();
            }, 5000 || Math.random() * 100);

            this._powerUp = new Array<objects.PowerUp>();

            // Create the GamaBar
            this._gameBar = new managers.GameBar();

            // Initialize the keyboard
            managers.Keyboard.Start();

            this._plrOneBulletTick = 0;
            this._plrTwoBulletTick = 0;

            this._itemSpawnTicks = config.Game.INITIAL_ITEM_SPAWN_TICKER;

            this.Main();
        }

        public Update(): void {
            this._player1.Update();
            this._player2.Update();
            this._gameBar.Update();

            this._plrOneBulletTick = this._plrShoot(this._player1, config.Game.PLAYER1_STATUS, this._plrOneBulletTick);
            this._plrTwoBulletTick = this._plrShoot(this._player2, config.Game.PLAYER2_STATUS, this._plrTwoBulletTick);

            this._bullets.forEach((e, index) => {
                this._checkBullet(e, index);

                if (e.Player == enums.PlayerId.PLAYER_ONE) {
                }
            });

            this._createPowerUp();
        }

        public Main(): void {
            this.addChild(this._player1);
            this.addChild(this._player2);
            this._gameBar.ScreenObjects.forEach(obj => this.addChild(obj));
        }
    }
}
