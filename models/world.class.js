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
    setInterval(() => {
      this.checkCollisonBossWithBottle();
    }, 600);
    setInterval(() => {
      this.checkThrowObjects();
    }, 180);
    setInterval(() => {
      if (charIsDead) return;
      this.checkCollisonWithEndboss();
    }, 280);
    setInterval(() => {
      if (charIsDead) return;
      this.checkCollisonWithChicken();
    }, 100);
    setInterval(() => {
      if (charIsDead) return;
      this.checkCollisonWithSmallChicken();
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

  setWorld() {
    this.character.world = this;
  }

  addCoins(amountOfCoins) {
    for (let i = 0; i < amountOfCoins; i++) {
      this.coins.push(new Coins()); // Erstelle einen neuen Coin und füge ihn zum Array hinzu
    }
  }

  addBottles(amountOfBottles) {
    for (let i = 0; i < amountOfBottles; i++) {
      this.bottles.push(new Bottles()); // Erstelle einen neuen bottle und füge ihn zum Array hinzu
    }
  }

  checkCollisonWithChicken() {
    level1.chicken.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (enemy.isDead) return;
        if (this.character.y + this.character.height <= enemy.y + enemy.height && this.character.speedY <= 0) {
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
      }
    });
  }

  checkCollisonWithSmallChicken() {
    level1.smallChicken.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (enemy.isDead) return;
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
      }
    });
  }

  checkCollisonWithEndboss() {
    level1.endboss.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (enemy.isDead) return;
        this.character.hit();
        this.statusBar[0].setPercentageHealth(this.character.energy);
        if (!this.isMuted) {
          this.soundCollection.sounds.hurtCharacter.play();
        }
      }
    });
  }

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

  checkCollisonChickenWithBottle() {
    this.thorwableObjects.forEach((bottle) => {
      level1.chicken.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !enemy.isDead) {
          enemy.hitEnemy();
          if (!this.isMuted) {
            this.soundCollection.sounds.hitEnemySound.play();
          }
        }
      });
    });
  }

  checkCollisonSmallChickenWithBottle() {
    this.thorwableObjects.forEach((bottle) => {
      level1.smallChicken.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !enemy.isDead) {
          enemy.hitEnemy();
          if (!this.isMuted) {
            this.soundCollection.sounds.hitEnemySound.play();
          }
        }
      });
    });
  }

  checkCollisonBossWithBottle() {
    this.thorwableObjects.forEach((bottle) => {
      level1.endboss.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          enemy.hitEnemy();
          this.statusBar[3].hitEndboss(this.hitCount);
          if (!this.isMuted) {
            this.soundCollection.sounds.hitEnemySound.play();
          }
        }
      });
    });
  }

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

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
