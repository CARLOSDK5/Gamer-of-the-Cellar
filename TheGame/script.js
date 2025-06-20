const dialogs = [
  { text: "Em uma escola, havia uma lenda sobre alunos desaparecendo...", img: "imagens/teatro.png", char: "", charPos: "" },
  { text: "No dia que ela completaria 100 anos, nove alunos desapareceram.", img: "imagens/teatro.png", char: "", charPos: "" },
  { text: "Quatro alunos decidiram investigar: Daniel, Diego, Carlos e Melissa.", img: "imagens/teatro.png", char: "", charPos: "" },
  { text: 'Diego: "Todos prontos para investigar?"', img: "imagens/teatro.png", char: "imagens/diego.png", charPos: "left" },
  { text: 'Daniel: "Minha lanterna não está funcionando..."', img: "imagens/teatro.png", char: "imagens/daniel.png", charPos: "right" },
  { text: "O chão cede e todos caem, ficando separados.", img: "imagens/porao.png", char: "", charPos: "" },
  { text: "Agora você pode escolher seu personagem.", img: "", char: "", charPos: "" }
];

let dialogIndex = 0;
let typingIndex = 0;
let typingSpeed = 30;
let typingInterval;
let isTyping = false;

window.onload = () => {
  document.addEventListener("keydown", handleIntroSpace);
};

function handleIntroSpace(event) {
  if (event.code === "Space") {
    document.removeEventListener("keydown", handleIntroSpace);
    startGame();
  }
}

function startGame() {
  const intro = document.getElementById("intro");
  const fade = document.getElementById("fade-screen");
  intro.style.display = "none";
  fade.style.opacity = 1;

  setTimeout(() => {
    fade.style.opacity = 0;
    document.getElementById("game").style.display = "block";
    enableDialogSpace();
    nextDialog();
  }, 1500);
}

function enableDialogSpace() {
  document.addEventListener("keydown", handleDialogSpace);
}

function disableDialogSpace() {
  document.removeEventListener("keydown", handleDialogSpace);
}

function handleDialogSpace(event) {
  if (event.code === "Space") {
    event.preventDefault();
    nextDialog();
  }
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
    document.getElementById("choice-box").classList.remove("hidden");
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
  if (image) {
    bg.style.opacity = 0;
    setTimeout(() => {
      bg.style.backgroundImage = `url('${image}')`;
      bg.style.opacity = 1;
    }, 500);
  }
}

function showCharacter(image, position) {
  const char = document.getElementById("character");
  if (image) {
    char.style.opacity = 0;
    setTimeout(() => {
      char.style.backgroundImage = `url('${image}')`;
      char.style.opacity = 1;
      if (position === "left") {
        char.style.left = "5%";
        char.style.right = "auto";
        char.style.transform = "none";
      } else if (position === "right") {
        char.style.left = "auto";
        char.style.right = "5%";
        char.style.transform = "none";
      } else {
        char.style.left = "50%";
        char.style.right = "auto";
        char.style.transform = "translateX(-50%)";
      }
    }, 500);
  } else {
    char.style.opacity = 0;
  }
}

function chooseCharacter(name) {
  alert(`Você escolheu ${name}. O jogo continuará a partir daqui!`);
}
