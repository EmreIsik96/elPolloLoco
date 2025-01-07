let canvas;
let world;

/**
 * Initializes the game by setting up the "canvas", creating a "keyboard" input handler, 
 * and initializing the game world.
 * 
 * This function retrieves the "canvas" element, instantiates a new "Keyboard" object 
 * for handling user input, and creates a "World" object that represents the game environment. 
 * Additionally, it sets the "lastPressedKey" property of the keyboard to the current timestamp.
 */
function init() {
  canvas = document.getElementById("canvas");
  let keyboard = new Keyboard();
  world = new World(canvas, keyboard);
  keyboard.lastPressedKey = new Date().getTime();
}
