let theme = localStorage.getItem("theme");
let players = JSON.parse(localStorage.getItem("players"));

let cells = document.querySelectorAll(".cell");
let currentPlayerSpan = document.getElementById("current-player");
let message = document.getElementById("message");
let standings = document.getElementById("standings");


//game message
const updateMessage = (text) => {
    message.innerText = text;
    localStorage.setItem("message", text);
}
updateMessage(localStorage.getItem("message"));


// colors
let grey = 'rgb(226, 226, 226)';
let pink = 'rgb(250, 210, 215)';
let blue = 'rgb(204, 219, 253)';
let green = 'rgb(173, 247, 182)';

const changeTheme = (cells,color) => {
    cells.forEach (cell => {
        cell.style.backgroundColor = color;
    })
    theme = color;
    localStorage.setItem("theme",theme);
}
changeTheme(cells,theme);
switch (theme) {
    case "grey" :
        changeTheme(cells,grey);
        break;
    case "pink" :
        changeTheme(cells,pink);
        break;
    case "blue" : 
        changeTheme(cells,blue);
        break;
    case "green" :
        changeTheme(cells,green);
}

let greyButton = document.getElementById("grey-btn");
let pinkButton = document.getElementById("pink-btn");
let blueButton = document.getElementById("blue-btn");
let greenButton = document.getElementById("green-btn");

greyButton.addEventListener("click", () => {
    changeTheme(cells,grey);
})

pinkButton.addEventListener("click", () => {
    changeTheme(cells,pink);
})

blueButton.addEventListener("click", () => {
    changeTheme(cells,blue);
})

greenButton.addEventListener("click", () => {
    changeTheme(cells,green);
})



//new info/info from LS
const getPlayersName = (id) => {
    return id === 1 ? players[0].name : players[1].name;
}
let p1 = getPlayersName(1);
let p2 = getPlayersName(2);
let currentPlayer = localStorage.getItem("currentPlayer") || "X"

let history = JSON.parse(localStorage.getItem("history")) || []

let board = JSON.parse(localStorage.getItem("board")) ||
[null, null, null, null, null, null, null, null, null];

const renderBoard = () => {
    cells.forEach((cell,i) => {
        cell.innerHTML = board[i] ? `<p>${board[i]}</p>` : '';
    })
};
renderBoard();

const displayHistory = () => {
    let historyMoves = document.getElementById("history");
    if (history.length > 0) {
        historyMoves.innerHTML = "<h3>Historial de jugadas:</h3>";
        history.forEach(move => {
            let item = document.createElement("h4");
            item.textContent = `Turno ${move.turn}: ${move.player} jugó en la celda ${move.cell}`;
            historyMoves.appendChild(item);
        });
    } else {
        historyMoves.innerText = " "
    }
};
displayHistory();


const renderStandings = () => {
    if ((players[0].points || players[1].points) != 0)
        standings.innerHTML= `<h3>Puntajes:</h3>
        <h4>${p1} : ${players[0].points}</h4>
        <h4>${p2} : ${players[1].points}</h4>`;
}
renderStandings();


//game
currentPlayerSpan.innerText = currentPlayer === "X" ? p1 : p2;
cells.forEach(cell => {
    cell.addEventListener ("click", () => {
        let index = cell.getAttribute("data-index")
        if (!board[index]) {
            board[index] = currentPlayer;
            localStorage.setItem("board" , JSON.stringify(board));
            // cell.innerHTML = `<p>${currentPlayer}</p>`
            renderBoard()
            history.push({player: currentPlayer === "X" ? p1 : p2,
                cell: index,
                turn: history.length + 1})
            localStorage.setItem("history", JSON.stringify(history))
            displayHistory()
            if (checkWinner()) {
                let winner = currentPlayer === "X" ? 1 : 2
                increasePoint(winner);
                updateMessage(`Ganó ${players[winner-1].name}`)
                resetBoard();
            }else if (board.every(cell => cell != null)) {
                updateMessage(`Empate`);
                resetBoard();
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                localStorage.setItem("currentPlayer",currentPlayer);
                currentPlayerSpan.innerText = currentPlayer === "X" ? p1 : p2;
            }
        }
    })
});


//checking if the last move was a win
const checkWinner = () => {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]              
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}


//increse the winner´s score
const increasePoint = (id) => {
    players[id-1].points++;
    localStorage.setItem("players", JSON.stringify(players));
    standings.innerHTML= `<h3>Puntajes:</h3>
    <h4>${p1} : ${players[0].points}</h4>
    <h4>${p2} : ${players[1].points}</h4>`
}


//reset board
const resetBoard = () => {
    board = [null, null, null, null, null, null, null, null, null]
    renderBoard();
    currentPlayer = 'X';
    localStorage.setItem("currentPlayer",currentPlayer);
    currentPlayerSpan.innerText = currentPlayer === "X" ? p1 : p2;
    localStorage.setItem("board" , JSON.stringify(board));history = [];
    localStorage.setItem("history", JSON.stringify(history));
    displayHistory()
}


//if the reset button is clicked
let resetButton = document.getElementById("reset-btn");
resetButton.addEventListener("click", () => {
    Swal.fire({
        title: "Seguro que quieres reiniciar el juego?",
        text : "Se perderán todos los datos",
        showDenyButton: true,
        confirmButtonText: "Si, reiniciar",
        denyButtonText: `No, continúo la partida`
    }).then((result) => {
        if (result.isConfirmed) {
            resetBoard();
        players.forEach( p => {
            p.points = 0;
        }
        );
        standings.innerHTML= `<h3>Puntajes:</h3>
        <h4>${p1} : ${players[0].points}</h4>
        <h4>${p2} : ${players[1].points}</h4>`
        currentPlayer = 'X';
        updateMessage(" ");
        localStorage.setItem("currentPlayer",currentPlayer);
        currentPlayerSpan.innerText = currentPlayer === "X" ? p1 : p2;
        history = [];
        localStorage.setItem("history", JSON.stringify(history));
        displayHistory()
        } else if (result.isDenied) {
            Swal.fire("Continúa la partida");
        }
    });
})


//if the return to index button is clicked
let indexButton = document.getElementById("index-btn");
indexButton.addEventListener("click", () => {
    Swal.fire({
        title: "Seguro quieres volver al incio?",
        text : "Se perderán todos los datos",
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: "Si, volver al inicio",
        denyButtonText: `No, me quedo en el juego`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location.href = "index.html";
            localStorage.clear();
        } else if (result.isDenied) {
            Swal.fire("Continúa la partida");
        }
    });
})