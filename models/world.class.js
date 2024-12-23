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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.addCoins(5);
    this.addBottles(10);
    this.draw();
    this.setWorld();
    this.run();
  }

  run() {
    /**
     * play the functions at intervals.
     */
    setInterval(() => {
      this.checkCollisonBossWithBottle();
    }, 600);
    setInterval(() => {
      this.checkThrowObjects();
    }, 180);
    setInterval(() => {
      if (charIsDead) return;
      const currentTime = new Date().getTime();
      this.checkCollisonWithEndboss(currentTime);
    }, 280);
    setInterval(() => {
      if (charIsDead) return;
      const currentTime = new Date().getTime();
      this.checkCollisonWithChicken(currentTime);
    }, 100);
    setInterval(() => {
      if (charIsDead) return;
      const currentTime = new Date().getTime();
      this.checkCollisonWithSmallChicken(currentTime);
    }, 100);
    setInterval(() => {
      this.checkCollisonChickenWithBottle();
    }, 280);
    setInterval(() => {
      this.checkCollisonSmallChickenWithBottle();
    }, 280);
    setInterval(() => {
      this.checkCollisonWithBottle();
      this.checkCollisonWithCoin();
    }, 20);
  }

  /**
   * check all collisions on the map.
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
   * check if the bottle has been thrown so that the status bar and maximum number of collected bottles have been reached so that no more can be picked up.
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
   * connect character with word so that you can access world later via character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Collect coins and push them into the array.
   */
  addCoins(amountOfCoins) {
    for (let i = 0; i < amountOfCoins; i++) {
      this.coins.push(new Coins());
    }
  }

  /**
   * Collect bottles and push them into the array.
   */
  addBottles(amountOfBottles) {
    for (let i = 0; i < amountOfBottles; i++) {
      this.bottles.push(new Bottles()); // Erstelle einen neuen bottle und füge ihn zum Array hinzu
    }
  }

  /**
   * check collision with chicken.
   */
  checkCollisonWithChicken(currentTime) {
    level1.chicken.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          const alreadyHit = currentTime - enemy.lastCollision < 1000;
            if (enemy.isDead) return;
            if (alreadyHit) return;
            if (this.character.y + this.character.height <= enemy.y + enemy.height &&
                this.character.speedY <= 0) {
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
   * check collision with small chicken.
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
   * check collision with Endboss.
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
   * check collision with Coin on map.
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
   * check collision with bottle on map.
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
   * check collision between throwed bottle and chicken.
   */
  checkCollisonChickenWithBottle() {
    this.thorwableObjects.forEach((bottle) => {
      level1.chicken.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !enemy.isDead) {
          enemy.hitEnemy();
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
   * check collision between throwed bottle and small chicken.
   */
  checkCollisonSmallChickenWithBottle() {
    this.thorwableObjects.forEach((bottle) => {
      level1.smallChicken.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !enemy.isDead) {
          enemy.hitEnemy();
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
   * check collision between throwed bottle and Endboss.
   */
  checkCollisonBossWithBottle() {
    this.thorwableObjects.forEach((bottle) => {
      level1.endboss.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          enemy.hitEnemy();
          this.statusBar[3].hitEndboss(this.hitCount);
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
   * drawing collected objects/images on the canvas.
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
   * drawing collected objects/images on the canvas.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * drawing collected objects/images on the canvas.
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
   * flip Image so that character points in the right direction.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * flip character image in reverse direction.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
