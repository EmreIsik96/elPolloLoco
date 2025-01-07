/**
 * Represents a cloud object that moves across the screen.
 * Extends the MovableObject class.
 */
class Cloud extends MovableObject {
  y = 0;
  height = 320;
  width = 580;

  /**
   * Creates a new Cloud object.
   * Loads the cloud image and sets a random initial x position.
   * Starts the animation.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = 0 + Math.random() * 500;
    this.animate();
  }

  /**
   * Animates the cloud by moving it to the left.
   */
  animate() {
    this.moveLeft();
  }
}
