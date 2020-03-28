module objects {
    export class PlayerStatus {
        // PRIVATE INSTACE MEMBERS
        private _level: number;
        private _attackSpeed: number;
        private _attackPower: number;
        private _armor: number;
        private _attackSpeedIncrement: number;
        private _attackPowerIncrement: number;
        private _armorIncrement: number;
        private _attackSpeedPUTick: number;
        private _attackPowerPUTick: number;
        private _armorPUTick: number;

        // PUBLIC PROPERTIES
        public get Level(): number {
            return this._level;
        }
        public get AttackSpeed(): number {
            return this._attackSpeed / (this._attackSpeedPUTick > 0 ? 2 : 1);
        }
        public get AtackPower(): number {
            return this._attackPower * (this._attackPowerPUTick > 0 ? 2 : 1);
        }
        public get Armor(): number {
            return this._armor * (this._armorPUTick > 0 ? 2 : 1);
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
            this._attackSpeed = initialAttackSpeed;
            this._attackSpeedIncrement = incAS;
            this._attackPower = initialAttackPower;
            this._attackPowerIncrement = incAP;
            this._armor = initialArmor;
            this._armorIncrement = incAr;

            this._attackSpeedPUTick = -1;
            this._attackPowerPUTick = -1;
            this._armorPUTick = -1;
        }

        // PRIVATE METHODS

        // PUBLIC METHODS
        public LevelUp(): void {
            if (this._level < 5) {
                this._level++;
                this._attackSpeed -= this._attackSpeedIncrement;
                this._attackPower += this._attackPowerIncrement;
                this._armor += this._armorIncrement;
            }
        }

        public CalculateDamage(attack: number) {
            return attack - attack * this.Armor * 0.01;
        }

        public ActivatePowerUp(power: objects.PowerUp, tick: number): void {
            switch (power.PowerType) {
                case "itemArmor":
                    this._armorPUTick = tick;
                    break;

                case "itemSpellScroll":
                    this._attackPowerPUTick = tick;
                    break;

                case "itemBoots":
                    this._attackSpeedPUTick = tick;
                    break;

                case "itemHp":
                    break;

                case "itemXp":
                    break;
            }
        }
    }

    // Character status
    export const CharacterStatusMage = new objects.PlayerStatus(120, 10, 20, 3, 6, 1);
    export const CharacterStatusRogue = new objects.PlayerStatus(80, 8, 12, 2, 10, 1);
    export const CharacterStatusWarrior = new objects.PlayerStatus(90, 5, 15, 2, 12, 2);
    export const CharacterStatusArcher = new objects.PlayerStatus(60, 5, 10, 2, 8, 1);
}
