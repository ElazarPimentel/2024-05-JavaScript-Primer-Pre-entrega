// Nombre del archivo: main.js
// Alessio Aguirre Pimentel

// Inicialización constantes y arrays
const usuarios = [];
const mascotas = [];
const turnos = [];
const servicios = ["Baño y Peinado", "Vacunación", "Eliminación de Pulgas"];

// Inicialización de variables
let idCounter = 0;
let cantidadMascotas = 0;
let servicio = "";
let nombreUsuario = "";
let telefonoUsuario = "";
let nombreMascota = "";
let edadMascota = "";
let fechaTurno = "";
let horaTurno = "";
let opcion = "";
let idTurno = "";
let nuevaFecha = "";
let nuevaHora = "";
let nuevoServicio = "";

// Función mensaje despedida
const mensajeDespedida = () => alert('🖐️ Gracias y hasta luego 🖐️'); // Función arrow. Aparte, en una reciente capacitación nos dijeron que la gente ama emojies.

// Función que genera ID's unívocos
const generarID = () => idCounter++;

// Bienvenida e ingreso de datos
function ingresarDatosUsuario() { //Función Declarada
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
    const usuario = { // Objeto literal
        id: generarID(), // Generación de ID para usuario
        nombre: nombreUsuario,
        telefono: telefonoUsuario
    };
    usuarios.push(usuario); // Agregamos los datos

    return usuario.id; //retorna el ID para que 
}

// Ingreso de datos de las mascotas
const ingresoDatosMascotas = (idUsuario) => {
    cantidadMascotas = parseInt(prompt("🐾 ¿Cuántas mascotas querés llevar a la veterinaria?🐾"));
    if (isNaN(cantidadMascotas)) {
        alert("😊 por favor usá un número válido de mascotas 😊");
        return;
    }
    for (let i = 0; i < cantidadMascotas; i++) { //Primer uso de for con i como dijo el profe en el vídeo
        nombreMascota = prompt(`🐕 Ingresá el nombre de la mascota ${i + 1} 🐕:`); //Para la hermosa gente que comenzó a contar desde cero.
        if (nombreMascota === null) {
            mensajeDespedida();
            return;
        }
        edadMascota = prompt(`📅 Ingresá la edad de ${nombreMascota} 📅:`);
        if (edadMascota === null) {
            mensajeDespedida();
            return;
        }
        const mascota = {
            id: generarID(), // Generamos ID para cada mascota
            idUsuario,
            nombre: nombreMascota,
            edad: edadMascota
        };
        mascotas.push(mascota); //Inicializado arriba, el scope supera ingresoDatosMascotas
    }
};

// Registro de turnos para cada mascota
const ingresarTurnos = (idUsuario) => {
    for (let i = 0; i < mascotas.length; i++) {
        const mascota = mascotas[i];
        if (mascota.idUsuario === idUsuario) {
            servicio = elegirServicio(mascota.nombre);
            if (servicio === null) {
                mensajeDespedida();
                return;
            }
            fechaTurno = prompt(`📅Ingresá fecha del turno para ${mascota.nombre} (dd/mm/aaaa)📅`);
            if (fechaTurno === null) {
                mensajeDespedida();
                return;
            }
            horaTurno = prompt(`🕒Ingresá hora del turno para ${mascota.nombre} (HH:MM) 🕒`);
            if (horaTurno === null) {
                mensajeDespedida();
                return;
            }
            const turno = { // Guardamos los prompt del usuario en un objeto literal
                id: generarID(), //Llamamos a generar ID para cada turno
                idMascota: mascota.id,
                fecha: fechaTurno,
                hora: horaTurno,
                servicio
            };
            turnos.push(turno);
        }
    }
};

// Elije el servicio el usuario
const elegirServicio = (nombreMascota) => {
    let servicioElegido = null;
    while (servicioElegido === null) {
        const opcionServicio = prompt(`¿Qué servicio deseás ${nombreMascota}?\n1. 🛁Baño y Peinado\n2. 💉Vacunación\n3. 🪲Eliminación de Pulgas\nElige una opción:`);
        if (opcionServicio === null) {
            return null;
        }
        switch (opcionServicio) { // Usamos el valor de ésta variable como índice de servicios para opciones. 
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
                alert('😊 Tenés que poner 1, 2 o 3 😊');
        }
    }
    return servicioElegido;
};

// Menú y selección de opción por parte del usuario
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
        return false; // Salió del menu, presinó cancelar
    }

    switch (opcion) {
        case '1':
            ingresoDatosMascotas(idUsuario);
            break;
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
            return false; // Salir.
        default:
            alert('😊 Por favor ingresá uno de los números de las opciones 😊');
            break;
    }
    return true; // Continuar mostrando el menú de opciones
};

// Mascotas del usuario
const mostrarMascotas = (idUsuario) => {
    const mascotasUsuario = [];
    for (const mascota of mascotas) {
        if (mascota.idUsuario === idUsuario) {
            mascotasUsuario.push(mascota);
        }
    }
    let datosAMostrar = ''; // Inicialización de variable para concatenar strings
    for (let i = 0; i < mascotasUsuario.length; i++) {
        const mascotaDelUsuario = mascotasUsuario[i];
        const turno = turnos.find(turno => turno.idMascota === mascotaDelUsuario.id) || {};
        datosAMostrar += `Para ${mascotaDelUsuario.nombre} tenés un turno el ${turno.fecha} a las ${turno.hora} para un ${turno.servicio}\n`;
    }
    alert('Los turnos a tu nombre son ' + datosAMostrar);
};

// Turnos del usuario
const mostrarTurnos = (idUsuario) => {
    const turnosUsuario = [];
    for (const turno of turnos) {
        const mascotaDelUsuario = mascotas.find(mascotaDelUsuario => mascotaDelUsuario.id === turno.idMascota);
        if (mascotaDelUsuario && mascotaDelUsuario.idUsuario === idUsuario) {
            turnosUsuario.push(turno);
        }
    }

    let datosAMostrar = ''; // Inicialización de variable para concatenar strings
    for (let i = 0; i < turnosUsuario.length; i++) {
        const turno = turnosUsuario[i];
        const mascotaDelUsuario = mascotas.find(mascotaDelUsuario => mascotaDelUsuario.id === turno.idMascota);
        datosAMostrar += `Para ${mascotaDelUsuario.nombre} tenés un turno número ${mascotaDelUsuario.id} el ${turno.fecha} a las ${turno.hora} para un ${turno.servicio}\n`;
    }

    alert('Los turnos a tu nombre son\n ' + datosAMostrar);
};

// Modificar un turno
const modificarTurno = (idUsuario) => {
    mostrarTurnos(idUsuario);
    idTurno = prompt("📝 Ingresá número de turno que querés modificar: 📝");
    if (idTurno === null) {
        mensajeDespedida();
        return;
    }
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

        turno.fecha = nuevaFecha; //Nop-si
        turno.hora = nuevaHora;
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
        mensajeDespedida();
        return;
    }
    const index = turnos.findIndex(turno => turno.id === idTurno);
    if (index !== -1) {
        turnos.splice(index, 1);
        alert("🗑️ Tu turno fue eliminado con éxito 🗑️");
    } else {
        alert("😊 Oops! hubo un error en el número de turno que ingresaste no fue encontrado 😊");
    }
};

// Inicio del programa - Ciclo del menú del usuario
const idUsuario = ingresarDatosUsuario(); // Traemos el ID del usuario y llenamos el objeto literal del usuario
if (idUsuario !== null) { //si no puse cancelar
    ingresoDatosMascotas(idUsuario); // Llenamos los datos de las mascotitas pasando el ID del usuario. 
    ingresarTurnos(idUsuario); // llenamos los datos referente a la fecha y hora mandamos el ID del usuario. 

    //No usamos while true ;)
    continuar = mostrarMenu(idUsuario); //  Para no forzar un while true que un profe en la facu me traumatizó
    while (continuar) { // while true 
        continuar = mostrarMenu(idUsuario); // Controla el flujo en función de la elección del usuario o si decide salir.
    }
}
