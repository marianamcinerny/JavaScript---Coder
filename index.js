let players = JSON.parse(localStorage.getItem("players")) || [];

//theme buttons
let theme = "";

let blackButton = document.getElementById("black-btn");
blackButton.addEventListener("click", () => {
    theme = "black";
    localStorage.setItem("theme",theme);
})

let pinkButton = document.getElementById("pink-btn");
pinkButton.addEventListener("click", () => {
    theme = "pink";
    localStorage.setItem("theme",theme);
})

let blueButton = document.getElementById("blue-btn");
blueButton.addEventListener("click", () => {
    theme = "blue";
    localStorage.setItem("theme",theme);
})

let greenButton = document.getElementById("green-btn");
greenButton.addEventListener("click", () => {
    theme = "green";
    localStorage.setItem("theme",theme);
})




//getting players names
let inputPlayer1 = document.getElementById("player1");
let inputPlayer2 = document.getElementById("player2");
let namePlayer1 = "";
let namePlayer2 = "";

inputPlayer1.addEventListener("input", () => {
    namePlayer1 = inputPlayer1.value;
})
inputPlayer2.addEventListener("input", () => {
    namePlayer2 = inputPlayer2.value;
})


let formPlayers = document.querySelector("form");
formPlayers.addEventListener("submit", (e) => {
    e.preventDefault();
    if (namePlayer1 && namePlayer2 !== "") {
        players = [
            {
                id: 1,
                name: namePlayer1,
                points: 0,
            },
            {
                id: 2,
                name: namePlayer2,
                points: 0,
            },
        ]
        localStorage.setItem("players" , JSON.stringify(players));
    }
    else {
        alert("completar bien los datos de los jugadores");
    }
});

let startButton = document.getElementById("start-btn");
startButton.addEventListener("click", () => {
    if ((namePlayer1 && namePlayer2 && theme) !== "" ) {
        window.location.href = "game.html";
    }
    else if ((namePlayer1 || namePlayer2) == ""){
        alert("completar bien los datos de los jugadores");
    }
    else {
        alert("no se selecciono una tematica");
    }
})