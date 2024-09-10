class HealthBar extends DrawableObject {
  x = 30;
  y = 0;
  height = 60;
  width = 200;
  percentage = 100;
  IMAGES_HEALTH_STATUS = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  constructor()
  {
    super();
    this.loadImages(this.IMAGES_HEALTH_STATUS);
    this.setPercentageHealth(100);
  }

  setPercentageHealth(percentageForHealth)
  {
    this.percentage = percentageForHealth;
    let path = this.IMAGES_HEALTH_STATUS[this.resolveImageIndex()];
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