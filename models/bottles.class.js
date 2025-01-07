/**
 * Represents collectible bottles in the game.
 * Bottles are placed at random positions and can have one of two possible images.
 * Inherits from "MovableObject".
 */
class Bottles extends MovableObject {
  x = 100;
  y = 230;
  height = 60;
  width = 60;

  IMAGES_BOTTLE_ON_THE_GROUND = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates a new bottle at a random position with a random appearance.
   */
  constructor() {
    super().loadImages(this.IMAGES_BOTTLE_ON_THE_GROUND);
    this.x = 100 + Math.random() * 720 * 5; // Zufällige X-Koordinate
    this.y = 360 + Math.random(); // Zufällige Y-Koordinate

    let randomIndex = Math.floor(
      Math.random() * this.IMAGES_BOTTLE_ON_THE_GROUND.length
    ); //
    this.img = this.imageCache[this.IMAGES_BOTTLE_ON_THE_GROUND[randomIndex]]; // switch between 2 Images
  }
}
