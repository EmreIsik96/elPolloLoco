class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  world;
  camera_x = 0;
  statusBar = [new HealthBar(), new CoinBar(), new BottleBar()];
  thorwableObjects = [];
  coins = [];
  collectedCoin = 0;
  collectedBottles = 0;
  bottles = [];
  coinCollectSound = new Audio('audio/coin-collect.mp3');
 

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.addCoins(5); // Erstelle 5 zufällige Coins (oder beliebige Anzahl)
    this.addBottles(5);// Erstelle 5 zufällige Bottles (oder beliebige Anzahl)
    this.draw();
    this.setWorld();
    this.run();
    console.log(this.statusBar);
  }

  run(){
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  checkCollisions(){
    this.checkCollisonWithCoin();
    this.checkCollisonWithEnemy();
    this.checkCollisonWithBottle();
  }

  checkThrowObjects(){
    if (this.keyboard.F) {
      let bottle = new ThorwableObject(this.character.x + 50, this.character.y + 100)
      this.thorwableObjects.push(bottle);
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
      this.bottles.push(new Bottles()); // Erstelle einen neuen Coin und füge ihn zum Array hinzu
    }
  }

  checkCollisonWithEnemy()
  {
    level1.enemies.forEach((enemy) =>{
      if(this.character.isColliding(enemy)){
        this.character.hit();
        this.statusBar[0].setPercentageHealth(this.character.energy);
      }
    });
  }

  checkCollisonWithCoin()
  {
    this.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        this.coinCollectSound.play();
        this.coins.splice(i, 1); // Münze aus dem Array entfernen
        this.collectedCoin ++;
        this.statusBar[1].setCollectedCoins(this.collectedCoin);
        
      }
    });
  }

  checkCollisonWithBottle()
  {
    this.bottles.forEach((bottle, i) => {
      if (this.character.isColliding(bottle)) {       
        this.bottles.splice(i, 1); // Flasche aus dem Array entfernen
        this.collectedBottles ++;
        this.statusBar[2].setCollectedBottles(this.collectedBottles);
      }
    });
  }

 

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
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
      this.flipImage(mo)
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    
    if (mo.otherDirection) {
      this.flipImageBack(mo)
    }
  }

  flipImage(mo){
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
  flipImageBack(mo)
  {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
