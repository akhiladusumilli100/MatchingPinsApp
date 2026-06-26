let game = new MatchPins();

let selectedIndex = null;
let moves = 0;

const board = document.getElementById("board");
const movesEl = document.getElementById("moves");
const correctEl = document.getElementById("correct");
const messageEl = document.getElementById("message");

const winPopup = document.getElementById("winPopup");
const newGameButton = document.getElementById("newGameButton");
const checkButton = document.getElementById("checkButton");
const playAgainButton = document.getElementById("playAgainButton");

// Convert pin color name to CSS class
function getColorClass(color) {
    return color.toLowerCase();
}

// Render the board
function renderBoard() {
    board.innerHTML = "";

    game.guess.forEach((color, index) => {
        const pin = document.createElement("div");

        pin.classList.add("pin", getColorClass(color));

        if (index === selectedIndex) {
            pin.classList.add("selected");
        }

        pin.addEventListener("click", () => handlePinClick(index));

        board.appendChild(pin);
    });

    updateStats();
}

// Handle pin selection and swapping
function handlePinClick(index) {
    if (selectedIndex === null) {
        selectedIndex = index;
        messageEl.textContent = "Select another pin to swap.";
    } else {
        if (selectedIndex === index) {
            selectedIndex = null;
            renderBoard();
            messageEl.textContent = "Tap two pins to swap them.";
            return;
        }

        game.switchPin(selectedIndex, index);
        moves++;

        selectedIndex = null;

        renderBoard();
        checkWin();
    }
}

// Update move count and correct count
function updateStats() {
    movesEl.textContent = moves;

    const correct = game.checkPins();
    correctEl.textContent = `${correct} / ${game.size}`;
}

// Check win condition
function checkWin() {
    if (game.checkGameOver()) {
        winPopup.classList.remove("hidden");
    }
}

// Start new game
function newGame() {
    game = new MatchPins();
    selectedIndex = null;
    moves = 0;
    winPopup.classList.add("hidden");

    renderBoard();
}

// Button listeners
newGameButton.addEventListener("click", newGame);
checkButton.addEventListener("click", () => {
    const correct = game.checkPins();
    messageEl.textContent = `${correct} out of ${game.size} correct.`;
});

playAgainButton.addEventListener("click", newGame);

// Initial render
renderBoard();

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
}