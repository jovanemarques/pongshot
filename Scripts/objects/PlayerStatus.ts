module objects {
    //
    const COMMON_POWER_UP_DURATION: number = 15 * config.Game.FPS;
    const TRAP_POWER_UP_DURATION: number = 5 * config.Game.FPS;

    class PowerUpInfo {
        // PRIVATE INSTANCE MEMBERS
        private _value: number;
        private _increment: number;
        private _tick: number;
        private _status: enums.PowerUpStatus;
        private _powerMultiplier: number;
        private _powerDuration: number;

        // PUBLIC PROPERTIES
        public get Value(): number {
            return this._value;
        }
        public set Value(value: number) {
            this._value = value;
        }
        public get Increment(): number {
            return this._increment;
        }
        public get Tick(): number {
            return this._tick;
        }
        public set Tick(value: number) {
            this._tick = value;
        }
        public get Status(): enums.PowerUpStatus {
            return this._status;
        }
        public set Status(value: enums.PowerUpStatus) {
            this._status = value;
        }
        public get PowerMultiplier(): number {
            return this._powerMultiplier;
        }
        public get PowerDuration(): number {
            return this._powerDuration;
        }

        constructor(value: number, increment: number, powerMultiplier: number, powerDuration: number) {
            this._value = value;
            this._increment = increment;
            this._tick = -1;
            this._status = enums.PowerUpStatus.INACTIVE;
            this._powerMultiplier = powerMultiplier;
            this._powerDuration = powerDuration;
        }
    }

    export class PlayerStatus {
        // PRIVATE INSTACE MEMBERS
        private _level: number;
        private _status: Array<PowerUpInfo>;

        // PUBLIC PROPERTIES
        public get Level(): number {
            return this._level;
        }

        // CONSTRUCTORS
        constructor(
            initialAttackSpeed: number,
            incAS: number,
            initialAttackPower: number,
            incAP: number,
            initialArmor: number,
            incAr: number
        ) {
            this._level = 1;
            this._status = new Array<PowerUpInfo>(enums.StatusTypes.NUM_OF_STATUS);
            this._status[enums.StatusTypes.ATK_SPEED] = new PowerUpInfo(
                initialAttackSpeed,
                -incAS,
                0.5,
                COMMON_POWER_UP_DURATION
            );
            this._status[enums.StatusTypes.ATK_POWER] = new PowerUpInfo(
                initialAttackPower,
                incAP,
                2,
                COMMON_POWER_UP_DURATION
            );
            this._status[enums.StatusTypes.ARMOR] = new PowerUpInfo(initialArmor, incAr, 2, COMMON_POWER_UP_DURATION);
            this._status[enums.StatusTypes.TRAP] = new PowerUpInfo(0, 0, 0, TRAP_POWER_UP_DURATION);
        }

        // PRIVATE METHODS

        // PUBLIC METHODS
        public Update(): void {
            let currentTick = createjs.Ticker.getTicks();

            this._status.forEach(s => {
                if (s.Status != enums.PowerUpStatus.INACTIVE) {
                    let diff = currentTick - s.Tick;
                    switch (s.Status) {
                        case enums.PowerUpStatus.ACTIVE:
                            if (diff >= s.PowerDuration * 0.5) {
                                s.Status = enums.PowerUpStatus.ACTIVE_HALF_TIME;
                            }
                            break;

                        case enums.PowerUpStatus.ACTIVE_HALF_TIME:
                            if (diff >= s.PowerDuration * 0.75) {
                                s.Status = enums.PowerUpStatus.ACTIVE_QUARTER_TIME;
                            }
                            break;

                        case enums.PowerUpStatus.ACTIVE_QUARTER_TIME:
                            if (diff > s.PowerDuration) {
                                s.Status = enums.PowerUpStatus.INACTIVE;
                                s.Tick = constants.DEFAULT_POWER_UP_TICK;
                            }
                            break;
                    }
                }
            });
        }

        public LevelUp(): void {
            if (this._level < constants.MAX_LEVEL) {
                this._level++;
                this._status.forEach(s => (s.Value += s.Increment));
            }
        }

        public CalculateDamage(attack: number) {
            return attack - attack * this.GetValue(enums.StatusTypes.ARMOR) * 0.01;
        }

        public ActivatePowerUp(power: objects.PowerUp, tick: number): void {
            let powerInfo: PowerUpInfo;

            switch (power.PowerType) {
                case enums.PowerUpTypes.ARMOR:
                    powerInfo = this._status[enums.StatusTypes.ARMOR];
                    break;

                case enums.PowerUpTypes.ATTACK_POWER:
                    powerInfo = this._status[enums.StatusTypes.ATK_POWER];
                    break;

                case enums.PowerUpTypes.ATTACK_SPEED:
                    powerInfo = this._status[enums.StatusTypes.ATK_SPEED];
                    break;
            }

            if (powerInfo) {
                powerInfo.Tick = tick;
                powerInfo.Status = enums.PowerUpStatus.ACTIVE;
            }
        }

        public GetValue(type: enums.StatusTypes): number {
            let power = this._status[type];
            // Verify if the power up is active
            if (power.Status != enums.PowerUpStatus.INACTIVE) {
                return power.Value * power.Increment;
            }
            return power.Value;
        }

        public GetPowerStatus(type: enums.StatusTypes): enums.PowerUpStatus {
            return this._status[type].Status;
        }
    }

    // Character status
    export const CharacterStatusMage = new objects.PlayerStatus(120, 10, 20, 3, 6, 1);
    export const CharacterStatusRogue = new objects.PlayerStatus(80, 8, 12, 2, 10, 1);
    export const CharacterStatusWarrior = new objects.PlayerStatus(90, 5, 15, 2, 12, 2);
    export const CharacterStatusArcher = new objects.PlayerStatus(60, 5, 10, 2, 8, 1);
}
