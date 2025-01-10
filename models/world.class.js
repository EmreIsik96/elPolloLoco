/**
 * Represents the game world.
 * Manages entities, collisions, sound effects, and rendering.
 */
class World {
  character = new Character();
  endboss = new Endboss();
  bottle = new Bottles();
  level = level1;
  canvas;
  ctx;
  keyboard;
  world;
  camera_x = 0;
  statusBar = [new HealthBar(), new CoinBar(), new BottleBar()];
  endbossBar = [new EndbossBar()];
  thorwableObjects = [];
  bottleThrown = false;
  coins = [];
  collectedCoin = 0;
  collectedBottles = 0;
  maxCollectedBottles = 5;
  bottles = [];
  isMuted = false;
  soundCollection = new SoundCollection();
  lastThrowTime = 0;
  throwCooldown = 500;

  /**
   * Creates a new World instance.
   * @param {HTMLCanvasElement} canvas - The canvas element used for rendering.
   * @param {Keyboard} keyboard - The Keyboard object for handling user input.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.addCoins(5);
    this.addBottles(15);
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Runs the game loop, handling updates and rendering.
   */
  run() {
    if (charIsDead) return;
    setInterval(() => {
      const currentTime = new Date().getTime();
      this.checkCollisionsSetInterval280ms(currentTime);
    }, 280);
    setInterval(() => {
      const currentTime = new Date().getTime();
      this.checkCollisionsSetInterval100ms(currentTime);
    }, 100);
    setInterval(() => {
      const currentTime = new Date().getTime();
      this.checkCollisionsSetInterval10ms(currentTime);
    }, 10);
  }

  /**
   * Checks all collision types in the world.
   *
   */
  checkCollisions() {
    this.checkCollisonWithCoin();
    this.checkCollisonWithChicken();
    this.checkCollisonWithSmallChicken();
    this.checkCollisonWithEndboss();
    this.checkCollisonWithBottle();
    this.checkCollisonChickenWithBottle();
    this.checkCollisonSmallChickenWithBottle();
    this.checkCollisonBossWithBottle();
  }

  /**
   * Checks collisions every 280ms, including the end boss and chickens hit by bottles.
   * @param {number} currentTime - The current time in milliseconds.
   */
  checkCollisionsSetInterval280ms(currentTime) {
    this.checkCollisonWithEndboss(currentTime);
    this.checkCollisonChickenWithBottle();
    this.checkCollisonSmallChickenWithBottle();
  }

  /**
   * Checks collisions every 100ms, including chickens, thrown objects, and small chickens.
   * @param {number} currentTime - The current time in milliseconds.
   */
  checkCollisionsSetInterval100ms(currentTime) {
    this.checkCollisonWithChicken(currentTime);
    this.checkThrowObjects();
    this.checkCollisonWithSmallChicken(currentTime);
  }

  /**
   * Checks collisions every 10ms, including the boss with bottles, other bottles, and coins.
   * @param {number} currentTime - The current time in milliseconds.
   */
  checkCollisionsSetInterval10ms(currentTime) {
    this.checkCollisonBossWithBottle(currentTime);
    this.checkCollisonWithBottle();
    this.checkCollisonWithCoin();
  }

  /**
   * Checks if the character throws objects (F key) and creates a new "ThorwableObject" if appropriate.
   */
  checkThrowObjects() {
    let currentTime = Date.now();
    if (this.keyboard.F && this.collectedBottles > 0 && currentTime - this.lastThrowTime > this.throwCooldown) {
      let bottle = new ThorwableObject(
        this.character.x + 50,
        this.character.y + 100
      );
      this.thorwableObjects.push(bottle);
      this.collectedBottles--;
      this.statusBar[2].setCollectedBottles(this.collectedBottles);
      this.lastThrowTime = currentTime;
    }
  }

  /**
   * Sets the character's `world` property to this World instance.
   * Allows the character to access the world and its properties.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Adds a specified number of coins to the world.
   * @param {number} amountOfCoins - The number of coins to add.
   */
  addCoins(amountOfCoins) {
    for (let i = 0; i < amountOfCoins; i++) {
      this.coins.push(new Coins());
    }
  }

  /**
   * Adds a specified number of bottles to the world.
   * @param {number} amountOfBottles - The number of bottles to add.
   */
  addBottles(amountOfBottles) {
    for (let i = 0; i < amountOfBottles; i++) {
      this.bottles.push(new Bottles());
    }
  }

  /**
   * Checks collisions between the character and chickens.
   * @param {number} currentTime - The current time in milliseconds.
   */
  checkCollisonWithChicken(currentTime) {
    level1.chicken.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        const alreadyHit = currentTime - enemy.lastCollision < 1000;
        if (enemy.isDead || alreadyHit) return;
        if (this.character.y + this.character.height <= enemy.y + enemy.height && this.character.speedY <= 0) {
          enemy.isDead = true;
          enemy.dieEnemy();
          this.character.speedY = 10;
          this.checkIfEnemySoundIsMuted();
        } else {
          this.character.hit();
          this.statusBar[0].setPercentageHealth(this.character.energy);
          this.checkIfCharacterSoundIsMuted();
        }
        enemy.lastCollision = currentTime;
      }
    });
  }

  /**
   * Checks collisions between the character and small chickens.
   * @param {number} currentTime - The current time in milliseconds.
   */
  checkCollisonWithSmallChicken(currentTime) {
    level1.smallChicken.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        const alreadyHit = currentTime - enemy.lastCollision < 1000;
        if (enemy.isDead || alreadyHit) return;
        if (this.character.y + this.character.height <= enemy.y + enemy.height && this.character.speedY <= 0) {
          enemy.isDead = true;
          enemy.dieEnemy();
          this.character.speedY = 10;
          this.checkIfEnemySoundIsMuted();
        } else {
          this.character.hit();
          this.statusBar[0].setPercentageHealth(this.character.energy);
          this.checkIfCharacterSoundIsMuted();
        }
        enemy.lastCollision = currentTime;
      }
    });
  }

  /**
   * Checks collisions between the character and the endboss.
   * @param {number} currentTime - The current time in milliseconds.
   */
  checkCollisonWithEndboss(currentTime) {
    level1.endboss.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        const alreadyHit = currentTime - enemy.lastCollision < 1000;
        if (enemy.isDead) return;
        if (alreadyHit) return;
        this.character.hit();
        this.statusBar[0].setPercentageHealth(this.character.energy);
        this.checkIfCharacterSoundIsMuted();
        enemy.lastCollision = currentTime;
      }
    });
  }

  /**
   * Checks collisions between the character and coins.
   */
  checkCollisonWithCoin() {
    this.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        this.checkIfCoinCollectSoundIsMuted();
        this.coins.splice(i, 1);
        this.collectedCoin++;
        this.statusBar[1].setCollectedCoins(this.collectedCoin);
      }
    });
  }

  /**
   * Checks collisions between the character and bottles.
   */
  checkCollisonWithBottle() {
    this.bottles.forEach((bottle, i) => {
      if (this.character.isColliding(bottle) && this.collectedBottles < this.maxCollectedBottles) {
        this.bottles.splice(i, 1);
        this.collectedBottles++;
        this.statusBar[2].setCollectedBottles(this.collectedBottles);
        this.checkIfBottleCollectSoundIsMuted();
      }
    });
  }

  /**
   * Checks collisions between thrown bottles and chickens.
   */
  checkCollisonChickenWithBottle() {
    this.thorwableObjects.forEach((bottle) => {
      level1.chicken.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !enemy.isDead) {
          enemy.hitEnemy();
          bottle.splash();
          this.checkIfBottleHitsEnemySoundIsMuted();
        }
      });
    });
  }

  /**
   * Checks collisions between thrown bottles and small chickens.
   */
  checkCollisonSmallChickenWithBottle() {
    this.thorwableObjects.forEach((bottle) => {
      level1.smallChicken.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !enemy.isDead) {
          enemy.hitEnemy();
          bottle.splash();
          this.checkIfBottleHitsEnemySoundIsMuted();
        }
      });
    });
  }

  /**
   * Checks collisions between thrown bottles and the endboss.
   * @param {number} currentTime - The current time in milliseconds.
   */
  checkCollisonBossWithBottle(currentTime) {
    this.thorwableObjects.forEach((bottle) => {
      level1.endboss.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          const alreadyHit = currentTime - enemy.lastCollision < 1000;
          if (alreadyHit) return;
          enemy.hitEnemy();
          bottle.splash();
          this.endbossBar[0].hitEndboss(this.hitCount);
          this.checkIfBottleHitsEnemySoundIsMuted();
          enemy.lastCollision = currentTime;
        }
      });
    });
  }

  /**
   * Draws the game world and all its objects onto the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const translateCamera = (offset) => this.ctx.translate(offset, 0);

    translateCamera(this.camera_x);
    ["backgroundObjects", "clouds"].forEach(obj => this.addObjectsToMap(this.level[obj]));
    translateCamera(-this.camera_x);

    this.addObjectsToMap(this.statusBar);
    if (this.character.x > 720 * 4.2) {
      this.addObjectsToMap(this.endbossBar)
    };

    translateCamera(this.camera_x);
    ["chicken", "smallChicken", "endboss"].forEach(enemies => this.addObjectsToMap(this.level[enemies]));
    ["thorwableObjects", "coins", "bottles"].forEach(objects => this.addObjectsToMap(this[objects]));

    this.addToMap(this.character);
    translateCamera(-this.camera_x);

    requestAnimationFrame(() => this.draw());
}

  /**
   * Adds multiple objects to the map.
   * @param {MovableObject[]} objects - An array of objects to add to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single movable object to the map, handling direction (flipping).
   * @param {MovableObject} mo - The object to add to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips an object's image horizontally.
   * @param {MovableObject} mo - The object whose image to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores an object's image to its original (unflipped) state.
   * @param {MovableObject} mo - The object whose image to restore.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Checks whether the respective sound is already muted, if not the sound effect is muted.
   */
  checkIfEnemySoundIsMuted() {
    if (!this.isMuted) {
      this.soundCollection.sounds.hitEnemySound.play();
    }
  }

  /**
   * Checks whether the respective sound is already muted, if not the sound effect is muted.
   */
  checkIfCharacterSoundIsMuted() {
    if (!this.isMuted) {
      this.soundCollection.sounds.hurtCharacter.play();
    }
  }

  /**
   * Checks whether the respective sound is already muted, if not the sound effect is muted.
   */
  checkIfCoinCollectSoundIsMuted() {
    if (!this.isMuted) {
      this.soundCollection.sounds.coinCollectSound.play();
    }
  }

  /**
   * Checks whether the respective sound is already muted, if not the sound effect is muted.
   */
  checkIfBottleCollectSoundIsMuted() {
    if (!this.isMuted) {
      this.soundCollection.sounds.collectBottleSound.play();
    }
  }

  /**
   * Checks whether the respective sound is already muted, if not the sound effect is muted.
   */
  checkIfBottleHitsEnemySoundIsMuted() {
    if (!this.isMuted) {
      this.soundCollection.sounds.brokenBottle.play();
      setTimeout(() => {
        this.soundCollection.sounds.hitEnemySound.play();
      }, 500);
    }
  }
}
