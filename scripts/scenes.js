// Portas, pontos de interação e música de cada cena.

// portas por cenário
const scenes = {
      // ===== SALA PRETA =====
  black: [

    {
      x: 450,
      y: 200,
      w: 60,
      h: 90,

      target: "green",
      image: greenDoor,

      // spawn na sala verde
      spawnX: 450,
      spawnY: 800
    },

    {
      x: 650,
      y: 200,
      w: 60,
      h: 90,

      target: "pink",
      image: pinkDoor,

      // spawn na sala rosa
      spawnX: 450,
      spawnY: 800
    },

    {
     x: 820,
  y: 200,
  w: 60,
  h: 90,

  target: "orange",
  image: orangeDoor,

  spawnX: 880,
  spawnY: 320
}


  ],

  // ===== SALA VERDE =====
  green: [

    {
      x: 300,
      y: 750,
      w: 60,
      h: 90,

      target: "black",
      image: greenDoor,

      // spawn em frente da porta verde
      spawnX: 480,
      spawnY: 320
    }

  ],

  // ===== SALA ROSA =====
  pink: [
  {
    x: 300,
    y: 730,
    w: 60,
    h: 90,
    target: "black",
    image: pinkDoor,

    spawnX: 680,
    spawnY: 320
  }


  ],

  // ===== SALA LARANJA =====
  orange: [

    {
      x: 300,
      y: 200,
      w: 60,
      h: 90,

      target: "black",
      image: orangeDoor,

      // spawn em frente da porta laranja
      spawnX: 880,
      spawnY: 320
    }

  ]

};

const finalDoor = {
  x: 450,
  y: 350,
  w: 80,
  h: 120,
  target: "credits",
  image: goldenDoor,
  spawnX: 0,
  spawnY: 0
};

let escapeDoor = {
  x: 1700,
  y: 900,
  w: 60,
  h: 90
};

// objetos interativos
const interactions = {
  green: [
    { 
      x: 500, 
      y: 700, 
      w: 50, 
      h: 50, 
      text: [
        "Olá vijante, seja bem-vindo à sala dos geradores.",
        "Este será o seu primeiro desafio...",
        "Boa sorte!"
      ] 
    }
  ],
  pink: [ 
    { 
    x: 500, 
    y: 700, 
    w: 50, 
    h: 50, 
    text: [
       
   "Olá, viajante...",
    "Este desafio é diferente.",
    "Você precisará ter uma boa memória para superar este teste.",
    "Memorize a sequência de figuras e complete o desafio.",
    "Boa sorte!"
    ]
  }
  ],
  

orange: [
    { 
      x: 500, 
      y: 300,
      w: 50,
      h: 50,
      text: [
    "Olá viajante...",
    "Nesta sala você deverá sobreviver.",
    "Desvie das balas até o tempo acabar.",
    "Está preparado?"
      ]
    }
]

};

const music = {
  black: new Audio ("audio/black.mp3"),
  green: new Audio ("audio/green.mp3"),
  pink: new Audio ("audio/pink.mp3"),
  orange: new Audio ("audio/orange.mp3")
};

for (let key in music) {
  music [key].loop = true;
  music[key].volume = 0.15;
}
