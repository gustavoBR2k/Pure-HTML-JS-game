// Diálogos e janelas de desafio.

// Função que mostra o popup de desafio
function showChallengePrompt(title, text) {

  dialogueActive = true;

  const challengeBox =
    document.getElementById("challengeBox");

  challengeBox.style.display = "block";

  document.getElementById(
    "challengeTitle"
  ).innerText = title;

  document.getElementById(
    "challengeText"
  ).innerText = text;
}
// Ao aceitar
window.acceptChallenge = function() {

  document.getElementById("challengeBox").style.display = "none";

  dialogueActive = false;

  // SALA VERDE
  if (
    pendingChallenge === "green" &&
    completedGenerators === 0
  ) {

    spawnGenerators();

    showTemporaryMessage(
      "Geradores ativados!"
    );

  }

  // SALA ROSA
  else if (pendingChallenge === "pink") {

    showTemporaryMessage(
      "Prepare-se para memorizar!"
    );

    startPinkPuzzle();
  }

  // SALA LARANJA
  else if (pendingChallenge === "orange") {

    orange.active = true;

    orange.time = orange.duration;

    orange.bullets = [];

    orange.hp = 5;

    showTemporaryMessage(
      "Desafio iniciado!"
    );
  }

  pendingChallenge = null;
};

// ===== SISTEMA DE DIÁLOGO =====

function startDialogue(textArray) {
   dialogueActive = true;
  dialogueIndex = 0;
  currentDialogue = textArray;
  showDialogue(currentDialogue[dialogueIndex]);
}

function nextDialogue() {
  dialogueIndex++;

  if (dialogueIndex < currentDialogue.length) {
    showDialogue(currentDialogue[dialogueIndex]);
  } else {
    hideDialogue();
    
    // Ao terminar o diálogo, oferece o desafio da sala atual.
   if (currentScene === "green") {

  pendingChallenge = "green";

  showChallengePrompt(
    "Desafio da Sala Verde",
    "Aceita consertar os geradores?"
  );

}

else if (
  currentScene === "pink" &&
  !completedPhases.pink
) {

  pendingChallenge = "pink";

  showChallengePrompt(
    "Desafio da Sala Rosa",
    "Aceita o desafio da memória?"
  );

}

else if (currentScene === "orange") {

  pendingChallenge = "orange";

  showChallengePrompt(
    "Desafio da Sala Laranja",
    "Aceita o desafio desta sala?"
  );

}
  }
}

function showDialogue(text) {
   document.getElementById("dialogueText").innerText = text;
   document.getElementById("dialogueBox").style.display = "block";
}

function hideDialogue() {
   dialogueActive = false;
    document.getElementById("dialogueBox").style.display = "none";
}

document.getElementById("dialogueBox").addEventListener("click", nextDialogue);


window.refuseChallenge = function() {
  document.getElementById("challengeBox").style.display = "none";
  dialogueActive = false;
  pendingChallenge = null;
};
