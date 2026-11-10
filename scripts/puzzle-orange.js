// Desafio de esquiva da sala laranja.

let orange = {
  active: false,
  time: 0,

  // duração maior do desafio
  duration: 1800,

  bullets: [],
  hp: 3
};

function spawnBullet() {

  orange.bullets.push({

    x: Math.random() * mapWidth,

    // nasce um pouco acima da tela
    y: camera.y - 100,

    speed: 4 + Math.random() * 3,

    width: 10,
    height: 40,

    glow: 15
  });

}

function updateOrange() {

  if (!orange.active) return;

  orange.time--;

  // spawn bullets
  if (Math.random() < 0.05) {
    spawnBullet();
  }

  // movimentação
  orange.bullets.forEach(b => {
    b.y += b.speed;
  });

  // colisão
  orange.bullets.forEach(b => {

    let dx = player.x - b.x;
    let dy = player.y - b.y;

    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < player.radius + (b.width / 2)){

      orange.hp--;

      b.y = mapHeight + 100;

      if (orange.hp <= 0) {

        orange.active = false;

        currentScene = "black";

        player.x = 200;
        player.y = 200;

        startDialogue([
          "Você falhou..."
        ]);
      }
    }
  });

  // fuga
  if (isColliding(escapeDoor)) {

  orange.active = false;

  completedPhases.orange = true;

  currentScene = "black";

  player.x = 300;
  player.y = 300;

  startDialogue([
    "Você escapou com sucesso!"
  ]);
}

  // limpa bullets
  orange.bullets = orange.bullets.filter(
    b => b.y < mapHeight + 50
  );

  // vitória
  if (orange.time <= 0) {

    orange.active = false;

    completedPhases.orange = true;

    currentScene = "black";

    player.x = 300;
    player.y = 300;

    startDialogue([
      "Você sobreviveu!"
    ]);
  }
}

function drawOrangePuzzle() {

  if (!orange.active) return;

  // ===== BULLETS =====
  orange.bullets.forEach(b => {

    ctx.save();

    // brilho vermelho
    ctx.shadowColor = "red";
    ctx.shadowBlur = b.glow;

    // corpo da agulha
    ctx.fillStyle = "#e9e9e9";

    ctx.beginPath();

   // topo largo
ctx.moveTo(b.x - b.width / 2, b.y);

// topo direito
ctx.lineTo(b.x + b.width / 2, b.y);

// ponta fina embaixo
ctx.lineTo(b.x, b.y + b.height);

    ctx.closePath();

    ctx.fill();

    // detalhe interno
    ctx.fillStyle = "#ffffff55";

    ctx.beginPath();

    ctx.moveTo(b.x, b.y + 5);
    ctx.lineTo(b.x + 2, b.y + b.height - 8);
    ctx.lineTo(b.x - 2, b.y + b.height - 8);

    ctx.closePath();

    ctx.fill();

    ctx.restore();

  });

 
  // ===== PORTA DE FUGA =====

  ctx.drawImage(
    orangeDoor,
    escapeDoor.x,
    escapeDoor.y,
    escapeDoor.w,
    escapeDoor.h
  );

}

