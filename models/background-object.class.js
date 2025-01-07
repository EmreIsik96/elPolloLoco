/**
 * Represents a background object in the game.
 * Inherits from `MovableObject` and loads an image at a given position.
 */
class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Creates a background object.
   * @param {string} imagePath - The path to the background image.
   * @param {number} x - The horizontal position of the background.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath, x);
    this.x = x;
    this.y = 480 - this.height;
  }
}
