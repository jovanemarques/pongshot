module config {
    export class Game {
        public static SCREEN_WIDTH: number = 1280;
        public static SCREEN_HEIGHT: number = 720;
        public static PLAYER1_CHARACTER: string;
        public static PLAYER2_CHARACTER: string;
        public static PLAYER1_STATUS: objects.PlayerStatus;
        public static PLAYER2_STATUS: objects.PlayerStatus;
        public static WINNER: enums.PlayerId;
        public static SCENE: scenes.State;
        public static ASSETS: createjs.LoadQueue;
        public static FPS: number = 60; // 60 Frames per second
        static GAME_BAR_HEIGHT: number = 80;
        public static INITIAL_ITEM_SPAWN_TICKER: number = 30 * Game.FPS;
    }
}
