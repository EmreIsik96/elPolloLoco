let soundCollection = new SoundCollection();
let charIsDead = false;
let bossIsDead = false;

/**
 * Starts the game by:
 *  - Resetting the character death flag.
 *  - Hiding the start screen.
 *  - Showing the game container.
 *  - Hiding the mobile start button (if applicable).
 *  - Playing the start game audio.
 *  - After a short delay (500ms), initializes the level and the game itself.
 *  - Shows the mute and fullscreen buttons.
 */
function startGame() {
  charIsDead = false;
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  document.getElementById("startButtonMobileID").style.display = "none";
  soundCollection.sounds.startGameAudio.play();
  setTimeout(() => {
    initLevel();
    init();
    document.getElementById("muteButtonID").style.display = "block";
    document.getElementById("fullscreenImgID").style.display = "block";
  }, 500);
}

/**
 * Attempts to enter fullscreen mode for the game canvas element.
 */
function fullscreen() {
  let fullscreen = document.getElementById("canvas");
  enterFullscreen(fullscreen);
}

/**
 * Helper function for fullscreen(). Checks for different browser implementations of the fullscreen request API.
 * @param {HTMLElement} element The element to make fullscreen.
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
 * Exits fullscreen mode and hides the fullscreen image, showing the shrink image instead.
 */
function closeFullscreen() {
  document.getElementById("fullscreenImgID").style.display = "block";
  document.getElementById("shrinkImgID").style.display = "none";
  exitFullscreen();
}

/**
 * Helper function for closeFullscreen(). Checks for different browser implementations of the fullscreen exit API.
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
 * Shows the game instructions screen and hides the start screen elements.
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
 * Hides the instructions screen and shows the start screen elements again.
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
 * Shows the game imprint screen and hides the start screen elements.
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
 * Hides the imprint screen and shows the start screen elements again.
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
 * Clears all setInterval timers used in the game loop.
 * This is crucial to prevent unexpected behavior after game over or win scenarios.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Handles the game over scenario:
 *  - Clears all intervals to stop the game loop.
 *  - Sets the `charIsDead` flag to true.
 *  - Plays the game over audio and pauses the start game audio (if not muted).
 *  - Hides the game container.
 *  - Shows the game over screen.
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
 * Handles the win scenario:
 *  - Clears all intervals to stop the game loop.
 *  - Sets the `bossIsDead` flag to true.
 *  - Plays the win game audio and pauses the start game audio (if not muted).
 *  - Shows the win screen.
 *  - Hides the game container.
 */
function winGame() {
  clearAllIntervals();
  bossIsDead = true;
  if (!world.isMuted) {
    soundCollection.sounds.winGame.play();
    soundCollection.sounds.startGameAudio.pause();
  }
  document.getElementById("winScreen").style.display = "block";
  document.getElementById("game-container").style.display = "none";
}

/**
 * Restarts the game after a win or loss:
 *  - Preserves the current mute state.
 *  - Resets the character death flag.
 *  - Hides the game over/win screens.
 *  - Shows the game container.
 *  - Resets the start game audio playback time.
 *  - Plays the start game audio (if not muted).
 *  - Re-initializes the level and the game.
 * @param {boolean} isMuted - The mute state to restore.
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
 * Returns the player to the home/start screen after a win or loss:
 *  - Hides the game over/win screens.
 *  - Hides the game container.
 *  - Shows the start screen.
 *  - Shows the mobile start button.
 */
function backToHome() {
  document.getElementById("gameOver-screen").style.display = "none";
  document.getElementById("winScreen").style.display = "none";
  document.getElementById("game-container").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
  document.getElementById("startButtonMobileID").style.display = "block";
}

/**
 * Toggles the mute state of the game:
 *  - Inverts the `world.isMuted` flag.
 *  - Plays or pauses the start game audio based on the new mute state.
 *  - Toggles the visibility of the mute/unmute icons.
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
  document.getElementById("unmuteButtonID").style.display = "block";
  document.getElementById("muteButtonID").style.display = "none";
}

/**
 * Unmutes the game:
 *  - Inverts the `world.isMuted` flag.
 *  - Plays the start game audio if it was muted.
 *  - Updates the mute/unmute button visibility.
 */
function unmuteSound() {
  world.isMuted = !world.isMuted;
  if (!world.isMuted) {
    soundCollection.sounds.startGameAudio.play();
  } else {
    soundCollection.sounds.startGameAudio.pause();
  }
  document.getElementById("unmuteButtonID").style.display = "none";
  document.getElementById("muteButtonID").style.display = "block";
}
