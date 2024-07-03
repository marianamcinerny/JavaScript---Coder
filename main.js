const oficial = 954.10;
const turista = 1526.56;
const blue = 1405.00;

function convertir() {
    let total;
    if (cambio === "oficial") 
        total = monto * oficial;
    else if (cambio === "turista")
        total = monto * turista;
    else
        total = monto * blue;
    return total;
}

let cambio = prompt("¿Qué tipo de cambio desea realizar? oficial - blue - turista")
while ((cambio !== "oficial") && (cambio !== "turista") && (cambio !== "blue")) {
    cambio = prompt("Opción incorrecta, posibles cambios: oficial - blue - turista");
}

let monto = prompt("Ingrese el monto a cambiar");
let cantidadPesos = convertir();
alert("Monto total: $" + cantidadPesos + " pesos argentinos");
