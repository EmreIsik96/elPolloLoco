class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  SPACE = false;
  F = false;

  /**
   * Creates an instance of the Keyboard class.
   * Initializes keyboard and mobile button event listeners.
   *
   * @constructor
   */
  constructor() {
    this.keyboardEvents();
    this.mobileButtonEvents();
  }

  /**
   * Sets up keyboard events for key presses and releases.
   */
  keyboardEvents() {
    window.addEventListener("keydown", (event) => {
      if (event.code == "ArrowUp") {
        this.UP = true;
      }
      if (event.code == "ArrowRight") {
        this.RIGHT = true;
      }
      if (event.code == "ArrowLeft") {
        this.LEFT = true;
      }
      if (event.code == "Space") {
        this.SPACE = true;
      }
      if (event.code == "KeyF") {
        this.F = true;
      }
    });

    window.addEventListener("keyup", (event) => {
      if (event.code == "ArrowUp") {
        this.UP = false;
      }
      if (event.code == "ArrowDown") {
        this.DOWN = false;
      }
      if (event.code == "ArrowRight") {
        this.RIGHT = false;
      }
      if (event.code == "ArrowLeft") {
        this.LEFT = false;
      }
      if (event.code == "Space") {
        this.SPACE = false;
      }
      if (event.code == "KeyF") {
        this.F = false;
      }
    });
  }

  mobileButtonEvents() {
    document
      .getElementById("left_btn")
      .addEventListener("touchstart", (event) => {
        event.preventDefault();
        this.LEFT = true;
      });
    document
      .getElementById("left_btn")
      .addEventListener("touchend", (event) => {
        event.preventDefault();
        this.LEFT = false;
      });
    document
      .getElementById("right_btn")
      .addEventListener("touchstart", (event) => {
        event.preventDefault();
        this.RIGHT = true;
      });
    document
      .getElementById("right_btn")
      .addEventListener("touchend", (event) => {
        event.preventDefault();
        this.RIGHT = false;
      });
    document
      .getElementById("up_btn")
      .addEventListener("touchstart", (event) => {
        event.preventDefault();
        this.SPACE = true;
      });
    document.getElementById("up_btn").addEventListener("touchend", (event) => {
      event.preventDefault();
      this.SPACE = false;
    });
    document.getElementById("throw").addEventListener("touchstart", (event) => {
      event.preventDefault();
      this.F = true;
    });
    document.getElementById("throw").addEventListener("touchend", (event) => {
      event.preventDefault();
      this.F = false;
    });
  }
}
