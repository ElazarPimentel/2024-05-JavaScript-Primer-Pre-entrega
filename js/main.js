// Nombre del archivo: main.js
// Alessio Aguirre Pimentel
// v9

// Inicialización  arrays vacíos
const usuarios = [],
    mascotas = [],
    turnos = [];

// Inicialización  arrays con datos
const servicios = ['Baño y Peinado', 'Vacunación', 'Eliminación de Pulgas'];

// Inicialización  variables numéricas
let idCounter = 0,
    idTurnoCounter = 0;

// Inicialización  variables de texto
let servicio = '',
    nombreUsuario = '',
    telefonoUsuario = '',
    nombreMascota = '',
    edadMascota = '',
    fechaTurno = '',
    horaTurno = '',
    opcion = '',
    nuevaFecha = "",
    nuevaHora = '',
    nuevoServicio = '';

// Función mensaje despedida
const mensajeDespedida = () => alert('🖐️ Gracias y hasta luego 🖐️'); // Función arrow. En una reciente capacitación nos dijeron que la gente ama emojis. Función creada dado que el mensaje se repite varias veces en el código.

// Función que genera ID's unívocos
const generarID = () => idCounter++;
const generarTurnoID = () => idTurnoCounter++; //Para que en el menú no pe aparezcan opciones con números faltantes por UX

// Bienvenida e ingreso de datos. Se llama del bucle de control de todo el programa al final del código.
function ingresarDatosUsuario() { //Funcion declarativa
    nombreUsuario = prompt('🐶 ¡Bienvenido a la Veterinaria Pata-pata-gonica! 🐱\n👤 Hola, ¿cómo te llamás? 👤:');
    if (nombreUsuario === null) {
        mensajeDespedida();
        return null;
    }
    telefonoUsuario = prompt('📞 Por favor, ingresá tu teléfono 📞:');
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

// Ingreso datos de mascotas y turons
const registrarMascotasYTurnos = (idUsuario) => { //Función anónima - Se pasa funciń como parámetroo
    const cantidadNuevaMascotas = prompt('🐾 ¿Cuántas mascotas querés traer a la veterinaria? 🐾');
    if (cantidadNuevaMascotas === null) {
        mensajeDespedida();
        return false; // Cambiado a false para detener el programa porque seguía de largo.
    }
    if (isNaN(parseInt(cantidadNuevaMascotas))) {
        alert('😊 por favor usá un número válido de mascotas 😊');
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
        const mascota = { //Objeto literal
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
            id: generarTurnoID(),
            idMascota: mascota.id,
            fechaTurno,
            horaTurno,
            servicio
            //debugged +2 console.log(mascota.id)
        };
        turnos.push(turno);

    }
    return true;


    //debugged +2 console.log()
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
                alert('😊 Tenés que poner 1, 2 o 3 😊');
        }
    }
    return servicioElegido;
};

// Menú principal y selección de opciones
const mostrarMenuPrincipal = (idUsuario) => {
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
            return registrarMascotasYTurnos(idUsuario);
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
        const turno = turnos.find(turno => turno.idMascota === mascotaDelUsuario.id) || {}; // || {} para resolver que no quede el objeto vacío por error undefined se usa falsy 
        if (turno.fechaTurno) {
            datosAMostrar += `Para ${mascotaDelUsuario.nombreMascota} tenés un turno el ${turno.fechaTurno} a las ${turno.horaTurno} para ${turno.servicio}\n Te vamos a avisar al número de teléfono ${telefonoUsuario}`;
        }
    }
    alert(`Los turnos a tu nombre son:\n ${datosAMostrar}`);
};

// Turnos usuario
const mostrarTurnos = (idUsuario) => {
    const turnosUsuario = []; //scope

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
        datosAMostrar += `Para ${mascotaDelUsuario.nombreMascota} tenés el turno número *${turno.id + 1}* el ${turno.fechaTurno} a las ${turno.horaTurno} para ${turno.servicio}\n`; //turno.id + 1 para evitar que el usuario vea turno cero, solo en output, interno igual valor
    }

    alert(`${nombreUsuario} los turnos a tu nombre son:\n ${datosAMostrar} y te vamos a avisar al número de teléfono ${telefonoUsuario}`);
};

// Modificar un turno
const modificarTurno = (idUsuario) => {
    mostrarTurnos(idUsuario);
    let idTurno = prompt('📝 Ingresá número de turno que querés modificar: 📝'); // Modificado: idTurno se quejaba que no estaba inicializado
    if (idTurno === null) {
        mensajeDespedida();
        return;
    }
    idTurno = parseInt(idTurno) - 1; // - 1 para respetar valor real
    const turno = turnos.find(turno => turno.id === idTurno);
    if (turno) {
        nuevaFecha = prompt('📅 Ingresá la nueva fecha (dd/mm/aaaa): 📅');
        if (nuevaFecha === null) {
            mensajeDespedida();
            return;
        }
        nuevaHora = prompt('🕒 Ingresá la nueva hora (HH:MM): 🕒');
        if (nuevaHora === null) {
            mensajeDespedida();
            return;
        }
        nuevoServicio = elegirServicio('la mascota');
        if (nuevoServicio === null) {
            mensajeDespedida();
            return;
        }

        turno.fechaTurno = nuevaFecha;
        turno.horaTurno = nuevaHora;
        turno.servicio = nuevoServicio;
        alert('😊 📝 El turno fue modificado 😊 📝');
    } else {
        alert('😊 El número de turno no fue encontrado, por favor revisá tu respuesta 😊');
    }
};

// Eliminar un turno
const eliminarTurno = (idUsuario) => {
    mostrarTurnos(idUsuario);
    let idTurno = prompt('🗑️ Ingresá número del turno que querés eliminar: 🗑️');
    if (idTurno === null) {
        alert('Cancelaste la eliminación del turno, volvemos al menú');
        return;
    }
    idTurno = parseInt(idTurno) - 1; // Resta 1 para ajustar el índice
    const index = turnos.findIndex(turno => turno.id === idTurno);
    if (index !== -1) { //if not true
        turnos.splice(index, 1);
        alert('🗑️ Tu turno fue eliminado con éxito 🗑️');
    } else {
        alert('😊 Oops! hubo un error en el número de turno que ingresaste no fue encontrado 😊');
    }
};


// Inicio del programa - Ciclo del menú del usuario
const idUsuario = ingresarDatosUsuario();
if (idUsuario !== null) { //if not true
    const continuar = registrarMascotasYTurnos(idUsuario); //Tengo dudas de ésto, en algunos foros le dicen callback en otros dice que no. Luego les pregunto si son tan amables. 
    if (continuar) {
        let seguir = mostrarMenuPrincipal(idUsuario);
        while (seguir) {
            seguir = mostrarMenuPrincipal(idUsuario); //Si continuar true Mostrar Menú principal 
        }
    }
}
