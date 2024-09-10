class MovableObject extends DrawableObject{
  speed = 0.15;
  otherDirection;
  speedY = 0;
  acceleration = 1;
  lastHit = 0;
  energy = 100;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThorwableObject) {
      return true;
    } else {
    return this.y < 230;
  }
}

  playAnimate(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 15;
  }

  isColliding(mo)
  {
    return this.x + this.width > mo.x && 
           this.y + 100 + this.height - 100 > mo.y && 
           this.x < mo.x + mo.width - 80 && 
           this.y + 130 < mo.y + mo.height
  }

  hit()
  {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0
    }
    else {
      this.lastHit = new Date().getTime();
    }
  }
  isHurt()
  {
    let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
    timePassed = timePassed / 1000;
    return timePassed < 0.7;
  }

  isDead()
  {
    return this.energy == 0;
  }
}
