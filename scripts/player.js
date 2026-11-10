// Movimento, colisões e limites do jogador.

// Move o jogador no mapa principal.
function movePlayer() {
  if (dialogueActive) return;

  // Atualiza a posição e a direção.
  if (keys["ArrowUp"]) {
    player.y -= player.speed;
    currentDirection = "up";
  }
  if (keys["ArrowDown"]) {
    player.y += player.speed;
    currentDirection = "down";
  }
  if (keys["ArrowLeft"]) {
    player.x -= player.speed;
    currentDirection = "left";
  }
  if (keys["ArrowRight"]) {
    player.x += player.speed;
    currentDirection = "right";
  }

  // Limites do mapa
  player.x = Math.max(player.radius, Math.min(mapWidth - player.radius, player.x));
  player.y = Math.max(player.radius, Math.min(mapHeight - player.radius, player.y));
}

function updatePlatform() {

   let upperLimit;
  let lowerLimit;

  if (currentScene === "green") {
    upperLimit = 700;
    lowerLimit = 900;
  }

  if (currentScene === "pink") {
    upperLimit = 700;
    lowerLimit = 850;
  }

  if (keys["ArrowLeft"]) {
    player.x -= 4;
    currentDirection = "left";
  }
  if (keys["ArrowRight"]) {
    player.x += 4;
    currentDirection = "right";
  }
  if (keys["ArrowUp"] && player.y > upperLimit) {
    player.y -= 4;
    currentDirection = "up";
  }
  if (keys["ArrowDown"] && player.y < lowerLimit) {
    player.y += 4;
    currentDirection = "down";
  }

  player.x = Math.max(
    player.radius,
    Math.min(mapWidth - player.radius, player.x)
  );
}

// Verifica se o jogador está dentro de um retângulo.
function isColliding(rect) {
  return (
    player.x > rect.x &&
    player.x < rect.x + rect.w &&
    player.y > rect.y &&
    player.y < rect.y + rect.h
  );
}



