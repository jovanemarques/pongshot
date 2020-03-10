module scenes {
  export class Start extends objects.Scene {
    // PRIVATE INSTANCE MEMBERS
    private _background: objects.Image;
    private _welcomeLabel: objects.Label;
    private _player1Label: objects.Label;
    private _player2Label: objects.Label;
    private _startButton: objects.Button;

    // Player selection handlers
    private _p1Selection: enums.PlayerType;
    private _p1AssaultButton: objects.Button;
    private _p1SniperButton: objects.Button;

    private _p2Selection: enums.PlayerType;
    private _p2AssaultButton: objects.Button;
    private _p2SniperButton: objects.Button;

    // CONSTRUCTOR
    constructor() {
      super();
      this.Start();
    }

    /**
     * Pallete
     * Orange #ffcc5c
     * Green #96ceb2
     * Red #ff6f69
     * White #ffffff
     */

    // PUBLIC METHODS
    public Start(): void {
      // Background
      this._background = new objects.Image(
        config.Game.ASSETS.getResult("blackBackground")
      );

      // Labels
      this._player1Label = new objects.Label(
        "Player One",
        "30px",
        "Consolas",
        "#ffcc5c",
        300,
        200,
        true
      );
      this._player2Label = new objects.Label(
        "Player Two",
        "30px",
        "Consolas",
        "#ffcc5c",
        config.Game.SCREEN_WIDTH - 300,
        200,
        true
      );
      this._welcomeLabel = new objects.Label(
        "The Game",
        "80px",
        "Consolas",
        "#96ceb2",
        640,
        100,
        true
      );

      // Buttons
      // TODO: create player type images.
      this._startButton = new objects.Button(
        config.Game.ASSETS.getResult("startButton"),
        640,
        config.Game.SCREEN_HEIGHT - 100,
        true
      );
      this._p1AssaultButton = new objects.Button(
        config.Game.ASSETS.getResult("startButton"),
        300,
        300,
        true
      );
      this._p1SniperButton = new objects.Button(
        config.Game.ASSETS.getResult("startButton"),
        300,
        400,
        true
      );

      this.Main();
    }

    public Update(): void {}

    public Main(): void {
      this.addChild(this._background);
      this.addChild(this._welcomeLabel);
      this.addChild(this._player1Label);
      this.addChild(this._player2Label);
      this.addChild(this._startButton);

      this.addChild(this._p1AssaultButton);
      this.addChild(this._p1SniperButton);
      //   this.addChild(this._p2AssaultButton);
      //   this.addChild(this._p2SniperButton);

      this._startButton.on("click", () => {
        config.Game.SCENE = scenes.State.PLAY;
      });
      this._p1AssaultButton.on("click", () => {
        this._p1Selection = enums.PlayerType.ASSAULT;
      });
      this._p1SniperButton.on("click", () => {
        this._p1Selection = enums.PlayerType.SNIPER;
      });
    }
  }
}
