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

        // PUBLIC PROPERTIES
        public get Level(): number {
            return this._level;
        }
        public get AttackSpeed(): number {
            return this._attackSpeed;
        }
        public get AtackPower(): number {
            return this._attackPower;
        }
        public get Armor(): number {
            return this._armor;
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
        }

        // PRIVATE METHODS

        // PUBLIC METHODS
        public LevelUp(): void {
            if (this._level < 5) {
                this._level++;
                this._attackSpeed += this._attackSpeedIncrement;
                this._attackPower += this._attackPowerIncrement;
                this._armor += this._armorIncrement;
            }
        }

        public CalculateDamage(attack: number) {
            return attack - attack * this._armor * 0.01;
        }
    }

    // Character status
    export const CharacterStatusMage = new objects.PlayerStatus(120, 10, 20, 3, 6, 1);
    export const CharacterStatusRogue = new objects.PlayerStatus(80, 8, 12, 2, 10, 1);
    export const CharacterStatusWarrior = new objects.PlayerStatus(90, 5, 15, 2, 12, 2);
    export const CharacterStatusArcher = new objects.PlayerStatus(60, 5, 10, 2, 8, 1);
}
