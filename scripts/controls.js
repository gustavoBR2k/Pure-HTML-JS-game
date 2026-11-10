// Entrada do teclado e estado das interações.

let keys = {};
let canInteract = false;
let currentText = "";

document.addEventListener("keydown", e => {
  keys[e.key] = true;

  // As teclas numéricas respondem ao desafio de memória.
  if (pinkPuzzle.active) handlePinkInput(e.key);

  // Interação e avanço de diálogos por E ou Enter.
  if (e.key.toLowerCase() === "e" || e.key === "Enter") {
    if (transitioning) return;

    if (minigameActive) {
      performSkillCheck();            // skill check no minigame
    } else if (dialogueActive) {
      nextDialogue();
    } else if (canEnterDoor && currentDoor) {
      startTransition(currentDoor.target);
    } else if (canInteract && currentGenerator) {
      startMinigame(currentGenerator); // inicia minigame
    } else if (canInteract && currentText.length > 0) {
      startDialogue(currentText);
    }
  }
});


document.addEventListener("keyup", e => keys[e.key] = false);

