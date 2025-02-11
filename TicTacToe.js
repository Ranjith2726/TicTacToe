
const board = document.getElementById("board");
const message = document.getElementById("message");
let cells = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;

function createBoard() {
    board.innerHTML = "";
    cells.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.innerText = cell || "";
        cellElement.addEventListener("click", handleCellClick);
        board.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (cells[index] || !gameActive) return;
    
    cells[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    
    if (checkWin()) {
        message.innerText = `${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }
    
    if (cells.every(cell => cell)) {
        message.innerText = "It's a Draw!";
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => 
        pattern.every(index => cells[index] === currentPlayer)
    );
}

function resetGame() {
    cells = Array(9).fill(null);
    currentPlayer = "X";
    gameActive = true;
    message.innerText = "";
    createBoard();
}

createBoard();
