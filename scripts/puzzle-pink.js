// Puzzle de memória da sala rosa.

// ===== PUZZLE ROSA =====

let pinkPuzzle = {
  active: false,

  symbols: ["▲", "●", "■", "✦"],

  sequence: [],
  playerSequence: [],

  showingSequence: false,
  showTimer: 0,

  round: 1,
  maxRounds: 1, // Rodadas necessárias para concluir.

  symbolDuration: 60
};

// teclas dos símbolos
const symbolKeys = {
  "1": "▲",
  "2": "●",
  "3": "■",
  "4": "✦"
};

// Inicia o desafio.
function startPinkPuzzle() {

  pinkPuzzle.active = true;

  pinkPuzzle.round = 1;

  nextPinkRound();
}

// Prepara a próxima rodada.
function nextPinkRound() {

  pinkPuzzle.playerSequence = [];

  pinkPuzzle.sequence = [];

  for (let i = 0; i < pinkPuzzle.round + 2; i++) {

    const randomSymbol =
      pinkPuzzle.symbols[
        Math.floor(Math.random() * pinkPuzzle.symbols.length)
      ];

    pinkPuzzle.sequence.push(randomSymbol);
  }

  pinkPuzzle.showingSequence = true;

  pinkPuzzle.showTimer = 0;

  // aumenta dificuldade
  pinkPuzzle.symbolDuration =
    Math.max(20, 60 - (pinkPuzzle.round * 5));
}

// Atualiza a exibição da sequência.
function updatePinkPuzzle() {

  if (!pinkPuzzle.active) return;
  

  // mostrando sequência
  if (pinkPuzzle.showingSequence) {

    pinkPuzzle.showTimer++;

    if (
      pinkPuzzle.showTimer >=
      pinkPuzzle.sequence.length *
      pinkPuzzle.symbolDuration
    ) {

      pinkPuzzle.showingSequence = false;
      updatePinkPuzzle();
    }
  }
}

// Desenha o desafio no canvas.
function drawPinkPuzzle() {

  if (!pinkPuzzle.active) return;

  // fundo escuro
  ctx.fillStyle = "rgba(0,0,0,0.75)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = "center";

  // rodada
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";

  ctx.fillText(
    "Rodada " + pinkPuzzle.round,
    canvas.width / 2,
    80
  );

  // teclas
  ctx.font = "24px Arial";

  ctx.fillText(
    "1 = ▲   2 = ●   3 = ■   4 = ✦",
    canvas.width / 2,
    130
  );

  // mostrando sequência
  if (pinkPuzzle.showingSequence) {

    const index =
      Math.floor(
        pinkPuzzle.showTimer /
        pinkPuzzle.symbolDuration
      );

    if (index < pinkPuzzle.sequence.length) {

      const symbol =
        pinkPuzzle.sequence[index];

      ctx.font = "120px Arial";

      ctx.fillStyle = "#ff74b7";

      ctx.fillText(
        symbol,
        canvas.width / 2,
        canvas.height / 2
      );
    }

  } else {

    ctx.font = "28px Arial";

    ctx.fillStyle = "#ffffff";

    ctx.fillText(
      "Repita a sequência",
      canvas.width / 2,
      canvas.height / 2 - 80
    );

    ctx.fillText(
      pinkPuzzle.playerSequence.join(" "),
      canvas.width / 2,
      canvas.height / 2
    );
  }
}

// Valida a tecla digitada.
function handlePinkInput(key) {

  if (!pinkPuzzle.active) return;

  if (pinkPuzzle.showingSequence) return;

  const symbol = symbolKeys[key];

  if (!symbol) return;

  pinkPuzzle.playerSequence.push(symbol);

  const current =
    pinkPuzzle.playerSequence.length - 1;

  // erro
  if (
    symbol !== pinkPuzzle.sequence[current]
  ) {

    pinkPuzzle.active = false;

    startDialogue([
      "Sequência incorreta...",
      "Sua memória falhou."
    ]);

    return;
  }

  // sequência completa
  if (
    pinkPuzzle.playerSequence.length ===
    pinkPuzzle.sequence.length
  ) {

    // venceu tudo
    if (
      pinkPuzzle.round >=
      pinkPuzzle.maxRounds
    ) {

      pinkPuzzle.active = false;

      completedPhases.pink = true;

// faz a porta aparecer perto do jogador
scenes.pink[0].x = 450;
scenes.pink[0].y = 700;

startDialogue([
  "Memória validada.",
  "A porta rosa reconheceu você.",
  "A saída apareceu."
      ]);

      return;
    }

    // próxima rodada
    pinkPuzzle.round++;

    setTimeout(() => {

      nextPinkRound();

    }, 1000);
  }
}
