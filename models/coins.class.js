class Coins extends DrawableObject{
    x = 100;
    y = 300;
    height = 160;
    width = 160;
    offset = {
        top: 120,
        bottom: 30,
        right: 40,
        left: 40,
    }
    constructor()
    {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 720 * 4; // Zufällige X-Koordinate
        this.y = 120 + Math.random() * 50;     // Zufällige Y-Koordinate
    }
}