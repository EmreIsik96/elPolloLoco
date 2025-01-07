/**
 * Represents a small chicken enemy.
 * Extends the MovableObject class.
 */
class SmallChicken extends MovableObject {
  height = 70;
  width = 70;
  y = 360;
  hitCount = 0;
  maxHits = 3;
  dyingSmallChicken = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  IMAGES_WALKING_SMALL_CHICKEN = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Creates a new SmallChicken object.
   * Loads images, sets initial position and speed, and starts the animation.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING_SMALL_CHICKEN[0]);
    this.loadImages(this.IMAGES_WALKING_SMALL_CHICKEN);
    this.loadImage(this.dyingSmallChicken);
    this.x = 720 + Math.random() * 720 * 5.5;
    this.speed = 0.5 + Math.random() * 0.75;
    this.isDead = false;
    this.animate();
  }

  /**
   * Animates the small chicken's movement and animations.
   */
  animate() {
    setInterval(() => {
      if (charIsDead) return;
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        this.playAnimate(this.IMAGES_WALKING_SMALL_CHICKEN);
      }
    }, 100);
  }

  /**
   * Animates the small chicken's movement and animations.
   */
  hitEnemy() {
    if (this.isDead) return;

    this.hitCount++;

    if (this.hitCount >= this.maxHits) {
      this.isDead = true;
      this.dieEnemy();
    }
  }

  /**
   * Handles the small chicken's death. Loads the dying image and stops movement.
   */
  dieEnemy() {
    this.isDead = true;
    this.speed = 0;
    this.loadImage(this.dyingSmallChicken);
  }
}
