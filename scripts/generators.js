// Geradores e minigame de skill check da sala verde.

function spawnGenerators() {
  generators = [];
  
  // Posições fixas para os 5 geradores na sala verde
  const positions = [
    { x: 200, y: 750 },
    { x: 600, y: 850 },
    { x: 1000, y: 750 },
    { x: 1400, y: 800 },
    { x: 1700, y: 750 }
  ];
  
  positions.forEach((pos, index) => {
    generators.push({
      id: index,
      x: pos.x,
      y: pos.y,
      w: 60,
      h: 60,
      active: true,
      completed: false
    });
  });
  
  completedGenerators = 0;
}

function showTemporaryMessage(msg) {
  const messageBox = document.getElementById("temporaryMessage");
  messageBox.innerText = msg;
  messageBox.style.display = "block";
  messageBox.style.opacity = "1";
  
  setTimeout(() => {
    messageBox.style.opacity = "0";
    setTimeout(() => {
      messageBox.style.display = "none";
    }, 500);
  }, 2000);
}


function performSkillCheck() {
   if (!skillCheckActive) return;
  
  // Normaliza o ângulo atual do ponteiro
  const normalizedAngle = normalizeAngle(skillCheckAngle);
  
  // Verifica se está dentro da zona de sucesso
  let success = false;
  if (successZone.start <= successZone.end) {
    success = normalizedAngle >= successZone.start && normalizedAngle <= successZone.end;
  } else {
    // Zona cruza o 0/2π
    success = normalizedAngle >= successZone.start || normalizedAngle <= successZone.end;
  }
  
  if (success) {
    // Skill check bem-sucedido
    currentSkillChecks++;
    skillCheckProgress = Math.min(100, skillCheckProgress + (100 / skillCheckRounds));
    
    showSkillCheckFeedback("success");
    
    if (currentSkillChecks >= skillCheckRounds) {
      skillCheckProgress = 100; // Garante 100%
      completeGenerator();
    } else {
      // Próximo skill check
      skillCheckActive = false;
      setTimeout(() => {
        startSkillCheck();
      }, 500);
    }
  } else {
    // Falhou
    showSkillCheckFeedback("fail");
    
    // Penalidade: perde um pouco de progresso
    skillCheckProgress = Math.max(0, skillCheckProgress - 10);
    currentSkillChecks = Math.max(0, currentSkillChecks - 1);
    
    skillCheckActive = false;
    setTimeout(() => {
      if (minigameActive) {
        startSkillCheck();
      }
    }, 800);
  }
}

function completeGenerator() {
  if (currentGenerator) {
    currentGenerator.completed = true;
    currentGenerator.active = false;
    completedGenerators++;
    
    showSkillCheckFeedback("complete");
    
    // Sai do minigame
    exitMinigame();
    
    // Verifica se todos os geradores foram completados
    if (completedGenerators >= totalGenerators) {
      allGeneratorsCompleted();
    }
  }
}


function exitMinigame() {
  minigameActive = false;
  dialogueActive = false;
  skillCheckActive = false;
  currentGenerator = null;
  
  document.getElementById("minigameUI").style.display = "none";
}


function showSkillCheckFeedback(type) {
  const feedback = document.getElementById("skillCheckFeedback");
  
  switch(type) {
    case "success":
      feedback.innerText = "✓";
      feedback.style.color = "#4CAF50";
      break;
    case "fail":
      feedback.innerText = "✗";
      feedback.style.color = "#f44336";
      break;
    case "complete":
      feedback.innerText = "COMPLETO!";
      feedback.style.color = "#FFD700";
      break;
  }
  
  feedback.style.opacity = "1";
  setTimeout(() => {
    feedback.style.opacity = "0";
  }, 500);
}


function allGeneratorsCompleted() {
  // Marca a fase verde como concluída
  completedPhases.green = true;
  
  showTemporaryMessage("Todos os geradores consertados! A porta de saída foi aberta.");
}


// Desenha os geradores da sala verde.
function drawGenerators() {
   // Só desenha geradores na sala verde
   if (currentScene !== "green") return;
  
   generators.forEach(gen => {
     if (gen.active || gen.completed) {
       // Desenha gerador
       ctx.fillStyle = gen.completed ? "#4CAF50" : gen.active ? "#FFA500" : "#666";
       ctx.fillRect(gen.x, gen.y, gen.w, gen.h);
       
       // Borda
       ctx.strokeStyle = "#000";
       ctx.lineWidth = 2;
       ctx.strokeRect(gen.x, gen.y, gen.w, gen.h);
       
       // Texto
       ctx.fillStyle = "#FFF";
       ctx.font = "12px Arial";
       ctx.textAlign = "center";
       ctx.fillText(
         gen.completed ? "OK" : "GERADOR",
         gen.x + gen.w / 2,
         gen.y + gen.h / 2 + 4
       );
     }
   });
}


// Desenha o skill check no canvas secundário.
function drawMinigame() {
  if (!minigameActive || !skillCheckActive) return;
  
  const ui = document.getElementById("minigameCanvas");
  if (!ui) return;
  
  const mctx = ui.getContext("2d");
  const centerX = ui.width / 2;
  const centerY = ui.height / 2;
  const radius = 80;
  
  mctx.clearRect(0, 0, ui.width, ui.height);
  
  // Desenha círculo base
  mctx.beginPath();
  mctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  mctx.fillStyle = "#333";
  mctx.fill();
  mctx.strokeStyle = "#FFF";
  mctx.lineWidth = 3;
  mctx.stroke();
  
  // Desenha zona de sucesso
  mctx.beginPath();
  mctx.moveTo(centerX, centerY);
  mctx.arc(centerX, centerY, radius, successZone.start, successZone.end);
  mctx.closePath();
  mctx.fillStyle = "rgba(76, 175, 80, 0.3)";
  mctx.fill();
  mctx.strokeStyle = "#4CAF50";
  mctx.lineWidth = 2;
  mctx.stroke();
  
  // Desenha bolinha (ponteiro)
  const pointerX = centerX + Math.cos(skillCheckAngle) * radius;
  const pointerY = centerY + Math.sin(skillCheckAngle) * radius;
  
  mctx.beginPath();
  mctx.arc(pointerX, pointerY, 10, 0, Math.PI * 2);
  mctx.fillStyle = "#FFF";
  mctx.fill();
  mctx.strokeStyle = "#000";
  mctx.stroke();
  
  // Atualiza ângulo da bolinha
  skillCheckAngle += skillCheckSpeed * 0.05 * skillCheckDirection;
  
  // Barra de progresso
  mctx.fillStyle = "#666";
  mctx.fillRect(centerX - 100, centerY + radius + 20, 200, 20);
  
  mctx.fillStyle = "#4CAF50";
  mctx.fillRect(centerX - 100, centerY + radius + 20, 200 * (skillCheckProgress / 100), 20);
  
  mctx.fillStyle = "#FFF";
  mctx.font = "14px Arial";
  mctx.textAlign = "center";
  mctx.fillText(`${Math.round(skillCheckProgress)}%`, centerX, centerY + radius + 35);
  
  mctx.fillText(
    `Skill Checks: ${currentSkillChecks}/${skillCheckRounds}`,
    centerX,
    centerY + radius + 55
  );
}


function startSkillCheck() {
  skillCheckActive = true;
  skillCheckAngle = Math.random() * Math.PI * 2; // Ângulo inicial aleatório
  skillCheckSpeed = 0.8 + Math.random() * 0.7;  // Velocidade reduzida (1.5 a 3.0)
  skillCheckDirection = Math.random() > 0.5 ? 1 : -1;
  
  // Define zona de sucesso com ângulos normalizados
  const zoneAngle = Math.random() * Math.PI * 2;
  const zoneSize = Math.PI / 3; // 60 graus
  
  let start = normalizeAngle(zoneAngle - zoneSize / 2);
  let end = normalizeAngle(zoneAngle + zoneSize / 2);
  
  successZone = {
    start: start,
    end: end
  };
}

function startMinigame(generator) {
  minigameActive = true;
  dialogueActive = true; // Bloqueia movimento
  canInteract = false;
  currentGenerator = generator;
  skillCheckProgress = 0;
  currentSkillChecks = 0;
  
  // Mostra UI do minigame
  document.getElementById("minigameUI").style.display = "block";
  
  // Inicia primeiro skill check
  startSkillCheck();
}

