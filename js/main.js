// Nombre del archivo: main.js
// Alessio Aguirre Pimentel

// Inicialización de variables y arrays
const usuarios = [];
const mascotas = [];
const turnos = [];
let idCounter = 0;
const servicios = ["Baño y Peinado", "Vacunación", "Eliminación de Pulgas"];

// Función mensajes consola
const mensajeConsola = (mensaje) => console.log(mensaje);

// Función mensaje despedida
const mensajeDespedida = () => console.log('Gracias y hasta luego 🖐️');

// Función IDs unívocos
const generarID = () => `_${idCounter++}`;

// Bienvenida e ingreso de datos
const ingresarDatosUsuario = () => {
    mensajeConsola('\n\n\n\n\n\n\n\n\n\n_\n\n');
    mensajeConsola("🐶 ¡Bienvenido a la Veterinaria Felina! 🐱");
    const nombreUsuario = prompt("👤 Hola, ¿cómo te llamás? 👤:");
    if (nombreUsuario === null) {
        mensajeDespedida();
        return null;
    }
    const telefonoUsuario = prompt("📞 Por favor, ingresá tu teléfono 📞:");
    if (telefonoUsuario === null) {
        mensajeDespedida();
        return null;
    }
    const usuario = { // Primer objeto literal
        id: generarID(),
        nombre: nombreUsuario,
        telefono: telefonoUsuario
    };
    usuarios.push(usuario);
    return usuario.id;
};

// Ingreso de datos de las mascotas
const ingresoDatosMascotas = (idUsuario) => {
    const cantidadMascotas = parseInt(prompt("🐾 ¿Cuántas mascotas querés llevar a la veterinaria?"));
    if (isNaN(cantidadMascotas)) {
        mensajeConsola("😊 Pusiste una cantidad de mascotas no válida 😊");
        return;
    }
    for (let i = 0; i < cantidadMascotas; i++) {
        const nombreMascota = prompt(`🐕 Ingresá el nombre de la mascota ${i + 1} 🐕:`);
        if (nombreMascota === null) {
            mensajeDespedida();
            return;
        }
        const edadMascota = prompt(`📅 Ingresá la edad de ${nombreMascota} 📅:`);
        if (edadMascota === null) {
            mensajeDespedida();
            return;
        }
        const mascota = { // Crear objeto literal mascota
            id: generarID(),
            idUsuario,
            nombre: nombreMascota,
            edad: edadMascota
        };
        mascotas.push(mascota);
    }
};

// Registro de turnos para cada mascota
const ingresarTurnos = (idUsuario) => {
    mascotas.forEach(mascota => {
        if (mascota.idUsuario === idUsuario) {
            const servicio = elegirServicio(mascota.nombre);
            if (servicio === null) {
                mensajeDespedida();
                return;
            }
            const fechaTurno = prompt(`📅 Ingresá la fecha del turno para ${mascota.nombre} (dd/mm/aaaa)📅:`);
            if (fechaTurno === null) {
                mensajeDespedida();
                return;
            }
            const horaTurno = prompt(`🕒 Ingresá la hora del turno para ${mascota.nombre} (HH:MM) 🕒:`);
            if (horaTurno === null) {
                mensajeDespedida();
                return;
            }
            const turno = { // Crear objeto literal turno
                id: generarID(),
                idMascota: mascota.id,
                fecha: fechaTurno,
                hora: horaTurno,
                servicio
            };
            turnos.push(turno);
        }
    });
};

// Elije el servicio el usuario
const elegirServicio = (nombreMascota) => {
    let servicioElegido = null;
    while (servicioElegido === null) {
        const opcionServicio = prompt(`¿Qué servicio necesita ${nombreMascota}?\n1. 🛁Baño y Peinado\n2. 💉Vacunación\n3. 🪲Eliminación de Pulgas\nElige una opción:`);
        if (opcionServicio === null) {
            return null;
        }
        switch (opcionServicio) {
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
                mensajeConsola('😊 Tenés que poner 1, 2 o 3 😊');
        }
    }
    return servicioElegido;
};

// Menú y selección de opción por parte del usuario
const mostrarMenu = () => {
    mensajeConsola('🐾 Menú de la Veterinaria 🐾');
    mensajeConsola('1. 🐕 Dar de alta nueva mascota 🐕');
    mensajeConsola('2. 🐾 Ver mascotas ingresadas 🐾');
    mensajeConsola('3. 📅 Solicitar turno para una mascota 📅');
    mensajeConsola('4. 📝 Modificar turno de una mascota 📝');
    mensajeConsola('5. 🗑️ Eliminar turno de una mascota 🗑️');
    mensajeConsola('6. 🖐️ Salir 🖐️');
};

// Mascotas del usuario
const mostrarMascotas = (idUsuario) => {
    const mascotasUsuario = [];
    for (const mascota of mascotas) {
        if (mascota.idUsuario === idUsuario) {
            mascotasUsuario.push(mascota);
        }
    }
    const datosAMostrar = mascotasUsuario.map(mascota => {
        const turno = turnos.find(turno => turno.idMascota === mascota.id) || {};
        return {
            nombre: mascota.nombre,
            edad: mascota.edad,
            fechaTurno: turno.fecha || 'No asignado',
            servicio: turno.servicio || 'No asignado'
        };
    });
    console.table(datosAMostrar);
};

// Turnos del usuario
const mostrarTurnos = (idUsuario) => {
    const turnosUsuario = [];
    for (const turno of turnos) {
        const mascota = mascotas.find(m => m.id === turno.idMascota);
        if (mascota && mascota.idUsuario === idUsuario) {
            turnosUsuario.push(turno);
        }
    }

    const datosAMostrar = turnosUsuario.map(turno => {
        const mascota = mascotas.find(m => m.id === turno.idMascota);
        return {
            nombreMascota: mascota.nombre,
            fecha: turno.fecha,
            hora: turno.hora,
            servicio: turno.servicio
        };
    });

    console.table(datosAMostrar);
};

// Modificar un turno
const modificarTurno = (idUsuario) => {
    mostrarTurnos(idUsuario);
    const idTurno = prompt("📝 Ingresá el ID del turno que querés modificar: 📝");
    if (idTurno === null) {
        mensajeDespedida();
        return;
    }
    const turno = turnos.find(t => t.id === idTurno);
    if (turno) {
        const nuevaFecha = prompt("📅 Ingresá la nueva fecha (dd/mm/aaaa): 📅");
        if (nuevaFecha === null) {
            mensajeDespedida();
            return;
        }
        const nuevaHora = prompt("🕒 Ingresá la nueva hora (HH:MM): 🕒");
        if (nuevaHora === null) {
            mensajeDespedida();
            return;
        }
        const nuevoServicio = elegirServicio("la mascota");
        if (nuevoServicio === null) {
            mensajeDespedida();
            return;
        }
        turno.fecha = nuevaFecha;
        turno.hora = nuevaHora;
        turno.servicio = nuevoServicio;
        mensajeConsola("😊 📝 Turno modificado 😊 📝");
    } else {
        mensajeConsola("😊 Turno no encontrado, por favor revisá tu respuesta 😊");
    }
};

// Eliminar un turno
const eliminarTurno = (idUsuario) => {
    mostrarTurnos(idUsuario);
    const idTurno = prompt("🗑️ Ingresá el ID del turno que querés eliminar: 🗑️");
    if (idTurno === null) {
        mensajeDespedida();
        return;
    }
    const index = turnos.findIndex(t => t.id === idTurno);
    if (index !== -1) {
        turnos.splice(index, 1);
        mensajeConsola("🗑️ Turno eliminado correctamente 🗑️");
    } else {
        mensajeConsola("😊 Oops! hubo un error en el número que ingresaste 😊");
    }
};

// Ciclo del menú del usuario
const idUsuario = ingresarDatosUsuario();
if (idUsuario) {
    ingresoDatosMascotas(idUsuario);
    ingresarTurnos(idUsuario);

    let opcion = '';
    while (opcion !== '6') {
        mensajeConsola('\n\n\n\n\n\n\n\n\n\n');
        mostrarMenu();
        opcion = prompt('😊 Por favor elegí una de éstas opciones: 1, 2, 3, 4, 5, 6 😊');
        if (opcion === null) {
            mensajeDespedida();
            break;
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
                break;
            default:
                mensajeConsola('😊 Por favor ingresá uno de los números de las opciones 😊');
                break;
        }
    }
    mensajeConsola('🖐️🖐️Gracias y hasta luego 🖐️🖐️');
}
