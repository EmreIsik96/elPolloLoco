class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  level_end_x = 720*5;
  

  constructor(enemies, clouds, backgroundObjects, coin) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coin;
  }
}
