let soundCollection = new SoundCollection();
let charIsDead = false;
let bossIsDead = false;

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

function fullscreen() {
  let fullscreen = document.getElementById("canvas");
  enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

function closeFullscreen() {
  document.getElementById("fullscreenImgID").style.display = "block";
  document.getElementById("shrinkImgID").style.display = "none";
  exitFullscreen();
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  document.getElementById("canvas").style.width = "";
}

function instructions() {
  document.getElementById("start-image").style.display = "none";
  document.getElementById("instructionsID").style.display = "block";
  document.getElementById("instructionButtonID").style.display = "none";
  document.getElementById("startButtonID").style.display = "none";
  document.getElementById("imprintButtonID").style.display = "none";
  document.getElementById("backButtonFromIstructionsID").style.display =
    "block";
}

function backFromInstructions() {
  document.getElementById("start-image").style.display = "block";
  document.getElementById("instructionsID").style.display = "none";
  document.getElementById("instructionButtonID").style.display = "block";
  document.getElementById("startButtonID").style.display = "block";
  document.getElementById("imprintButtonID").style.display = "block";
  document.getElementById("backButtonFromIstructionsID").style.display = "none";
}

function imprint() {
  document.getElementById("start-image").style.display = "none";
  document.getElementById("imprintID").style.display = "block";
  document.getElementById("instructionButtonID").style.display = "none";
  document.getElementById("startButtonID").style.display = "none";
  document.getElementById("imprintButtonID").style.display = "none";
  document.getElementById("backButtonFromImprintID").style.display = "block";
}

function backFromImprint() {
  document.getElementById("start-image").style.display = "block";
  document.getElementById("imprintID").style.display = "none";
  document.getElementById("instructionButtonID").style.display = "block";
  document.getElementById("startButtonID").style.display = "block";
  document.getElementById("imprintButtonID").style.display = "block";
  document.getElementById("backButtonFromIstructionsID").style.display = "none";
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

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
