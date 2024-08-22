let players = JSON.parse(localStorage.getItem("players")) || [];
let theme = "";


//theme buttons
let arrayButtons = Array.from(document.querySelectorAll(".theme button"));

const changeBorder = (selected) => {
    arrayButtons.forEach((button) => {
        button.style.border = "none"
    })
    selected.style.border = `2px solid rgb(0, 0, 0)`
}

let greyButton = document.getElementById("grey-btn");
greyButton.addEventListener("click", () => {
    theme = "grey";
    localStorage.setItem("theme",theme);
    changeBorder(greyButton);
})

let pinkButton = document.getElementById("pink-btn");
pinkButton.addEventListener("click", () => {
    theme = "pink";
    localStorage.setItem("theme",theme);
    changeBorder(pinkButton);
})

let blueButton = document.getElementById("blue-btn");
blueButton.addEventListener("click", () => {
    theme = "blue";
    localStorage.setItem("theme",theme);
    changeBorder(blueButton);
})

let greenButton = document.getElementById("green-btn");
greenButton.addEventListener("click", () => {
    theme = "green";
    localStorage.setItem("theme",theme);
    changeBorder(greenButton);
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


//getting the avatars
const getAvatars = async () => {
    const avatarSeeds = ["Alice", "Bob", "Charlie", "Dave", "Eve"];
    const avatarsContainer = document.getElementById("avatars-container");
    avatarsContainer.innerHTML = '';

    for (let seed of avatarSeeds) {
        try {
            const response = await fetch(`https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&size=100&width=100&height=100`);

            const svgText = await response.text();
            
            const avatarElement = document.createElement("div");
            avatarElement.innerHTML = svgText;
            avatarsContainer.appendChild(avatarElement);

        } catch (error) {
            console.error('Error al obtener el avatar:', error);
        }
    }
};
getAvatars();


//logic and sweet alert
let formPlayers = document.querySelector("form");
formPlayers.addEventListener("submit", (e) => {
    e.preventDefault();
    if ((namePlayer1 && namePlayer2) !== "") {
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
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Completar bien los datos de los jugadores",
            timer: 2000,
            showConfirmButton : false
        });
    }
});

let startButton = document.getElementById("start-btn");
startButton.addEventListener("click", () => {
    if (namePlayer1 && namePlayer2 && theme) {
        window.location.href = "game.html";
    } else if (!namePlayer1 || !namePlayer2) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Completa los nombres de los jugadores",
            timer: 2000,
            showConfirmButton: false
        });
    } else if (!theme) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se seleccionó una temática",
            timer: 2000,
            showConfirmButton: false
        });
    }
});