// Uma lista única mantém os dois créditos iguais.
const projectMembers = [
  "Gustavo Rissato",
  "Ruan Ortega",
  "Vinicius Guazza"
];

// Monta os créditos do menu ou da tela final.
function renderCredits(completed = false) {
  const menuBox = document.getElementById("menuBox");
  const namesMarkup = projectMembers
    .map(name => "<li>" + name + "</li>")
    .join("");

  const title = completed ? "PARABÉNS!" : "CRÉDITOS";
  const message = completed
    ? '<p class="pixel-credits__lead">Você completou todos os desafios!</p>'
    : "";
  const buttonLabel = completed ? "Jogar novamente" : "Voltar";

  menuBox.className = "pixel-credits";
  menuBox.innerHTML = [
    '<section class="pixel-credits__content">',
    '<p class="pixel-credits__tag">THE DOORS</p>',
    '<h1 class="pixel-credits__title">' + title + '</h1>',
    message,
    '<div class="pixel-credits__divider" aria-hidden="true"></div>',
    '<h2 class="pixel-credits__heading">INTEGRANTES DO PROJETO</h2>',
    '<ul class="pixel-credits__names">' + namesMarkup + '</ul>',
    '<button type="button" class="pixel-credits__button" onclick="location.reload()">'
      + buttonLabel
      + '</button>',
    '</section>'
  ].join("");
}

function showGameCredits() {
  if (currentMusic) {
    currentMusic.pause();
    currentMusic.currentTime = 0;
  }

  document.getElementById("menu").style.display = "block";
  gameStarted = false;
  transitioning = false;
  canvas.style.display = "none";

  const uiElements = ["minigameUI", "dialogueBox", "challengeBox", "temporaryMessage"];
  uiElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.style.display = "none";
  });

  renderCredits(true);
}

// Abre o formulário antes de iniciar a partida.
function showNameForm() {
  document.getElementById("mainMenu").style.display = "none";

  const form = document.getElementById("playerNameForm");
  form.hidden = false;
  document.getElementById("playerName").focus();
}

function showMainMenu() {
  const form = document.getElementById("playerNameForm");
  form.reset();
  form.hidden = true;
  document.getElementById("playerNameError").hidden = true;
  document.getElementById("mainMenu").style.display = "block";
}

// Inicia o jogo e usa o nome no primeiro diálogo.
function startGame(name) {
  const cleanName = name.trim();
  if (!cleanName) return;

  document.getElementById("menu").style.display = "none";
  gameStarted = true;

  currentMusic = music[currentScene];
  if (currentMusic) {
    currentMusic.play();
  }

  startDialogue(["Olá, " + cleanName + "!"]);
}

function showCredits() {
  renderCredits(false);
}

document.getElementById("playButton").addEventListener("click", showNameForm);
document.getElementById("creditsButton").addEventListener("click", showCredits);
document.getElementById("cancelNameForm").addEventListener("click", showMainMenu);

const playerNameForm = document.getElementById("playerNameForm");
const playerNameInput = document.getElementById("playerName");
const playerNameError = document.getElementById("playerNameError");

playerNameInput.addEventListener("input", () => {
  playerNameError.hidden = true;
});

playerNameForm.addEventListener("submit", event => {
  event.preventDefault();

  const cleanName = playerNameInput.value.trim();
  if (!cleanName) {
    playerNameError.textContent = "Digite um nome para continuar.";
    playerNameError.hidden = false;
    playerNameInput.focus();
    return;
  }

  playerNameError.hidden = true;
  startGame(cleanName);
});
