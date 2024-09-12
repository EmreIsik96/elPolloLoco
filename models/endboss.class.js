class Endboss extends MovableObject {
  height = 350;
  width = 250;
  y = 105;
  hitCount = 0;
  maxHits = 3; // Anzahl der Treffer, bis der Gegner stirbt
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  offset = {
    top: 120,
    bottom: 30,
    right: 40,
    left: 40,
  };

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.speed = 1;
    this.x = 720 * 5.5;
    this.isDead = false;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        this.playAnimate(this.IMAGES_WALKING);
      }
    }, 200);
  }

  hitEnemy() {
    if (this.isDead) return; // Wenn der Boss bereits tot ist, nicht reagieren
    this.playAnimate(this.IMAGES_HURT); // Zeige die Verletzungsanimation
    this.hitCount++;

    if (this.hitCount >= this.maxHits) {
      this.dieEnemy();
    }
  }

  dieEnemy() {
    this.speed = 0;
    this.isDead = true;
    let currentImageIndex = 0;

      let interval = setInterval(() => { // erstelle eine Variable, um den Interval später abzurufen und abzubrechen
        this.loadImage(this.IMAGES_DEAD[currentImageIndex]); // Es wird immer 1 Bild nacheinander abgerufen, da bei jedem durchlauf CurrentImageIndex um 1 erhöht wird.  
        currentImageIndex++; // CurrentImage wird mit jeden durchgang um 1 erhöht.
        
        // Stoppen der Animation, wenn alle Bilder durch sind
        if (currentImageIndex >= this.IMAGES_DEAD.length) { // vergleichen von CurrentImageIndex und Array.length bis der currentImageIndex die length des Arrays erreicht
          clearInterval(interval); // Animation stoppen
        }
      }, 200); // Zeitintervall zwischen den Bildern
  }
}
