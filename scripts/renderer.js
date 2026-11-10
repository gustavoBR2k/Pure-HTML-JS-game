// Desenho do jogador, cenas, quebra-cabeças e HUD.

function drawPlayer() {
    // Evita erro se a imagem não tiver carregado ainda
  if (!playerSheet.complete) return;

  let frameX = 0; // Coluna (Eixo X na imagem)
  let frameY = directions[currentDirection]; // Linha (Eixo Y na imagem)

  if (currentAnimation === "idle") {
    // Na spritesheet, a coluna do meio (índice 1) é o personagem parado
    frameX = 1; 
  } else if (currentAnimation === "walk") {
    // Pega o frame atual do ciclo de caminhada (0, 1, 2 ou 1)
    frameX = walkCycle[playerFrame];
  }

  // Multiplica pela largura/altura exata (32px) para achar o recorte
  const sourceX = frameX * catFrameWidth;
  const sourceY = frameY * catFrameHeight;

  ctx.drawImage(
    playerSheet,
    sourceX,                      // Eixo X do recorte
    sourceY,                      // Eixo Y do recorte
    catFrameWidth,                // Largura do recorte (32)
    catFrameHeight,               // Altura do recorte (32)
    player.x - catFrameWidth / 2,
    player.y - catFrameHeight / 2,   // Posição Y na tela (centralizando)
    catFrameWidth * 2,            // Tamanho final na tela (Largura)
    catFrameHeight * 2            // Tamanho final na tela (Altura)
  );
}

function drawDoors() {
  const doorsToDraw = (scenes[currentScene] || []).filter(door => {
    // Na sala preta, não desenhar portas que já foram completadas
    if (currentScene === "black") {
      return !completedPhases[door.target];   // ignora se a fase alvo já foi feita
    }
    // Na sala verde, a porta de saída só aparece se a fase estiver completa
    if (currentScene === "green" && door.target === "black") {
      return completedPhases.green;
    }
    
    if (currentScene === "pink" && door.target === "black") {
  return completedPhases.pink;
}
if (currentScene === "orange" && door.target === "black") {
  return completedPhases.orange;
}
   
    return true;
  });

  doorsToDraw.forEach(door => {
    if (door.image) {
      ctx.drawImage(door.image, door.x, door.y, door.w, door.h);
    }
  });
    // Desenha a porta dourada se todas as fases estiverem completas
  if (currentScene === "black" && 
      completedPhases.green && 
      completedPhases.pink && 
      completedPhases.orange) {
    ctx.drawImage(goldenDoor, finalDoor.x, finalDoor.y, finalDoor.w, finalDoor.h);
  }
}

function drawInteractions() {
  interactions[currentScene]?.forEach(obj => {

    if (foxSpriteLoaded) {

      ctx.drawImage(
        foxSprite,

        interactFrame * frameWidth, // X dentro da sprite
        0,                          // Y
        frameWidth,
        frameHeight,

        obj.x,
        obj.y,
        96,
        96
      );

    } else {
      // fallback caso imagem não carregue
      ctx.fillStyle = "red";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    }

  });
    
}


// Desenha cenário, personagens e interface.
function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ===== CÂMERA =====
  ctx.save();

  let zoom = 1;

  if (currentScene === "green") {
    zoom = 0.9;
  }

  ctx.scale(zoom, zoom);

  ctx.translate(
    -camera.x,
    -camera.y
  );

  // ===== FUNDO =====
  if (currentScene === "green" && greenBackgroundLoaded) {

    ctx.drawImage(
      greenRoomBackground,
      0,
      0,
      mapWidth,
      mapHeight
    );

  } else if (currentScene === "pink" && pinkBackgroundLoaded) {

    ctx.drawImage(
      pinkRoomBackground,
      0,
      0,
      mapWidth,
      mapHeight
    );

  } else if (currentScene === "orange" && orangeBackgroundLoaded) {

    ctx.drawImage(
      orangeRoomBackground,
      0,
      0,
      mapWidth,
      mapHeight
    );

  } else {

    if (currentScene === "black") {
      ctx.fillStyle = "#000"; // Lobby com fundo preto sólido.
    }
    else if (currentScene === "green") {
      ctx.fillStyle = "green";
    }
    else if (currentScene === "pink") {
      ctx.fillStyle = "pink";
    }
    else if (currentScene === "orange") {
      ctx.fillStyle = "orange";
    }

    ctx.fillRect(
      0,
      0,
      mapWidth,
      mapHeight
    );
  }

  // ===== DESENHOS =====
  drawDoors();
  drawInteractions();
  drawGenerators();
  drawPlayer();

  if (currentScene === "orange") {
    drawOrangePuzzle();
  }

  // ===== FINALIZA CÂMERA =====
  ctx.restore();
// ===== HUD ORANGE =====
if (currentScene === "orange" && orange.active) {

  ctx.fillStyle = "white";
  ctx.font = "28px Arial";
  ctx.textAlign = "left";

  // VIDA
  ctx.fillText(
    "HP: " + orange.hp,
    20,
    40
  );

  // TEMPO
  ctx.fillText(
    "Tempo: " + Math.ceil(orange.time / 60),
    20,
    80
  );
}
  // ===== FADE =====
  if (fadeAlpha > 0) {

    ctx.fillStyle = "rgba(0,0,0," + fadeAlpha + ")";
    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  // ===== UI =====
  drawInteractionHint();
  drawPinkPuzzle();
}

