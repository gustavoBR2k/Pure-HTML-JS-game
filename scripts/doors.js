// Interação com portas, transições e dicas de interação.

function checkDoors() {
  if (dialogueActive || transitioning) return;

  canEnterDoor = false;
  currentDoor = null;

  const doorsToCheck = (scenes[currentScene] || []).filter(door => {
    // Na sala preta, impede interação com portas de fases já completas
    if (currentScene === "black") {
      return !completedPhases[door.target];
    }
    // Na sala verde, a porta de saída só pode ser usada se a fase estiver completa
    if (currentScene === "green" && door.target === "black") {
      return completedPhases.green;
    }
    // Restantes portas sempre interagíveis
    
    if (currentScene === "orange" && door.target === "black") {
      return completedPhases.orange;
    }
    
    if (currentScene === "pink" && door.target === "black") {
      return completedPhases.pink;
    }

    return true;
  });
  
  doorsToCheck.forEach(door => {
    if (isColliding(door)) {
      canEnterDoor = true;
      currentDoor = door;
    }
  });
  
 //verifica se as portas estão completas para aparecer a porta final
  if (currentScene === "black" && 
      completedPhases.green && 
      completedPhases.pink && 
      completedPhases.orange) {
    
    if (isColliding(finalDoor)) {
      canEnterDoor = true;
      currentDoor = finalDoor;
    }
  }
}

// Inicia a transição para a porta selecionada.
function startTransition(targetScene) {
  doorOpenSound.currentTime = 0;
  doorOpenSound.play();

  if (targetScene === "credits") {
    // Cancela qualquer transição ativa
    transitioning = false;
    fadeMode = "";
    fadeAlpha = 0;
    transitionTarget = null;
    
    // Mostra os créditos imediatamente
    showGameCredits();
    return;
  }
  
  // As outras portas usam a transição com fade.
  transitioning = true;
  fadeMode = "out";
  fadeAlpha = 0;
  transitionTarget = targetScene;

  hintAlpha = 0;
  canEnterDoor = false;
  canInteract = false;
}

// Verifica se o jogador está perto de um objeto ou gerador.
function checkInteraction() {
  canInteract = false;
  currentText = [];

  // Verifica interações com NPCs (apenas se não estiver em minigame)
  if (!minigameActive) {
    interactions[currentScene]?.forEach(obj => {
      if (isColliding(obj)) {
        canInteract = true;
        currentText = obj.text;
      }
    });
  }

  // Verifica interações com geradores - APENAS na sala verde
  if (currentScene === "green" && !minigameActive) {
    generators.forEach(gen => {
      if (gen.active && !gen.completed && isColliding(gen)) {
        canInteract = true;
        currentGenerator = gen;
      }
    });
  }
}

// Mostra a dica de interação perto do jogador.
function drawInteractionHint () {
  if (transitioning) return;
  if (hintAlpha <= 0) return;

  let msg = "...";

  if (canEnterDoor) msg = "Entrar [E]";
  else if (canInteract) msg = "Interagir [E]";

  ctx.save();

  ctx.globalAlpha = hintAlpha;
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(
  msg,
  player.x - camera.x,
  player.y - camera.y - 35 + hintOffset
);

  ctx.restore();
}

