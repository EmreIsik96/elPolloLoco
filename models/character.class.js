class Character extends MovableObject {
  x = 120;
  y = 80; 
  height = 200;
  width = 100;
  speed = 1.75;
  energy = 100;
  keyPressed = true;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png"
  ];
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png"

  ]
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png"
  ]
 
  offset = {
    top: 120,
    bottom: 30,
    right: 40,
    left: 40,
}

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      if (charIsDead) return;

      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        this.world.soundCollection.sounds.walking_sound.play();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.world.soundCollection.sounds.walking_sound.play();
        this.otherDirection = true;
      }
      if (this.world.keyboard.UP) {
        if (this.y > 230) {
          this.jump();
          this.world.soundCollection.sounds.jumping_sound.play();
        }
      }
      
      this.world.camera_x = -this.x + 100;
    });

    setInterval(() => {
      if (charIsDead) return;
      
      if (this.isDead()){
        this.playAnimate(this.IMAGES_DEAD);
      }
      else if (this.isHurt())
      {
        this.playAnimate(this.IMAGES_HURT)
      }
      else if (this.isAboveGround()) {
        this.playAnimate(this.IMAGES_JUMPING)
      }
      else{
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimate(this.IMAGES_WALKING);
      }
      if (this.world.keyboard.UP) {
        this.playAnimate(this.IMAGES_JUMPING);
      }
      }
    }, 100);
  }
}
