let canvas;
let world;


function init() {
  canvas = document.getElementById("canvas"); 
  let keyboard = new Keyboard();
  world = new World(canvas, keyboard);
}