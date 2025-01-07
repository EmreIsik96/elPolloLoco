/**
 * Represents a drawable object that can be displayed on a canvas.
 */
class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;

  /**
   * Loads a single image from the specified path.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById('image') // Erstellt ein neues HTMLImageElement (Bild-Objekt)
    this.img.src = path; // <img id="image" src> // // Weist dem Bild den Pfad zur Bilddatei zu
  }

  /**
   * Loads multiple images from an array of paths and caches them.
   * @param {string[]} arr - An array of image file paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let images = new Image();
      images.src = path;
      this.imageCache[path] = images;
    });
  }

  /**
   * Draws the current image on the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
