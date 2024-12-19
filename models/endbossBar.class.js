class EndbossBar extends DrawableObject {
  x = 500;
  y = 80;
  height = 60;
  width = 200;

  /**
   * collect Endboss Statusbar Images.
   */
  IMAGES_ENDBOSS_BAR = [
    "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  /**
   * load Endboss Statusbar Images.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_ENDBOSS_BAR);
    this.hitEndboss();
  }

   /**
   * count the hit on Endboss.
   */
  hitEndboss() {
    this.hitCount = level1.endboss[0].hitCount;
    let path = this.IMAGES_ENDBOSS_BAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

   /**
   * change Statusbar Images while hit Endboss.
   */
  resolveImageIndex() {
    if (this.hitCount > 5) {
      return 0;
    } else if (this.hitCount == 5) {
      return 0;
    } else if (this.hitCount == 4) {
      return 1;
    } else if (this.hitCount == 3) {
      return 2;
    } else if (this.hitCount == 2) {
      return 3;
    } else if (this.hitCount == 1) {
      return 4;
    } else if (this.hitCount == 0) {
      return 5;
    }
  }
}
