class Bottles extends MovableObject{
    x = 100;
    y = 230;
    height = 60;
    width = 60;
    IMAGES_BOTTLE_ON_THE_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]    
    
    constructor(){
        super().loadImages(this.IMAGES_BOTTLE_ON_THE_GROUND);
        this.x = 200 + Math.random() * 720 * 5; // Zufällige X-Koordinate
        this.y = 360 + Math.random();     // Zufällige Y-Koordinate

        let randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLE_ON_THE_GROUND.length); // 
        this.img = this.imageCache[this.IMAGES_BOTTLE_ON_THE_GROUND[randomIndex]]; // switch between 2 Images 
    }
}