class Chicken extends MovableObject {
  height = 70;
  width = 70;
  y = 360;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 720 + Math.random() * 720 * 2;
    this.speed = 0.5 + Math.random() * 0.75;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimate(this.IMAGES_WALKING);
    }, 100);
  }
  
}
