/**
 * Represents a coin bar that displays the collected coins status.
 * Extends the "DrawableObject".
 */
class CoinBar extends DrawableObject {
  x = 30;
  y = 0;
  height = 60;
  width = 200;

  IMAGES_COIN_STATUS = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  /**
   * Creates a new CoinBar object.
   * Loads the initial image and all status images.
   * Sets the initial collected coins to 0.
   */
  constructor() {
    super().loadImage(this.IMAGES_COIN_STATUS[0]);
    this.loadImages(this.IMAGES_COIN_STATUS);
    this.setCollectedCoins(0);
  }

  /**
   * Sets the collected coins and updates the displayed image.
   * @param {number} percentageForCoins - The number of collected coins (0-5).
   */
  setCollectedCoins(percentageForCoins) {
    this.y = 50;
    this.collectedCoin = percentageForCoins;
    let path = this.IMAGES_COIN_STATUS[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the correct image index based on the collected coins.
   * @returns {number} The index of the image in the IMAGES_COIN_STATUS array.
   */
  resolveImageIndex() {
    if (this.collectedCoin == 5) {
      return 5;
    } else if (this.collectedCoin == 4) {
      return 4;
    } else if (this.collectedCoin == 3) {
      return 3;
    } else if (this.collectedCoin == 2) {
      return 2;
    } else if (this.collectedCoin == 1) {
      return 1;
    } else if (this.collectedCoin == 0) {
      return 0;
    }
  }
}
