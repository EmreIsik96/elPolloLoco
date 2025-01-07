/**
 * Represents a game level, containing all the game objects.
 */
class Level {
  chicken;
  smallChicken;
  endboss;
  clouds;
  backgroundObjects;
  coins;
  bottles;
  level_end_x = 720*5;
  
   /**
     * Creates a new Level object.
     * @param {Chicken[]} chicken - Array of Chicken objects.
     * @param {SmallChicken[]} smallChicken - Array of SmallChicken objects.
     * @param {Endboss[]} endboss - Array of Endboss objects.
     * @param {Cloud[]} clouds - Array of Cloud objects.
     * @param {BackgroundObject[]} backgroundObjects - Array of BackgroundObject objects.
     * @param {Coins[]} coin - Array of Coins objects.
     * @param {Bottle[]} bottle - Array of Bottle objects.
     */
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
