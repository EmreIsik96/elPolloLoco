class BottleBar extends DrawableObject {
  x = 30;
  y = 0;
  height = 60;
  width = 200;
  collectedBottles = 0;
  IMAGES_BOTTLE_STATUS = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  constructor()
  {
    super();
    this.loadImages(this.IMAGES_BOTTLE_STATUS);
    this.setCollectedBottles(0);
  }
  setCollectedBottles(amountForBottles)
  {
    this.y = 100;
    this.collectedBottles = amountForBottles;
    let path = this.IMAGES_BOTTLE_STATUS[this.resolveImageIndex()]
    this.img = this.imageCache[path];
  }

  resolveImageIndex()
    {
        if (this.collectedBottles == 5) {
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
