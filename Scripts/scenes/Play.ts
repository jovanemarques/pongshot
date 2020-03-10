module scenes {
    export class Play extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _player1: objects.Player;
        private _player2: objects.Player;
        private _bullets: Array<objects.Bullet> = [];
        private _gameBar: managers.GameBar;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void {
            // Create the players
            this._player1 = new objects.Player(managers.PlayerId.PLAYER_ONE);
            this._player2 = new objects.Player(managers.PlayerId.PLAYER_TWO);

            // Create the GamaBar
            this._gameBar = new managers.GameBar();

            // Initialize the keyboard
            managers.Keyboard.Start();

            this.Main();
        }

        public Update(): void {
            this._player1.Update();

            this._player2.Update();

            this._gameBar.Update();

            if (managers.Keyboard.IsActive(managers.PlayerId.PLAYER_ONE, managers.PlayerKeys.SHOOT)) {
                let bullet = new objects.Bullet(this._player1.position);
                this._bullets.push(bullet);
                this.addChild(bullet);
            }

            if (managers.Keyboard.IsActive(managers.PlayerId.PLAYER_TWO, managers.PlayerKeys.SHOOT)) {
                let bullet = new objects.Bullet(this._player2.position, true);
                this._bullets.push(bullet);
                this.addChild(bullet);
            }

            this._bullets.forEach((e, index) => {
                if (e && e.isOutOfBounds()) {
                    this.removeChild(e);
                    delete this._bullets[index];
                } else if (e) {
                    e.Update();
                }
            });

            // managers.Collision.AABBCheck(this._plane, this._island);

            // this._clouds.forEach(cloud => {
            //     cloud.Update();
            //     managers.Collision.squaredRadiusCheck(this._plane, cloud);
            // });
        }

        public Main(): void {
            this.addChild(this._player1);

            this.addChild(this._player2);

            this._gameBar.ScreenObjects.forEach(obj => this.addChild(obj));
        }
    }
}
