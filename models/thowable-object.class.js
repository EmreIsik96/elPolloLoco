class ThorwableObject extends MovableObject {
  /**
   * collect Rotations Images when throwing the bottle.
   */
  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  intervalID;

  /**
   * load Rotations Images when throwing the bottle.
   */
  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGES_BOTTLE);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 60;
    this.throw();
  }

  /**
   * throw Bottle Function.
   */
  throw() {
    let characterDirection = world.character.otherDirection;
    this.speedY = 10;
    this.applyGravity();
    if (!characterDirection) {
      setInterval(() => {
        this.x += 6;
      }, 20);
    } else {
      setInterval(() => {
        this.x -= 6;
      }, 20);
    }
    this.intervalID = setInterval(() => {
      this.playAnimate(this.IMAGES_BOTTLE);
    }, 100);
  }

  /**
   * splash Bottle Function.
   */
  splash() {
    clearInterval(this.intervalID);
    this.currentImage = 0;
    this.playAnimationOnce(this.IMAGES_BOTTLE_SPLASH);
  }
}
