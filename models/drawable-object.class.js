class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;

  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById('image') // Erstellt ein neues HTMLImageElement (Bild-Objekt)
    this.img.src = path; // <img id="image" src> // // Weist dem Bild den Pfad zur Bilddatei zu
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let images = new Image();  // Erstellt für jedes Bild im Array ein neues Bildobjekt
      images.src = path;  // Weist jedem Bildobjekt den jeweiligen Pfad zu
      this.imageCache[path] = images; // Speichert das Bild im 'imageCache'-Objekt unter dem Pfad als Schlüssel
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
