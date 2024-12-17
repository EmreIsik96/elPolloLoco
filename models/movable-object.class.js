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
   * give the character a gravity so that he returns to the ground after jumping.
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
   * check if the character is on the ground.
   */
  isAboveGround() {
    if (this instanceof ThorwableObject) {
      return true;
    } else {
      return this.y < 230;
    }
  }

  /**
   * display the images in the cache.
   */
  playAnimate(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * make all movable objects run to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * make all movable objects run left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * make character jump.
   */
  jump() {
    this.speedY = 15;
  }

  /**
   * check if character, enemys or objects collide with each other.
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
   * check if character hits the enemy.
   */
  charHitEnemy(mo) {
    return (
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

   /**
   * what should happen to the character when he is hit.
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
   * whether character is injured.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 0.7;
  }

  /**
   * whether character is dead.
   */
  isDead() {
    if (this.energy == 0) {
      gameOver();
    }
  }

   /**
   * makes the character walk.
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
   * makes the character jump.
   */
  charJumping() {
    if (this.world.keyboard.SPACE) {
      if (this.y > 230) {
        this.jump();
        if (!world.isMuted) {
          this.world.soundCollection.sounds.jumping_sound.play();
        }
      }
    }
  }
}
