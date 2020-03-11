module managers {
    export class Keyboard {
        // PRIVATE INSTANCE MEMBERS
        private static _enabled: boolean;
        private static _keyStatus: boolean[][] = [[], []];

        // PRIVATE STATIC METHODS
        private static onKeyDown(event: KeyboardEvent): void {
            switch (event.keyCode) {
                case config.Settings.KeyPlayerOneUp:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.MOVE_UP] = true;
                    break;

                case config.Settings.KeyPlayerOneDown:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.MOVE_DOWN] = true;
                    break;

                case config.Settings.KeyPlayerOneCCW:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.ROTATE_CC] = true;
                    break;

                case config.Settings.KeyPlayerOneCW:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.ROTATE_CW] = true;
                    break;

                case config.Settings.KeyPlayerOneShoot:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.SHOOT] = true;
                    break;

                case config.Settings.KeyPlayerTwoUp:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.MOVE_UP] = true;
                    break;

                case config.Settings.KeyPlayerTwoDown:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.MOVE_DOWN] = true;
                    break;

                case config.Settings.KeyPlayerTwoCCW:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.ROTATE_CC] = true;
                    break;

                case config.Settings.KeyPlayerTwoCW:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.ROTATE_CW] = true;
                    break;

                case config.Settings.KeyPlayerTwoShoot:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.SHOOT] = true;
                    break;
            }
        }

        private static onKeyUp(event: KeyboardEvent): void {
            switch (event.keyCode) {
                case config.Settings.KeyPlayerOneUp:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.MOVE_UP] = false;
                    break;

                case config.Settings.KeyPlayerOneDown:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.MOVE_DOWN] = false;
                    break;

                case config.Settings.KeyPlayerOneCCW:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.ROTATE_CC] = false;
                    break;

                case config.Settings.KeyPlayerOneCW:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.ROTATE_CW] = false;
                    break;

                case config.Settings.KeyPlayerOneShoot:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.SHOOT] = false;
                    break;

                case config.Settings.KeyPlayerTwoUp:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.MOVE_UP] = false;
                    break;

                case config.Settings.KeyPlayerTwoDown:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.MOVE_DOWN] = false;
                    break;

                case config.Settings.KeyPlayerTwoCCW:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.ROTATE_CC] = false;
                    break;

                case config.Settings.KeyPlayerTwoCW:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.ROTATE_CW] = false;
                    break;

                case config.Settings.KeyPlayerTwoShoot:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.SHOOT] = false;
                    break;
            }
        }

        // PUBLIC STATIC METHODS
        public static Start() {
            this._enabled = true;

            // Add the events listeners
            document.addEventListener("keydown", this.onKeyDown.bind(this), false);
            document.addEventListener("keyup", this.onKeyUp.bind(this), false);
        }

        public static Stop() {
            this._enabled = false;

            // Remove the events listeners
            document.removeEventListener("keydown", this.onKeyDown.bind(this), false);
            document.removeEventListener("keyup", this.onKeyUp.bind(this), false);
        }

        public static ResetKeys() {
            for (let iPlr = 0; iPlr < enums.PlayerId.NUM_OF_PLAYERS; iPlr++) {
                for (let iKey = 0; iKey < enums.PlayerKeys.NUM_OF_KEYS; iKey++) {
                    this._keyStatus[iPlr][iKey] = false;
                }
            }
        }

        public static IsActive(plr: enums.PlayerId, key: enums.PlayerKeys): boolean {
            return this._keyStatus[plr][key];
        }

        public static GetPlayerKeys(plr: enums.PlayerId): boolean[] {
            return [].concat(this._keyStatus[plr]);
        }

        public static IsEnabled(): boolean {
            return this._enabled;
        }
    }
}
