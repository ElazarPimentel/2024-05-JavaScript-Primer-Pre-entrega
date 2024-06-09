// Nombre del archivo: main.js
// Alessio Aguirre Pimentel
// v4

// Inicialización de arrays vacíos
const usuarios = [],
    mascotas = [],
    turnos = [];

// Inicialización de arrays con valores
const servicios = ["Baño y Peinado", "Vacunación", "Eliminación de Pulgas"]; // Primer array

// Inicialización de variables numéricas
let idCounter = 0, // Primer variable numérica
    idTurnoCounter = 0; // Contador para IDs de turnos

// Inicialización de variables de texto
let servicio = "", // Primer variable string
    nombreUsuario = "",
    telefonoUsuario = "",
    nombreMascota = "",
    edadMascota = "",
    fechaTurno = "",
    horaTurno = "",
    opcion = "",
    nuevaFecha = "",
    nuevaHora = "",
    nuevoServicio = "";

// Función mensaje despedida
const mensajeDespedida = () => alert('🖐️ Gracias y hasta luego 🖐️'); // Función arrow. En una reciente capacitación nos dijeron que la gente ama emojis. La agregué porque se repite mucho el mensaje.

// Función que genera ID's unívocos
const generarID = () => idCounter++; //IDs general
const generarTurnoID = () => idTurnoCounter++; // ID de turnos para que sean consecutivos (antes usaba generarID para todo)

// Bienvenida e ingreso de datos. Se llama del bucle de control de todo el programa al final del código.
function ingresarDatosUsuario() { //Función declarativa

    nombreUsuario = prompt("🐶 ¡Bienvenido a la Veterinaria Pata-pata-gonica! 🐱\n👤 Hola, ¿cómo te llamás? 👤:");
    if (nombreUsuario === null) {
        mensajeDespedida();
        return null;
    }
    telefonoUsuario = prompt("📞 Por favor, ingresá tu teléfono 📞:");
    if (telefonoUsuario === null) {
        mensajeDespedida();
        return null;
    }
    const usuario = {
        id: generarID(),
        nombreUsuario,
        telefonoUsuario
    };
    usuarios.push(usuario); // Primer push

    return usuario.id;
}

// Ingreso de datos de las mascotas y sus turnos
const ingresoDatosMascotasYTurnos = (idUsuario) => { //Función anónima

    const cantidadNuevaMascotas = prompt("🐾 ¿Cuántas mascotas querés traer a la veterinaria? 🐾");
    if (cantidadNuevaMascotas === null) {
        mensajeDespedida();
        return false; // Cambiado a false para detener el programa porque seguía de largo.
    }
    if (isNaN(parseInt(cantidadNuevaMascotas))) {
        alert("😊 por favor usá un número válido de mascotas 😊");
        return true; // Continua con el menú
    }
    for (let i = 0; i < parseInt(cantidadNuevaMascotas); i++) { //Primer for
        nombreMascota = prompt(`🐕 ¿Cómo se llama la mascota ${i + 1}? 🐕:`);
        if (nombreMascota === null) {
            mensajeDespedida();
            return false;
        }
        edadMascota = prompt(`📅 ¿Qué edad tiene ${nombreMascota} ? 📅:`);
        if (edadMascota === null) {
            mensajeDespedida();
            return false;
        }
        const mascota = { //Objeto literal como en los vídeos de la plataforma
            id: generarID(),
            idUsuario,
            nombreMascota,
            edadMascota
        };
        mascotas.push(mascota);

        // Turno y servicio para la mascota
        fechaTurno = prompt(`📅 Fecha del turno para ${nombreMascota} (dd/mm/aaaa) 📅`);
        if (fechaTurno === null) {
            mensajeDespedida();
            return false;
        }
        horaTurno = prompt(`🕒 Hora del turno para ${nombreMascota} (HH:MM) 🕒`);
        if (horaTurno === null) {
            mensajeDespedida();
            return false;
        }
        servicio = elegirServicio(nombreMascota);
        if (servicio === null) {
            mensajeDespedida();
            return false;
        }

        const turno = {
            id: generarTurnoID(), // Usar nueva función para ID de turnos 
            idMascota: mascota.id,
            fechaTurno,
            horaTurno,
            servicio
        };
        turnos.push(turno);
    }
    return true;
};

// Selección de servicio
const elegirServicio = (nombreMascota) => {
    let servicioElegido = null;
    while (servicioElegido === null) { //Primer while
        const opcionServicio = prompt(`¿Qué servicio deseás para ${nombreMascota}?\n1. 🛁Baño y Peinado\n2. 💉Vacunación\n3. 🪲Eliminación de Pulgas\nElige una opción:`);
        if (opcionServicio === null) {
            mensajeDespedida();
            return null;
        }
        switch (opcionServicio) { //Uso de switch
            case '1':
                servicioElegido = servicios[0];
                break;
            case '2':
                servicioElegido = servicios[1];
                break;
            case '3':
                servicioElegido = servicios[2];
                break;
            default:
                alert('😊 Tenés que poner 1, 2 o 3 😊'); //Validación rudimentaria, para segunda entrega se validará al nivel del curso.
        }
    }
    return servicioElegido;
};

// Menú principal y selección de opciones
const mostrarMenu = (idUsuario) => {
    const menu = `
🐾 Menú de la Veterinaria 🐾
1. 🐕 Dar de alta nueva mascota 🐕
2. 🐾 Ver turnos para las mascotas 🐾
3. 📅 Solicitar turno para tu mascota 📅
4. 📝 Modificar turno de tu mascota 📝
5. 🗑️ Eliminar turno de tu mascota 🗑️
6. 🖐️ Salir 🖐️
`;
    opcion = prompt(menu + '\n😊 Por favor elegí una de estas opciones: 1, 2, 3, 4, 5, 6 😊');
    if (opcion === null) {
        mensajeDespedida();
        return false;
    }

    switch (opcion) {
        case '1':
            return ingresoDatosMascotasYTurnos(idUsuario); // callbacks de vídeo Premium de la plataforma, lo uso en todo el código, ahorra mucho código
        case '2':
            mostrarMascotas(idUsuario);
            break;
        case '3':
            ingresarTurnos(idUsuario);
            break;
        case '4':
            modificarTurno(idUsuario);
            break;
        case '5':
            eliminarTurno(idUsuario);
            break;
        case '6':
            mensajeDespedida();
            return false;
        default:
            alert('😊 Por favor ingresá uno de los números de las opciones 😊');
            break;
    }
    return true;
};

// Mascotas del usuario
const mostrarMascotas = (idUsuario) => {
    const mascotasUsuario = []; //Mascotas por ID usuario actual
    for (const mascota of mascotas) {
        if (mascota.idUsuario === idUsuario) {
            mascotasUsuario.push(mascota);
        }
    }

    let datosAMostrar = '';
    for (let i = 0; i < mascotasUsuario.length; i++) {
        const mascotaDelUsuario = mascotasUsuario[i];
        const turno = turnos.find(turno => turno.idMascota === mascotaDelUsuario.id) || {}; // || {} para resolver que no quede el objeto vacío por error undefined se usa falsy y s
        if (turno.fechaTurno) {
            datosAMostrar += `Para ${mascotaDelUsuario.nombreMascota} tenés un turno el ${turno.fechaTurno} a las ${turno.horaTurno} para ${turno.servicio}\n`;
        }
    }
    alert(`Los turnos a tu nombre son:\n ${datosAMostrar}`);
};

// Turnos del usuario
const mostrarTurnos = (idUsuario) => {
    const turnosUsuario = [];

    for (const turno of turnos) { //Find turnos mascotas ID Usuario
        const mascotaDelUsuario = mascotas.find(mascotaDelUsuario => mascotaDelUsuario.id === turno.idMascota);
        if (mascotaDelUsuario && mascotaDelUsuario.idUsuario === idUsuario) {
            turnosUsuario.push(turno);
        }
    }

    let datosAMostrar = '';
    for (let i = 0; i < turnosUsuario.length; i++) {
        const turno = turnosUsuario[i];
        const mascotaDelUsuario = mascotas.find(mascotaDelUsuario => mascotaDelUsuario.id === turno.idMascota);
        datosAMostrar += `Para ${mascotaDelUsuario.nombreMascota} tenés el turno número *${turno.id}* el ${turno.fechaTurno} a las ${turno.horaTurno} para ${turno.servicio}\n`;
    }

    alert(`${nombreUsuario} los turnos a tu nombre son:\n ${datosAMostrar} y te vamos a avisar al número de teléfono ${telefonoUsuario}`);
};

// Modificar un turno
const modificarTurno = (idUsuario) => {
    mostrarTurnos(idUsuario);
    idTurno = prompt("📝 Ingresá número de turno que querés modificar: 📝");
    if (idTurno === null) {
        mensajeDespedida();
        return;
    }
    idTurno = parseInt(idTurno);
    const turno = turnos.find(turno => turno.id === idTurno);
    if (turno) {
        nuevaFecha = prompt("📅 Ingresá la nueva fecha (dd/mm/aaaa): 📅");
        if (nuevaFecha === null) {
            mensajeDespedida();
            return;
        }
        nuevaHora = prompt("🕒 Ingresá la nueva hora (HH:MM): 🕒");
        if (nuevaHora === null) {
            mensajeDespedida();
            return;
        }
        nuevoServicio = elegirServicio("la mascota");
        if (nuevoServicio === null) {
            mensajeDespedida();
            return;
        }

        turno.fechaTurno = nuevaFecha;
        turno.horaTurno = nuevaHora;
        turno.servicio = nuevoServicio;
        alert("😊 📝 El turno fue modificado 😊 📝");
    } else {
        alert("😊 El número de turno no fue encontrado, por favor revisá tu respuesta 😊");
    }
};

// Eliminar un turno
const eliminarTurno = (idUsuario) => {
    mostrarTurnos(idUsuario);
    idTurno = prompt("🗑️ Ingresá número del turno que querés eliminar: 🗑️");
    if (idTurno === null) {
        alert("Cancelaste la eliminación del turno, volvemos al menú");
        return;
    }
    idTurno = parseInt(idTurno);
    const index = turnos.findIndex(turno => turno.id === idTurno);
    if (index !== -1) { //if not true
        turnos.splice(index, 1);
        alert("🗑️ Tu turno fue eliminado con éxito 🗑️");
    } else {
        alert("😊 Oops! hubo un error en el número de turno que ingresaste no fue encontrado 😊");
    }
};

// Inicio del programa - Ciclo del menú del usuario
const idUsuario = ingresarDatosUsuario();
if (idUsuario !== null) { //if not true
    const continuar = ingresoDatosMascotasYTurnos(idUsuario);
    if (continuar) {
        let seguir = mostrarMenu(idUsuario);
        while (seguir) {
            seguir = mostrarMenu(idUsuario); //Si continuar true Mostrar Menú principal
        }
    }
}
