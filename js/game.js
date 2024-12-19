let canvas;
let world;

/**
 * Canvas, Keyboard and World are initialized here .
 */
function init() {
  canvas = document.getElementById("canvas");
  let keyboard = new Keyboard();
  world = new World(canvas, keyboard);
  keyboard.lastPressedKey = new Date().getTime();
}
