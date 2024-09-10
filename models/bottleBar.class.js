class BottleBar extends DrawableObject {
  x = 30;
  y = 0;
  height = 60;
  width = 200;
  percentage = 100;
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
    super().loadImage(this.IMAGES_BOTTLE_STATUS[0])
    this.loadImages(this.IMAGES_BOTTLE_STATUS);
  
  }
  setCollectedCoins(percentageForCoins)
  {
    this.y = 100;
    this.percentage = percentageForCoins;
    let path = this.IMAGES_BOTTLE_STATUS[this.resolveImageIndex()]
    this.img = this.imageCache[path];
  }

  resolveImageIndex()
    {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 20) {
            return 1;
        } else if (this.percentage == 0) {
            return 0;
        }
    }
}
