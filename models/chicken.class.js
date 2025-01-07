/**
 * Represents a normal chicken enemy in the game.
 * Chickens move left and can be defeated after a certain number of hits.
 * Inherits from "MovableObject".
 */
class Chicken extends MovableObject {
  height = 70;
  width = 70;
  y = 360;
  hitCount = 0;
  maxHits = 3;
  dyingNormalChicken = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  IMAGES_WALKING_NORMAL_CHICKEN = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * Initializes a chicken with a random position and movement speed.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING_NORMAL_CHICKEN[0]);
    this.loadImages(this.IMAGES_WALKING_NORMAL_CHICKEN);
    this.loadImage(this.dyingNormalChicken);
    this.x = 720 + Math.random() * 720 * 5.5;
    this.speed = 0.5 + Math.random() * 0.75;
    this.isDead = false;
    this.animate();
  }

  /**
   * Animates the chicken's movement and walking cycle.
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
        this.playAnimate(this.IMAGES_WALKING_NORMAL_CHICKEN);
      }
    }, 100);
  }

  /**
   * Registers a hit on the chicken and checks if it should be defeated.
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
   * Kills the chicken by stopping movement and changing its image.
   */
  dieEnemy() {
    this.isDead = true;
    this.speed = 0;
    this.loadImage(this.dyingNormalChicken);
  }
}
