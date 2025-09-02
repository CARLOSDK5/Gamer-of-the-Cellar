// Diálogos iniciais antes da escolha
const dialogsCarlos = [
  { text: "Carlos desperta tossindo, sentindo o peso da queda. O ar é pesado e cheira a mofo.", img: "imagens/salacarlos.png", char: "imagens/carlos.png", charPos: "left" },
  { text: "Ele percebe estar em um porão antigo, iluminado fracamente por frestas de luz.", img: "imagens/porao.jpg", char: "imagens/carlos.png", charPos: "left" },
  { text: 'Carlos (olhando ao redor): "Droga... onde é que eu vim parar...?"', img: "imagens/porao.jpg", char: "imagens/carlos.png", charPos: "left" },
  { text: "Diante dele há uma porta antiga de madeira, parcialmente apodrecida pelo tempo.", img: "imagens/portaporao.png", char: "imagens/carlos.png", charPos: "left" },
  { text: "E, do outro lado, uma grade caída que revela um corredor escuro e úmido.", img: "imagens/salacarlos.png", char: "imagens/carlos.png", charPos: "left" },
  { text: "O coração de Carlos acelera, a sensação de estar sendo observado o corrói.", img: "imagens/porao.jpg", char: "imagens/carlos.png", charPos: "left" },
  { text: "O que Carlos deve fazer?", img: "imagens/porao.jpg", char: "imagens/carlos.png", charPos: "left" }
];

let dialogIndexCarlos = 0;
let typingIndexCarlos = 0;
let typingSpeedCarlos = 30;
let typingIntervalCarlos;
let isTypingCarlos = false;
let currentBackgroundCarlos = "";

window.onload = () => {
  document.addEventListener("keydown", handleDialogSpaceCarlos);
  nextDialogCarlos();
};

function handleDialogSpaceCarlos(event) {
  if (event.code === "Space" || event.code === "Enter") {
    event.preventDefault();
    nextDialogCarlos();
  }
}

function nextDialogCarlos() {
  const dialogElement = document.getElementById("dialog-text");

  if (isTypingCarlos) {
    clearInterval(typingIntervalCarlos);
    dialogElement.innerHTML = dialogsCarlos[dialogIndexCarlos - 1].text;
    isTypingCarlos = false;
    return;
  }

  if (dialogIndexCarlos >= dialogsCarlos.length) {
    document.removeEventListener("keydown", handleDialogSpaceCarlos);
    showChoiceCarlos();
    return;
  }

  const dialog = dialogsCarlos[dialogIndexCarlos];
  showBackgroundCarlos(dialog.img);
  showCharacterCarlos(dialog.char, dialog.charPos);
  typeTextCarlos(dialog.text);
  dialogIndexCarlos++;
}

function typeTextCarlos(text) {
  clearInterval(typingIntervalCarlos);
  typingIndexCarlos = 0;
  const dialogElement = document.getElementById("dialog-text");
  dialogElement.innerHTML = "";
  isTypingCarlos = true;

  typingIntervalCarlos = setInterval(() => {
    dialogElement.innerHTML += text.charAt(typingIndexCarlos);
    typingIndexCarlos++;
    if (typingIndexCarlos >= text.length) {
      clearInterval(typingIntervalCarlos);
      isTypingCarlos = false;
    }
  }, typingSpeedCarlos);
}

function showBackgroundCarlos(image) {
  const bg = document.getElementById("background");
  if (image && image !== currentBackgroundCarlos) {
    currentBackgroundCarlos = image;
    bg.style.opacity = 0;
    setTimeout(() => {
      bg.style.backgroundImage = `url('${image}')`;
      bg.style.opacity = 1;
    }, 500);
  }
}

function showCharacterCarlos(image, position) {
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

/* ---------------- ESCOLHAS ---------------- */

function showChoiceCarlos() {
  const choiceBox = document.getElementById("choice-box");
  choiceBox.innerHTML = `
    <button onclick="choosePorta()">➤ Entrar pela porta antiga</button>
    <button onclick="chooseGrade()">➤ Seguir pela grade caída</button>
  `;
  choiceBox.style.display = "flex";
}

/* Opção A – Porta Antiga */
function choosePorta() {
  const portaDialogs = [
    { text: "Carlos empurra a porta antiga com o ombro e entra num velho almoxarifado.", img: "imagens/teatro.png", char: "imagens/carlos.png", charPos: "left" },
    { text: "Prateleiras quebradas, caixas de papel mofado e cartazes rasgados cobrem o chão.", img: "imagens/teatro.png", char: "imagens/carlos.png", charPos: "left" },
    { text: "Um cartaz chama atenção: 'DESAPARECIDO — Fulano, 17 anos. Visto pela última vez há 3 semanas.'", img: "imagens/teatro.png", char: "imagens/carlos.png", charPos: "left" },
    { text: 'Carlos (franzindo a testa): "Mas que merda é essa...?"', img: "imagens/teatro.png", char: "imagens/carlos.png", charPos: "left" },
    { text: "De repente, um rangido ecoa. Carlos rapidamente sai da sala e volta para o corredor.", img: "imagens/porao.jpg", char: "imagens/carlos.png", charPos: "left" },
    { text: "Ele decide seguir pela grade caída.", img: "imagens/salacarlos.png", char: "imagens/carlos.png", charPos: "left" }
  ];

  playSubDialogs(portaDialogs);
}

/* Opção B – Grade Caída */
function chooseGrade() {
  const gradeDialogs = [
    { text: "Carlos se abaixa e passa por baixo da grade torta.", img: "imagens/salacarlos.png", char: "imagens/carlos.png", charPos: "left" },
    { text: "Um corredor úmido e fétido se abre diante dele, com água pingando das paredes.", img: "imagens/escada.png", char: "imagens/carlos.png", charPos: "left" },
    { text: "Passos distantes ecoam por alguns segundos... mas logo desaparecem.", img: "imagens/escadaquebrada.png", char: "imagens/carlos.png", charPos: "left" },
    { text: 'Carlos: "Mas que merda tá acontecendo aqui... preciso achar alguém."', img: "imagens/escadaquebrada.png", char: "imagens/carlos.png", charPos: "left" }
  ];

  playSubDialogs(gradeDialogs);
}

/* Reutiliza o sistema de diálogos para as escolhas */
function playSubDialogs(dialogs) {
  let i = 0;

  function next() {
    if (i >= dialogs.length) {
      alert("Fim da Fase 1 do Carlos!");
      return;
    }
    const d = dialogs[i];
    showBackgroundCarlos(d.img);
    showCharacterCarlos(d.char, d.charPos);
    typeTextCarlos(d.text);
    i++;
  }

  document.addEventListener("keydown", function handler(event) {
    if (event.code === "Space" || event.code === "Enter") {
      event.preventDefault();
      next();
    }
  });

  next();
}
