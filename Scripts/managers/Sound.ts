/*
 * File: managers/Sound.ts
 * Author: Ailton De Lima - 301018951
 * Description: Manager for sound, control the sound/music on/off and play sounds during the play
 *
 * Created: 2020-04-06
 */
module managers {
    export class Sound {
        // PRIVATE INSTANCE MEMBERS
        private _music: boolean;
        private _sound: boolean;
        private _buttonMusic: objects.Label;
        private _buttonSound: objects.Label;

        private _background: createjs.AbstractSoundInstance;

        // CONSTRUCTOR
        constructor() {
            // Create the background sound
            this._background = createjs.Sound.play("bgSound", { loop: -1, volume: 0.01 });

            this._music = true;
            this._sound = true;

            // Button which will appear in all scenes (Added by main game.ts)
            this._buttonMusic = new objects.Label(
                "█ Music",
                "20px",
                "Pixel",
                "#00FF00",
                config.Game.SCREEN_WIDTH * 0.5 - 107,
                15,
                true
            );
            this._buttonSound = new objects.Label(
                "Sound █",
                "20px",
                "Pixel",
                "#00FF00",
                config.Game.SCREEN_WIDTH * 0.5 + 115,
                15,
                true
            );

            // Event to handle the music
            this._buttonMusic.on("click", () => {
                this._music = !this._music;
                this._buttonMusic.color = this._music ? "#00FF00" : "#FF0000";
                this._background.paused = !this._music;
            });

            // Event to handle the sounds
            this._buttonSound.on("click", () => {
                this._sound = !this._sound;
                this._buttonSound.color = this._sound ? "#00FF00" : "#FF0000";
            });
        }

        public AddObjectsToScene(scene: objects.Scene) {
            // Added both button on the top left of the scenes
            scene.addChild(this._buttonMusic);
            scene.addChild(this._buttonSound);
        }

        public PlaySound(soundName: string, volume: number, loop: number = 0) {
            if (this._sound) {
                createjs.Sound.play(soundName, { loop: loop, volume: volume });
            }
        }
    }
}
