// Atualização do jogo e início do loop principal.

// Atualiza movimento, interações, câmera e transições.
function update() {
    updatePinkPuzzle();
  if (currentScene === "green" || currentScene === "pink") {
    updatePlatform();
  } else {
    movePlayer();
  }

   if (currentScene === "orange") {
    updateOrange();
  }

  checkDoors();
  checkInteraction();

  if ((canInteract || canEnterDoor) && !dialogueActive) {
    hintAlpha += 0.05;
    hintOffset -= 0.8;
  } else {
    hintAlpha -= 0.05;
    hintOffset += 0.8;
  }

  hintAlpha = Math.max(0, Math.min(1, hintAlpha));
  hintOffset = Math.max(0, Math.min(15, hintOffset));

  // Atualiza a animação com base nas teclas pressionadas.
  if (
    keys["ArrowLeft"] ||
    keys["ArrowRight"] ||
    keys["ArrowUp"] ||
    keys["ArrowDown"]
  ) {
    currentAnimation = "walk";
  } else {
    currentAnimation = "idle";
  }

  let zoom = 1;

if (currentScene === "green") {
  zoom = 0.8;
}

// ===== CÂMERA X =====
camera.x = player.x - (canvas.width / zoom) / 2;

camera.x = Math.max(
  0,
  Math.min(camera.x, mapWidth - (canvas.width / zoom))
);

// ===== CÂMERA Y =====

if (currentScene === "green") {

  // câmera fixa verticalmente
  camera.y = 350;

} else {

  // câmera normal nas outras fases
  camera.y = player.y - (canvas.height / zoom) / 2;

  camera.y = Math.max(
    0,
    Math.min(camera.y, mapHeight - (canvas.height / zoom))
  );
}

  interactTimer++;
  if (interactTimer >= 10) {
    interactTimer = 0;
    interactFrame++;
    if (interactFrame >= totalFrames) interactFrame = 0;
  }

  if (transitioning) {
    if (fadeMode === "out") {
      fadeAlpha += 0.03;

      if (fadeAlpha >= 1) {
        fadeAlpha = 1;

        if (currentMusic) {
          currentMusic.pause();
          currentMusic.currentTime = 0;
        }

       if (transitionTarget) {
  currentScene = transitionTarget;
}

 if (currentDoor) {
  player.x = currentDoor.spawnX;
  player.y = currentDoor.spawnY;
}

        if (music[currentScene]) {
          currentMusic = music[currentScene];
          currentMusic.play();
        }
        
        setTimeout(() => {
      doorCloseSound.currentTime = 0;
      doorCloseSound.play();
    }, 250);

        fadeMode = "in";
      }
    } else if (fadeMode === "in") {
      fadeAlpha -= 0.03;

      if (fadeAlpha <= 0) {
        fadeAlpha = 0;
        transitioning = false;
        fadeMode = "";
        transitionTarget = null;
        currentDoor = null;
        canEnterDoor = false;
      }
    }
  }

  // ===== ANIMAÇÃO PLAYER =====

playerTimer++;

  if (playerTimer >= 8) { // 8 é a velocidade da troca de frame
    playerTimer = 0;
    
    if (currentAnimation === "walk") {
      playerFrame++;
      // Se passar do tamanho do ciclo de caminhada, volta pro zero
      if (playerFrame >= walkCycle.length) {
        playerFrame = 0;
      }
    }
  }

  if (minigameActive) {
  drawMinigame();
}

}


function gameLoop() {

  if (gameStarted && canvas.style.display !== "none") {
      update();
      draw();
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();

