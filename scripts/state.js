// Estado global e recursos compartilhados pelo jogo.

let gameStarted = false;

const mapWidth = 1920;
const mapHeight = 1080;

// Posição da câmera no mapa.
let camera = {
  x: 0,
  y: 0
};

let pendingChallenge = null;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Sistema de geradores
let generators = [];
let completedGenerators = 0;
const totalGenerators = 5;

// Variáveis do minigame
let minigameActive = false;
let currentGenerator = null;

// Minigame - Barra de progresso
let skillCheckActive = false;
let skillCheckAngle = 0; // Ângulo atual da bolinha
let skillCheckSpeed = 1; // Velocidade da bolinha
let skillCheckDirection = 1; // Direção (1 = horário, -1 = anti-horário)
let successZone = { start: 0, end: 0 }; // Zona de sucesso (em radianos)
let skillCheckProgress = 0; // Progresso do gerador (0 a 100)
const skillCheckRounds = 3; // Quantos skill checks para completar
let currentSkillChecks = 0;

const playerSheet = new Image();
playerSheet.src = "sprites/player-sheet.png";

// A spritesheet reúne quadros de movimento em quatro direções.
const catFrameWidth = 32;
const catFrameHeight = 32;

const directions = {
  down: 0,  // Linha 0: olhando pra baixo
  left: 1,  // Linha 1: olhando pra esquerda
  right: 2, // Linha 2: olhando pra direita
  up: 3     // Linha 3: olhando pra cima
};

let currentDirection = "down";

const walkCycle = [0, 1, 2, 1];

let currentAnimation = "idle";

let playerFrame = 0;
let playerTimer = 0;

const greenDoor = new Image();
greenDoor.src = "sprites/green-door.png";

const pinkDoor = new Image();
pinkDoor.src = "sprites/pink-door.png";

const orangeDoor = new Image();
orangeDoor.src = "sprites/orange-door.png";

const goldenDoor = new Image();
goldenDoor.src = "sprites/golden-door.png"; 


// Fundos usados nas salas coloridas.
const greenRoomBackground = new Image();
greenRoomBackground.src = "sprites/green-room-background.png";

const pinkRoomBackground = new Image();
pinkRoomBackground.src = "sprites/pink-room-background.png";

const orangeRoomBackground = new Image();
orangeRoomBackground.src = "sprites/orange-room-background.png";

const foxSprite = new Image();
foxSprite.src = "sprites/fox-idle.png";

let foxSpriteLoaded = false;
foxSprite.onload = () => {
  foxSpriteLoaded = true;
}


let transitionTarget = null;

let canEnterDoor = false;
let currentDoor = null;

let transitioning = false;
let fadeAlpha = 0;
let fadeMode = "";

const doorOpenSound = new Audio("audio/door-open.mp3");
const doorCloseSound = new Audio("audio/door-close.mp3");

doorOpenSound.volume = 0.3;
doorCloseSound.volume = 0.3;



let orangeBackgroundLoaded = false;
orangeRoomBackground.onload = () => {
  orangeBackgroundLoaded = true;
};

let greenBackgroundLoaded = false;
greenRoomBackground.onload = () => {
  greenBackgroundLoaded = true;
};

let pinkBackgroundLoaded = false;
pinkRoomBackground.onload = () => {
  pinkBackgroundLoaded = true;
};

let interactFrame = 0;
let interactTimer = 0;

const frameWidth = 32;
const frameHeight = 35;
const totalFrames = 4;

canvas.width = 960;
canvas.height = 540;

// Animação da dica de interação.
let hintAlpha = 0;  //transparencia
let hintOffset = 15; //distancia vertical

// jogador
let player = {
  x: 100,
  y: 100,
  radius: 15,
  speed: 4
};

// cena atual
let currentScene = "black";

// Progresso das fases (portas)
let completedPhases = {
  green: false,
  pink: false,
  orange: false
};

// Estado dos diálogos.
let dialogueActive = false;
let dialogueIndex = 0;
let currentDialogue = []; 

const minigameCanvas = document.getElementById("minigameCanvas");
if (minigameCanvas) {
  minigameCanvas.width = 300;
  minigameCanvas.height = 300;
}

function normalizeAngle(angle) {
  let a = angle % (Math.PI * 2);
  if (a < 0) a += Math.PI * 2;
  return a;
}


let currentMusic = null;
