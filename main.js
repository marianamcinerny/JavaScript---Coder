let pacientes = [];
let contador = 1;
let addPacienteButton = document.getElementById("boton-agregar");
let buscarPacienteButton = document.getElementById("boton-buscar");
let pacientesList = document.getElementById("lista-pacientes")


let addPaciente = () => {
    let nom = prompt("Ingrese el nombre del paciente");
    let age = Number(prompt("Ingrese la edad de " + nom));
    let paciente = {
        id : contador,
        nombre : nom,
        edad : age,
    }
    pacientes.push(paciente);

    contador++;

    mostrarPacientes();
}

let buscarPaciente = () => {
    let nom = prompt("Ingrese el nombre del paciente");
    let encontrado = pacientes.find((paciente) => paciente.nombre === nom);
    if (encontrado != null)
        console.log(encontrado);
    else
        alert(`El paciente ${nom} no se encuentra en el sistema`);
}


addPacienteButton.addEventListener("click",addPaciente);
buscarPacienteButton.addEventListener("click",buscarPaciente);


const deletePaciente = (elemento) => {
    pacientes = pacientes.filter((paciente) => paciente.id != elemento.id);
    mostrarPacientes();
}

const mostrarPacientes = () => {
    pacientesList.innerHTML = "";

    pacientes.forEach((elemento => {
        let item = document.createElement("li");
        item.className = "card";
        
        item.innerHTML = `<span> Nombre: ${elemento.nombre}, edad: ${elemento.edad}</span> 
        <button class="delete-button">Dar de alta</button>`;

        let deleteButton = item.querySelector(".delete-button");
        
        deleteButton.addEventListener("click", () => {
            deletePaciente(elemento);
        });

        pacientesList.appendChild(item);
    }))   
}
mostrarPacientes();