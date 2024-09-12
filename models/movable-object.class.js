class MovableObject extends DrawableObject{
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

  playAnimate(images) { // lässt die Bilder im Cache anzeigen
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
    return this.x + this.width - this.offset.right > mo.x + mo.offset.left && 
           this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && 
           this.x + this.offset.left < mo.x + mo.width - mo.offset.right && 
           this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
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
