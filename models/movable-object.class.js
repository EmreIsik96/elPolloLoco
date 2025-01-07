/**
 * Base class for all objects that can move in the game world.
 * Extends the "DrawableObject".
 */
class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection;
  speedY = 0;
  acceleration = 1;
  lastHit = 0;
  offset = {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  };

  /**
   * Applies gravity to the object, making it fall when not on the ground.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThorwableObject) {
      return true;
    } else {
      return this.y < 230;
    }
  }

  /**
   * Plays an animation for the object using a sequence of images.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimate(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Plays an animation for the object once using a sequence of images.
   * Clears the interval after the animation finishes.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimationOnce(images) {
    setInterval(() => {
      if (this.currentImage == images.length) {
        clearInterval();
        return;
      }

      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 50);
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its y-axis movement speed.
   */
  jump() {
    this.speedY = 15;
  }

  /**
   *Checks for collision between this object and another movable object.
   *Uses offset values ​​for more accurate collision detection based on the object's image
   *@param {MovableObject} mo - The other movable object to check for collision with.
   * @returns {boolean} True if there is a collision, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Checks if the character is touching an enemy (simplified vertical collision checking).
   * @param {MovableObject} mo - The enemy to check for vertical touch against.
   * @returns {boolean} True if there is a vertical touch, false otherwise.
   */
  charHitEnemy(mo) {
    return (
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Deals damage to the object and reduces its energy.
   */
  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object has just taken damage (temporarily invulnerable).
   * @returns {boolean} True if the object is invulnerable, false otherwise.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * Checks if the object is dead (no energy left).
   * Calls the gameOver() function if the object is dead
   */
  isDead() {
    if (this.energy == 0) {
      gameOver();
    }
  }

  /**
   * Handles character movement based on keyboard inputs (right/left).
   */
  charWalking() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      if (!world.isMuted) {
        this.world.soundCollection.sounds.walking_sound.play();
      }
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      if (!world.isMuted) {
        this.world.soundCollection.sounds.walking_sound.play();
      }
    }
  }

  /**
   * Handles character jumping based on the space bar.
   */
  charJumping() {
    if (this.world.keyboard.SPACE) {
      if (this.y > 225) {
        this.jump();
        if (!world.isMuted) {
          this.world.soundCollection.sounds.jumping_sound.play();
        }
      }
    }
  }
}
