class Chicken extends MovableObject {
  height = 70;
  width = 70;
  y = 360;
  hitCount = 0;
  maxHits = 3; // Anzahl der Treffer, bis der Gegner stirbt
  dyingEnemy = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImage(this.dyingEnemy);
    this.x = 720 + Math.random() * 720 * 2;
    this.speed = 0.5 + Math.random() * 0.75;
    this.isDead = false;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        this.playAnimate(this.IMAGES_WALKING);
      }
    }, 100);
  }

  hitEnemy() {
    if (this.isDead) return;

    this.hitCount++;
    console.log(this.hitCount);
    if (this.hitCount >= this.maxHits) {
      this.dieEnemy();
    }
  }

  dieEnemy() {
   this.isDead = true;
   this.speed = 0;
   this.loadImage(this.dyingEnemy);
  }

  
}
