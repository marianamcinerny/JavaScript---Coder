let theme = localStorage.getItem("theme");
let players = JSON.parse(localStorage.getItem("players"));

let cells = document.querySelectorAll(".cell");
let currentPlayerSpan = document.getElementById("current-player");
let message = document.getElementById("message");
message.innerText = " ";


const getPlayersName = (id) => {
    return id === 1 ? players[0].name : players[1].name;
}

let p1 = getPlayersName(1);
let p2 = getPlayersName(2);
let currentPlayer = localStorage.getItem("currentPlayer") || "X"


let board = JSON.parse(localStorage.getItem("board")) || 
[null, null, null, null, null, null, null, null, null];

const renderBoard = () => {
    cells.forEach((cell,i) => {
        cell.innerHTML = board[i] ? `<p>${board[i]}</p>` : '';
    })
};
renderBoard();



currentPlayerSpan.innerText = currentPlayer === "X" ? p1 : p2;
cells.forEach(cell => {
    cell.addEventListener ("click", () => {
        let index = cell.getAttribute("data-index")
        if (!board[index]) {
            board[index] = currentPlayer;
            localStorage.setItem("board" , JSON.stringify(board));
            cell.innerHTML = `<p>${currentPlayer}</p>`
            if (checkWinner()) {
                let winner = currentPlayer === "X" ? 1 : 2
                increasePoint(winner);
                message.innerText = `Ganó ${players[winner-1].name}`
                resetBoard();
            }else if (board.every(cell => cell != null)) {
                message.innerText = `Empate`
                resetBoard();
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                localStorage.setItem("currentPlayer",currentPlayer);
                currentPlayerSpan.innerText = currentPlayer === "X" ? p1 : p2;
            }
        }
    })
});



const checkWinner = () => {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]              // Diagonales
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}


let standings = document.getElementById("standings");

const increasePoint = (id) => {
    players[id-1].points++;
    standings.innerHTML= `<h3>Puntajes:</h3>
    <p>${p1} : ${players[0].points}</p>
    <p>${p2} : ${players[1].points}</p>`
    localStorage.setItem("score" , JSON.stringify(standings.innerHTML));
}

const resetBoard = () => {
    board = [null, null, null, null, null, null, null, null, null]
    cells.forEach(cell => {
        cell.innerText = '';
    });
    currentPlayer = 'X';
    localStorage.setItem("currentPlayer",currentPlayer);
    currentPlayerSpan.innerText = currentPlayer === "X" ? p1 : p2;
    localStorage.setItem("board" , JSON.stringify(board));
}


let resetButton = document.getElementById("reset-btn");
resetButton.addEventListener("click", () => {
    resetBoard();
    players.forEach( p => {
        p.points = 0;
    }
    );
    standings.innerHTML= "";
    currentPlayer = 'X';
    localStorage.setItem("currentPlayer",currentPlayer);
    currentPlayerSpan.innerText = currentPlayer === "X" ? p1 : p2;
})

let indexButton = document.getElementById("index-btn");
indexButton.addEventListener("click", () => {
    window.location.href = "index.html";
    localStorage.clear();
})