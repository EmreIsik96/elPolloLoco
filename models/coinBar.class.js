class CoinBar extends DrawableObject {
  x = 30;
  y = 0;
  height = 60;
  width = 200;
  percentage = 100;
  IMAGES_COIN_STATUS = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  constructor()
  {
    super().loadImage(this.IMAGES_COIN_STATUS[0])
    this.loadImages(this.IMAGES_COIN_STATUS);
    this.setCollectedCoins(0);
  }

  setCollectedCoins(percentageForCoins)
  {
    this.y = 50;
    this.percentage = percentageForCoins;
    let path = this.IMAGES_COIN_STATUS[this.resolveImageIndex()]
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
