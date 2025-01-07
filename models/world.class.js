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
  statusBar = [
    new HealthBar(),
    new CoinBar(),
    new BottleBar(),
    new EndbossBar(),
  ];
  thorwableObjects = [];
  coins = [];
  collectedCoin = 0;
  collectedBottles = 0;
  maxCollectedBottles = 5;
  bottles = [];
  isMuted = false;
  soundCollection = new SoundCollection();

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
    setInterval(() => {
      if (charIsDead) return;
      const currentTime = new Date().getTime();
      this.checkCollisonWithEndboss(currentTime);
      this.checkCollisonChickenWithBottle();
      this.checkCollisonSmallChickenWithBottle();
    }, 280);
    setInterval(() => {
      if (charIsDead) return;
      const currentTime = new Date().getTime();
      this.checkThrowObjects();
      this.checkCollisonWithChicken(currentTime);
      this.checkCollisonWithSmallChicken(currentTime);
    }, 100);
    setInterval(() => {
      if (charIsDead) return;
      const currentTime = new Date().getTime();
      this.checkCollisonBossWithBottle(currentTime);
      this.checkCollisonWithBottle();
      this.checkCollisonWithCoin();
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
   * Checks if the character throws objects (F key) and creates a new "ThorwableObject" if appropriate.
   */
  checkThrowObjects() {
    if (this.keyboard.F && this.collectedBottles > 0) {
      let bottle = new ThorwableObject(
        this.character.x + 50,
        this.character.y + 100
      );
      this.thorwableObjects.push(bottle);
      this.collectedBottles--;
      this.statusBar[2].setCollectedBottles(this.collectedBottles);
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
        if (enemy.isDead) return;
        if (alreadyHit) return;
        if (
          this.character.y + this.character.height <= enemy.y + enemy.height &&
          this.character.speedY <= 0
        ) {
          enemy.isDead = true;
          enemy.dieEnemy();
          this.character.speedY = 10;
          if (!this.isMuted) {
            this.soundCollection.sounds.hitEnemySound.play();
          }
        } else {
          this.character.hit();
          this.statusBar[0].setPercentageHealth(this.character.energy);
          if (!this.isMuted) {
            this.soundCollection.sounds.hurtCharacter.play();
          }
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
        if (enemy.isDead) return;
        if (alreadyHit) return;
        if (
          this.character.y + this.character.height <= enemy.y + enemy.height &&
          this.character.speedY <= 0
        ) {
          enemy.isDead = true;
          enemy.dieEnemy();
          this.character.speedY = 10;
          if (!this.isMuted) {
            this.soundCollection.sounds.hitEnemySound.play();
          }
        } else {
          this.character.hit();
          this.statusBar[0].setPercentageHealth(this.character.energy);
          if (!this.isMuted) {
            this.soundCollection.sounds.hurtCharacter.play();
          }
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
        if (!this.isMuted) {
          this.soundCollection.sounds.hurtCharacter.play();
        }
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
        if (!this.isMuted) {
          this.soundCollection.sounds.coinCollectSound.play();
        }
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
      if (
        this.character.isColliding(bottle) &&
        this.collectedBottles < this.maxCollectedBottles
      ) {
        this.bottles.splice(i, 1);
        this.collectedBottles++;
        this.statusBar[2].setCollectedBottles(this.collectedBottles);
        if (!this.isMuted) {
          this.soundCollection.sounds.collectBottleSound.play();
        }
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
          if (!this.isMuted) {
            this.soundCollection.sounds.brokenBottle.play();
            setTimeout(() => {
              this.soundCollection.sounds.hitEnemySound.play();
            }, 500);
          }
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
          if (!this.isMuted) {
            this.soundCollection.sounds.brokenBottle.play();
            setTimeout(() => {
              this.soundCollection.sounds.hitEnemySound.play();
            }, 500);
          }
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

          this.statusBar[3].hitEndboss(this.hitCount);
          if (!this.isMuted) {
            this.soundCollection.sounds.brokenBottle.play();
            setTimeout(() => {
              this.soundCollection.sounds.hitEnemySound.play();
            }, 500);
          }
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
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.chicken);
    this.addObjectsToMap(this.level.smallChicken);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.thorwableObjects);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.bottles);

    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
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
}
