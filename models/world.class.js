class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  world;
  camera_x = 0;
  statusBar = new StatusBar();
  thorwableObjects = [];
  coins = [];
  bottles = [];
 

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.addCoins(8); // Erstelle 5 zufällige Coins (oder beliebige Anzahl)
    this.addBottles(8);// Erstelle 5 zufällige Bottles (oder beliebige Anzahl)
    this.draw();
    this.setWorld();
    this.run();
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

  setWorld() {
    this.character.world = this;
  }

  run(){
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCollisionsWithCoins();
    }, 200);
  }

  checkCollisions(){
    level1.enemies.forEach((enemy) =>{
      if(this.character.isColliding(enemy)){
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }
  checkThrowObjects(){
    if (this.keyboard.F) {
      let bottle = new ThorwableObject(this.character.x + 50, this.character.y + 100)
      this.thorwableObjects.push(bottle);
    }
  }
  checkCollisionsWithCoins(){
    this.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        this.coins.splice(i, 1); // Münze aus dem Array entfernen
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
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
