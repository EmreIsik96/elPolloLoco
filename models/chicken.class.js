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
    this.hitCount = 0;
    this.maxHits = 3; // Anzahl der Treffer, bis der Gegner stirbt
    this.dyingImage = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
  }

  hitEnemy() {
    this.hitCount++;
    if (this.hitCount >= this.maxHits) {
      this.dieEnemy();
    }
  }

  dieEnemy() {
   this.speed = 0;
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
