/**
 * Represents the bottle status bar in the game.
 * Displays different images based on the number of collected bottles.
 * Inherits from "DrawableObject".
 */
class BottleBar extends DrawableObject {
  x = 30;
  y = 0;
  height = 60;
  width = 200;
  collectedBottles = 0;

  /**
   * load Bottle Statusbar Images in array.
   */
  IMAGES_BOTTLE_STATUS = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  /**
   * Initializes the bottle bar by loading images and setting the default value.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLE_STATUS);
    this.setCollectedBottles(0);
  }

  /**
   * Updates the bottle bar based on the collected bottles.
   * @param {number} amountOfBottles - The number of collected bottles.
   */
  setCollectedBottles(amountOfBottles) {
    this.y = 100;
    this.collectedBottles = amountOfBottles;
    let path = this.IMAGES_BOTTLE_STATUS[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the correct image index based on the number of collected bottles.
   * @returns {number} The index of the corresponding status image.
   */
  resolveImageIndex() {
    if (this.collectedBottles > 5) {
      return 5;
    } else if (this.collectedBottles == 5) {
      return 5;
    } else if (this.collectedBottles == 4) {
      return 4;
    } else if (this.collectedBottles == 3) {
      return 3;
    } else if (this.collectedBottles == 2) {
      return 2;
    } else if (this.collectedBottles == 1) {
      return 1;
    } else if (this.collectedBottles == 0) {
      return 0;
    }
  }
}
