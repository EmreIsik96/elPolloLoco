class ThorwableObject extends MovableObject {
  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 60;
    this.trow();
  }

  trow() {
    let characterDirection = world.character.otherDirection;
    this.speedY = 15;
    this.applyGravity();
    if (!characterDirection) {
      setInterval(() => {
        this.x += 5;
      }, 20);
    } else {
      setInterval(() => {
        this.x -= 5;
      }, 20);
    }
    setInterval(() => {
      this.playAnimate(this.IMAGES_BOTTLE);
    }, 100);
  }
}
