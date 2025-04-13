const resetBtn = document.getElementById("resetBtn");
const submitBtn = document.getElementById("submitBtn");
const deleteBtn = document.getElementById("deleteBtn");
const keyboard = document.getElementById("keyboard");
const board = document.getElementById("board");

const palavras = [
    "TERMO", "CASAL", "NINJA", "FUGIR", "GRITO", "LIMÃO", "VELHO",
    "BATOM", "TEXTO", "NORTE", "CORES", "JUNTA", "TREVO", "RUGIR"
];

let palavraCorreta = sortearPalavra();
let tentativas = 0;
let tentativaAtual = [];

function sortearPalavra() {
    const index = Math.floor(Math.random() * palavras.length);
    return palavras[index];
}

function gerarTabuleiro() {
    board.innerHTML = "";
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const div = document.createElement("div");
            div.setAttribute("id", `cell-${i}-${j}`);
            board.appendChild(div);
        }
    }
}

function gerarTeclado() {
    keyboard.innerHTML = "";

    const tecladoLinhas = [
        "QWERTYUIOP",
        "ASDFGHJKL",
        "ZXCVBNM"
    ];

    tecladoLinhas.forEach(linha => {
        const linhaDiv = document.createElement("div");
        linhaDiv.classList.add("linha");
        linha.split("").forEach(letra => {
            const btn = document.createElement("button");
            btn.textContent = letra;
            btn.addEventListener("click", () => adicionarLetra(letra));
            linhaDiv.appendChild(btn);
        });
        keyboard.appendChild(linhaDiv);
    });
}

function adicionarLetra(letra) {
    if (tentativaAtual.length < 5) {
        tentativaAtual.push(letra);
        atualizarTabuleiro();
    }
}

function atualizarTabuleiro() {
    const row = tentativas;
    for (let i = 0; i < 5; i++) {
        const cell = document.getElementById(`cell-${row}-${i}`);
        cell.textContent = tentativaAtual[i] || "";
    }
}

function verificarPalavra() {
    const tentativa = tentativaAtual.join('').toUpperCase();
    for (let i = 0; i < 5; i++) {
        const cell = document.getElementById(`cell-${tentativas}-${i}`);
        if (tentativa[i] === palavraCorreta[i]) {
            cell.style.backgroundColor = "#3aa394";
        } else if (palavraCorreta.includes(tentativa[i])) {
            cell.style.backgroundColor = "#d3ad69";
        } else {
            cell.style.backgroundColor = "#312a2c";
        }
    }

    if (tentativa === palavraCorreta) {
        setTimeout(() => alert("Parabéns! Você acertou a palavra!"), 100);
    }

    tentativas++;
    tentativaAtual = [];

    if (tentativas >= 6) {
        setTimeout(() => alert("Fim de jogo! A palavra correta era: " + palavraCorreta), 200);
    }
}

function apagarUltimaLetra() {
    if (tentativaAtual.length > 0) {
        tentativaAtual.pop();
        atualizarTabuleiro();
    }
}

submitBtn.addEventListener("click", () => {
    if (tentativaAtual.length === 5) {
        verificarPalavra();
    } else {
        alert("Digite uma palavra de 5 letras.");
    }
});

deleteBtn.addEventListener("click", apagarUltimaLetra);

resetBtn.addEventListener("click", () => {
    tentativas = 0;
    tentativaAtual = [];
    palavraCorreta = sortearPalavra();
    gerarTabuleiro();
    gerarTeclado();
});

gerarTabuleiro();
gerarTeclado();
