/**
 * Represents the final boss enemy.
 * Extends the "MovableObject".
 */
class Endboss extends MovableObject {
  height = 350;
  width = 250;
  y = 105;
  hitCount = 0;
  minX = 720 * 4.5;
  maxX = 720 * 5.5;
  maxHits = 5;
  hadFirstContact = false;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png"
  ];
  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  offset = {
    top: 120,
    bottom: 30,
    right: 40,
    left: 40,
  };

  /**
   * Creates a new Endboss object.
   * Loads images, sets initial position and speed, and starts the animation.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.speed = 1;
    this.x = 720 * 5;
    this.isDead = false;
    this.animate();
  }

  /**
   * Animates the endboss's movement and animations.
   */
  animate() {
    let i = 0;
    /**
     * If character is not dead, walk functions are performed when pressing the keys.
     */
    setInterval(() => {
      if (charIsDead) return;
      if (!this.isDead && i > 3 && this.hadFirstContact) {
        this.moveEndboss();
      }
    }, 1000 / 60);

    /**
     * If character is not dead, walk images are played when pressing the keys.
     */
    setInterval(() => {     
      if (world.character.x > 720 * 4.5 && !this.hadFirstContact) {
        i = 0;
        this.hadFirstContact = true;
      }
      if (!this.isDead && i > 3 && this.hadFirstContact) {
        this.playAnimate(this.IMAGES_WALKING);
      }
      i++;
    }, 260);
  }

  /**
   * Moves the endboss back and forth within a defined range.
   */
  moveEndboss() {
    if (this.x <= this.minX) {
      this.otherDirection = true;
    } else if (this.x >= this.maxX) {
      this.otherDirection = false;
    }
    if (this.otherDirection) {
      this.moveForward();
    } else {
      this.moveBackward();
    }
  }

  /**
   * Moves the endboss forward (to the right).
   */
  moveForward() {
    this.speed = Math.random() * 7;
    this.x += this.speed;
  }

  /**
   * Moves the endboss backward (to the left).
   */
  moveBackward() {
    this.speed = Math.random() * 7;
    this.x -= this.speed;
  }

  /**
   * Handles the endboss being hit. Plays the hurt animation and checks for death.
   */
  hitEnemy() {
    if (this.isDead) return;
    this.hitCount++;
    let currentImageIndex = 0;

    let interval = setInterval(() => {
      this.loadImage(this.IMAGES_HURT[currentImageIndex]);
      currentImageIndex++;

      if (currentImageIndex >= this.IMAGES_HURT.length) {
        clearInterval(interval);
      }
    }, 200);

    if (this.hitCount >= this.maxHits) {
      this.dieEnemy();
      setTimeout(() => {
        winGame();
      }, 1000);
    }
  }
  
  /**
   * Handles the endboss's death. Plays the death animation.
   */
  dieEnemy() {
    this.speed = 0;
    this.isDead = true;
    let currentImageIndex = 0;

    let interval = setInterval(() => {
      this.loadImage(this.IMAGES_DEAD[currentImageIndex]); 
      currentImageIndex++;

      if (currentImageIndex >= this.IMAGES_DEAD.length) {
        clearInterval(interval); 
      }
    }, 200); 
  }
}
