let soundCollection = new SoundCollection();
let charIsDead = false;
let bossIsDead = false;

/**
 * Here the start is triggered, levels, enemies and all objects are executed and placed with the start .
 */
function startGame() {
  charIsDead = false;
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  soundCollection.sounds.startGameAudio.play();
  setTimeout(() => {
    initLevel();
    init();
    document.getElementById("muteButtonID").style.display = "block";
    document.getElementById("fullscreenImgID").style.display = "block";
  }, 500);
}

/**
 * full screen is opened.
 */
function fullscreen() {
  let fullscreen = document.getElementById("canvas");
  enterFullscreen(fullscreen);
}

/**
 * full screen is opened.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * close the fullscreen.
 */
function closeFullscreen() {
  document.getElementById("fullscreenImgID").style.display = "block";
  document.getElementById("shrinkImgID").style.display = "none";
  exitFullscreen();
}

/**
 * close the fullscreen.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  document.getElementById("canvas").style.width = "";
}

/**
 * the instructions are hereby displayed.
 */
function instructions() {
  document.getElementById("start-image").style.display = "none";
  document.getElementById("instructionsID").style.display = "block";
  document.getElementById("instructionButtonID").style.display = "none";
  document.getElementById("startButtonID").style.display = "none";
  document.getElementById("imprintButtonID").style.display = "none";
  document.getElementById("backButtonFromIstructionsID").style.display =
    "block";
}

/**
 * the instructions are hereby closed.
 */
function backFromInstructions() {
  document.getElementById("start-image").style.display = "block";
  document.getElementById("instructionsID").style.display = "none";
  document.getElementById("instructionButtonID").style.display = "block";
  document.getElementById("startButtonID").style.display = "block";
  document.getElementById("imprintButtonID").style.display = "block";
  document.getElementById("backButtonFromIstructionsID").style.display = "none";
}

/**
 * the imprint is hereby displayed.
 */
function imprint() {
  document.getElementById("start-image").style.display = "none";
  document.getElementById("imprintID").style.display = "block";
  document.getElementById("instructionButtonID").style.display = "none";
  document.getElementById("startButtonID").style.display = "none";
  document.getElementById("imprintButtonID").style.display = "none";
  document.getElementById("backButtonFromImprintID").style.display = "block";
}

/**
 * the imprint is hereby closed.
 */
function backFromImprint() {
  document.getElementById("start-image").style.display = "block";
  document.getElementById("imprintID").style.display = "none";
  document.getElementById("instructionButtonID").style.display = "block";
  document.getElementById("startButtonID").style.display = "block";
  document.getElementById("imprintButtonID").style.display = "block";
  document.getElementById("backButtonFromIstructionsID").style.display = "none";
}

/**
 * This will clear all current intervals.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * here the game over is displayed.
 */
function gameOver() {
  clearAllIntervals();
  charIsDead = true;
  if (!world.isMuted) {
    soundCollection.sounds.gameOverAudio.play();
    soundCollection.sounds.startGameAudio.pause();
  }
  document.getElementById("game-container").style.display = "none";
  document.getElementById("gameOver-screen").style.display = "block";
}

/**
 * here the win game is displayed.
 */
function winGame() {
  clearAllIntervals();
  bossIsDead = true;
  if (!world.isMuted) {
    soundCollection.sounds.gameOverAudio.play();
    soundCollection.sounds.startGameAudio.pause();
  }
  document.getElementById("winScreen").style.display = "block";
  document.getElementById("game-container").style.display = "none";
}

/**
 * this will restart the game.
 */
function restartGame() {
  let isMuted = world.isMuted;
  charIsDead = false;
  document.getElementById("gameOver-screen").style.display = "none";
  document.getElementById("winScreen").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  soundCollection.sounds.startGameAudio.currentTime = 0;
  if (!world.isMuted) {
    soundCollection.sounds.startGameAudio.play();
  }
  initLevel();
  init();
  world.isMuted = isMuted;
}

/**
 * here the audio is muted.
 */
function muteSound() {
  world.isMuted = !world.isMuted;
  if (!world.isMuted) {
    soundCollection.sounds.startGameAudio.play();
  } else {
    soundCollection.sounds.startGameAudio.pause();
  }
  document.getElementById("sound").classList.toggle("d-none");
  document.getElementById("mute").classList.toggle("d-none");
}
