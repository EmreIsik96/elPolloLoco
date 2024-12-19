class Cloud extends MovableObject
{
    y = 0;
    height = 320;
    width = 580;
    
    /**
   * load Cloud Images.
   */
    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 500;
        this.animate();
    }

    /**
   * the clouds are moved to the left.
   */
    animate()
    {
        this.moveLeft();
    }
}