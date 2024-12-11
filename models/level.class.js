class Level {
  chicken;
  smallChicken;
  endboss;
  clouds;
  backgroundObjects;
  coins;
  bottles;
  level_end_x = 720*5;
  

  constructor(chicken, smallChicken, endboss, clouds, backgroundObjects, coin, bottle) {
    this.chicken = chicken;
    this.smallChicken = smallChicken;
    this.endboss = endboss;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coin;
    this.bottles = bottle;
  }
}
