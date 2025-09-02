const dialogs = [
  { text: "", img: "imagens/teatro.png", char: "", charPos: "" },
  { text: "Em uma escola, havia uma lenda sobre alunos desaparecendo...", img: "imagens/teatro.png", char: "", charPos: "" },

  { text: "Dias atrás, um aluno do 3º ano desapareceu misteriosamente, reacendendo os boatos.", img: "imagens/teatro.png", char: "", charPos: "" },
  { text: "Quatro alunos decidiram investigar: Daniel, Torrêncio, Carlos e Amanda.", img: "imagens/teatro.png", char: "", charPos: "" },
  
  { text: "Torrêncio: Todos prontos?", img: "imagens/portaporao.png", char: "imagens/diego.png", charPos: "left" },
  { text: "Carlos, Daniel e Amanda: Sim!", img: "imagens/portaporao.png", char: "", charPos: "" },
  { text: "Torrêncio: Verifiquem suas lanternas antes de entrar. Não queremos imprevistos em um local precário como este.", img: "imagens/portaporao.png", char: "imagens/diego.png", charPos: "left" },
  { text: "Daniel: Acho que a bateria da minha lanterna está com problemas...", img: "imagens/portaporao.png", char: "imagens/daniel.png", charPos: "right" },
  { text: "Amanda: Sem problemas! Trouxe uma reserva.", img: "imagens/portaporao.png", char: "imagens/melissa.png", charPos: "left" },
  { text: "Daniel: Obrigado!!", img: "imagens/portaporao.png", char: "imagens/daniel.png", charPos: "right" },
  { text: "Torrêncio: Bem, já que todos estão prontos, vamos entrar no porão.", img: "imagens/portaporao.png", char: "imagens/diego.png", charPos: "left" },
  { text: "Eles abrem a porta e entram.", img: "imagens/escada.png", char: "", charPos: "" },
  { text: "Amanda: Nossa, mas que lugar medonho!", img: "imagens/escada.png", char: "imagens/melissa.png", charPos: "left" },
  { text: "Carlos: É...", img: "imagens/escada.png", char: "imagens/carlos.png", charPos: "right" },

  { text: "O chão cede e todos caem, ficando separados.", img: "imagens/escadaquebrada.png", char: "", charPos: "" },
  { text: "Agora você pode escolher seu personagem.", img: "", char: "", charPos: "" }
];


let dialogIndex = 0;
let typingIndex = 0;
let typingSpeed = 30;
let typingInterval;
let isTyping = false;
let currentBackground = "";
let currentCharacter = "";

/* LGPD */
function acceptLGPD() {
  const lgpd = document.getElementById("lgpd-box");
  lgpd.style.opacity = 0;
  setTimeout(() => {
    lgpd.style.display = "none";
    document.getElementById("intro").style.display = "flex";
    setTimeout(() => {
      document.getElementById("intro").style.opacity = 1;
    }, 50);
  }, 1500);
}

/* Intro */
function iniciarIntro() {
  const intro = document.getElementById("intro");
  if (intro && intro.style.display !== "none") {
    startGame();
  }
}

window.onload = () => {
  document.addEventListener("keydown", handleIntroSpace);

  // clique do mouse na intro
  const intro = document.getElementById("intro");
  if (intro) {
    intro.addEventListener("click", iniciarIntro);
  }

  // clique do mouse durante o jogo para avançar diálogos
  document.addEventListener("click", handleDialogClick);
};


function handleIntroSpace(event) {
  if (event.code === "Space" || event.code === "Enter") {
    document.removeEventListener("keydown", handleIntroSpace);
    iniciarIntro();
  }
}

function startGame() {
  const intro = document.getElementById("intro");
  const fade = document.getElementById("fade-screen");
  intro.style.opacity = 0;

  setTimeout(() => {
    intro.style.display = "none";
    fade.style.opacity = 1;
    setTimeout(() => {
      fade.style.opacity = 0;
      document.getElementById("game").style.display = "block";
      enableDialogSpace();
      nextDialog();
    }, 1500);
  }, 1500);
}

//Inicia
function enableDialogSpace() {
  document.addEventListener("keydown", handleDialogSpace);
}

// Remove
function disableDialogSpace() {
  document.removeEventListener("keydown", handleDialogSpace);
}

//Lida com a entrada do teclado
function handleDialogSpace(event) {
  if (event.code === "Space" || event.code === "Enter") {
    event.preventDefault();
    nextDialog();
  }
}

// Clique do mouse avança o diálogo
function handleDialogClick() {
  nextDialog();
}

function nextDialog() {
  const dialogElement = document.getElementById("dialog-text");

  if (isTyping) {
    clearInterval(typingInterval);
    dialogElement.innerHTML = dialogs[dialogIndex - 1].text;
    isTyping = false;
    return;
  }

  if (dialogIndex >= dialogs.length) {
    disableDialogSpace();
    document.getElementById("game").style.display = "none";

    const choiceBox = document.getElementById("choice-box");
    choiceBox.style.display = "flex";
    setTimeout(() => {
      choiceBox.classList.add("visible");
      updateCharacter();
    }, 100);
    return;
  }

  const dialog = dialogs[dialogIndex];
  showBackground(dialog.img);
  showCharacter(dialog.char, dialog.charPos);
  typeText(dialog.text);
  dialogIndex++;
}

function typeText(text) {
  clearInterval(typingInterval);
  typingIndex = 0;
  const dialogElement = document.getElementById("dialog-text");
  dialogElement.innerHTML = "";
  isTyping = true;

  typingInterval = setInterval(() => {
    dialogElement.innerHTML += text.charAt(typingIndex);
    typingIndex++;
    if (typingIndex >= text.length) {
      clearInterval(typingInterval);
      isTyping = false;
    }
  }, typingSpeed);
}

function showBackground(image) {
  const bg = document.getElementById("background");
  if (image && image !== currentBackground) {
    currentBackground = image;
    bg.style.opacity = 0;
    setTimeout(() => {
      bg.style.backgroundImage = `url('${image}')`;
      bg.style.opacity = 1;
    }, 500);
  }
}

function showCharacter(image, position) {
  const char = document.getElementById("character");
  if (image && image !== currentCharacter) {
    currentCharacter = image;
    char.style.opacity = 0;
    setTimeout(() => {
      char.style.backgroundImage = `url('${image}')`;
      char.style.opacity = 1;
      if (position === "left") {
        char.style.left = "5%";
        char.style.right = "auto";
      } else if (position === "right") {
        char.style.left = "auto";
        char.style.right = "5%";
      } else {
        char.style.left = "50%";
        char.style.right = "auto";
        char.style.transform = "translateX(-50%)";
      }
    }, 500);
  } else if (!image) {
    currentCharacter = "";
    char.style.opacity = 0;
  }
}

/* Escolha de Personagem */
const characters = [
  {
    name: "Carlos",
    desc: "Habilidade: Enfrenta o perigo de frente, ótimo em combates.\n\nTrajetória: Tentará mover pedras para libertar o grupo.",
    img: "imagens/carlos.png"
  },
  {
    name: "Torrencio",
    desc: "Habilidade: Inteligente, observador, resolve enigmas.\n\nTrajetória: Buscará uma solução lógica para escapar.",
    img: "imagens/torrencio.png"
  },
  {
    name: "Daniel",
    desc: "Habilidade: Questiona tudo, resistente ao medo.\n\nTrajetória: Tentará entender o que aconteceu e achar uma saída.",
    img: "imagens/daniel.png"
  },
  {
    name: "Amanda",
    desc: "Habilidade: Percebe presenças sobrenaturais.\n\nTrajetória: Usará sua percepção para evitar perigos e reunir o grupo.",
    img: "imagens/amanda.png"
  }
];

let currentIndex = 0;

function updateCharacter() {
  const char = characters[currentIndex];
  document.getElementById('char-image').src = char.img;
  document.getElementById('char-name').innerText = char.name;
  document.getElementById('char-desc').innerText = char.desc;
}

function prevCharacter() {
  currentIndex = (currentIndex - 1 + characters.length) % characters.length;
  updateCharacter();
}

function nextCharacter() {
  currentIndex = (currentIndex + 1) % characters.length;
  updateCharacter();
}

// Função de confirmação atualizada
async function confirmCharacter() {
  const escolhido = characters[currentIndex];
  let message = `Você escolheu ${escolhido.name}`;
  if (typeof translateAlert === 'function') {
    message = await translateAlert(message);
  }
  alert(message);

  try {
    if (escolhido.name === "Carlos") {
      window.location.href = "personagem/Carlos.html";
    } else if (escolhido.name === "Torrencio") {
      window.location.href = "personagem/Torrencio.html";
    } else if (escolhido.name === "Daniel") {
      window.location.href = "personagem/Daniel.html";
    } else if (escolhido.name === "Amanda") {
      window.location.href = "personagem/Amanda.html";
    } else {
      // fallback
      window.location.href = "personagem/Carlos.html";
    }
  } catch (e) {
    // fallback se algo der errado
    window.location.href = "personagem/Carlos.html";
  }

  let consoleMessage = `Você iniciou como ${escolhido.name}`;
  if (typeof translateAlert === 'function') {
    consoleMessage = await translateAlert(consoleMessage);
  }
  console.log(consoleMessage);
}
