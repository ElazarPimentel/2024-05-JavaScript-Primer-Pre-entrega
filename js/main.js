// Nombre del archivo: main.js
// Alessio Aguirre Pimentel

let idCounter = 0;

// Array para almacenar los datos del usuario, mascotas y turnos
const usuarios = [];
const mascotas = [];
const turnos = [];

// Función para mostrar mensajes en la consola
const mensajeConsola = (mensaje) => console.log(mensaje);

// Función para mostrar mensaje de despedida
const mensajeDespedida = () => console.log('Gracias y hasta luego 🖐️');

// Función para generar IDs únicos
const generarID = () => ++idCounter;

// Bienvenida e ingreso de datos de usuario
const capturarDatosUsuario = () => {
    mensajeConsola('\n\n\n\n\n\n\n\n\n\n_\n\n');
    mensajeConsola("🐶 ¡Bienvenido a la Veterinaria Felina! 🐱");
    const nombreUsuario = prompt("👤 Hola, ¿cómo te llamás?:");
    if (nombreUsuario === null) {
        mensajeDespedida();
        return null;
    }
    const telefonoUsuario = prompt("📞 Por favor, ingresá tu teléfono:");
    if (telefonoUsuario === null) {
        mensajeDespedida();
        return null;
    }
    const usuario = {
        id: generarID(),
        nombre: nombreUsuario,
        telefono: telefonoUsuario
    };
    usuarios.push(usuario);
    return usuario.id;
};

// Ingreso datos de mascotas
const capturarDatosMascotas = (idUsuario) => {
    const cantidadMascotas = parseInt(prompt("🐾 ¿Cuántas mascotas querés llevar a la veterinaria?"));
    if (isNaN(cantidadMascotas)) {
        mensajeConsola("Pusiste una cantidad de mascotas no válida 😊");
        return;
    }
    for (let i = 0; i < cantidadMascotas; i++) {
        const nombreMascota = prompt(`🐕 Ingresá el nombre de la mascota ${i + 1}:`);
        if (nombreMascota === null) {
            mensajeDespedida();
            return;
        }
        const edadMascota = prompt(`📅 Ingresá la edad de ${nombreMascota}:`);
        if (edadMascota === null) {
            mensajeDespedida();
            return;
        }
        const mascota = {
            id: generarID(),
            idUsuario,
            nombre: nombreMascota,
            edad: edadMascota
        };
        mascotas.push(mascota);
    }
};

// Turnos para cada mascota
const capturarTurnos = (idUsuario) => {
    mascotas.forEach(mascota => {
        if (mascota.idUsuario === idUsuario) {
            const servicio = elegirServicio(mascota.nombre);
            if (servicio === null) {
                mensajeDespedida();
                return;
            }
            const fechaTurno = prompt(`📅 Ingresá la fecha del turno para ${mascota.nombre} (dd/mm/aaaa):`);
            if (fechaTurno === null) {
                mensajeDespedida();
                return;
            }
            const horaTurno = prompt(`🕒 Ingresá la hora del turno para ${mascota.nombre} (HH:MM):`);
            if (horaTurno === null) {
                mensajeDespedida();
                return;
            }
            const turno = {
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

// Elegir el servicio
const elegirServicio = (nombreMascota) => {
    const servicios = ["Baño y Peinado", "Vacunación", "Eliminación de Pulgas"];
    let servicioElegido = null;
    while (servicioElegido === null) {
        const opcionServicio = prompt(`🛁 ¿Qué servicio necesita ${nombreMascota}?\n1. Baño y Peinado\n2. Vacunación\n3. Eliminación de Pulgas\nElige una opción:`);
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
                mensajeConsola('Tenés que poner 1, 2 o 3 😊');
        }
    }
    return servicioElegido;
};

// El menú y manejar la interacción del usuario
const mostrarMenu = () => {
    mensajeConsola('🐾 Menú de la Veterinaria 🐾');
    mensajeConsola('1. Dar de alta nueva mascota 🐕');
    mensajeConsola('2. Ver mascotas ingresadas 🐾');
    mensajeConsola('3. Solicitar turno para una mascota 📅');
    mensajeConsola('4. Modificar turno de una mascota 📝');
    mensajeConsola('5. Eliminar turno de una mascota 🗑️');
    mensajeConsola('6. Salir 🖐️');
};

// Simulación de la interacción
const idUsuario = capturarDatosUsuario();
if (idUsuario) {
    capturarDatosMascotas(idUsuario);
    capturarTurnos(idUsuario);

    let opcion = '';
    while (opcion !== '6') {
        mensajeConsola('\n\n\n\n\n\n\n\n\n\n');
        mostrarMenu();
        opcion = prompt('Elige una opción: 1, 2, 3, 4, 5, 6');
        if (opcion === null) {
            mensajeDespedida();
            break;
        }
        switch (opcion) {
            case '1':
                capturarDatosMascotas(idUsuario);
                break;
            case '2':
                // Mostrar datos de las mascotas
                mascotas.forEach(mascota => {
                    if (mascota.idUsuario === idUsuario) {
                        mensajeConsola(`Nombre: ${mascota.nombre}, Edad: ${mascota.edad}`);
                    }
                });
                break;
            case '3':
                capturarTurnos(idUsuario);
                break;
            case '4':
                // Modificar un turno
                const idTurno = prompt("Ingresá el ID del turno que querés modificar:");
                const turno = turnos.find(t => t.id === idTurno && t.idUsuario === idUsuario);
                if (turno) {
                    const nuevaFecha = prompt("Ingresá la nueva fecha (dd/mm/aaaa):");
                    turno.fecha = nuevaFecha;
                    mensajeConsola("Turno modificado");
                } else {
                    mensajeConsola("Turno no encontrado");
                }
                break;
            case '5':
                // Eliminar un turno
                const idEliminar = prompt("Ingresá el ID del turno que querés eliminar:");
                const index = turnos.findIndex(t => t.id === idEliminar && t.idUsuario === idUsuario);
                if (index !== -1) {
                    turnos.splice(index, 1);
                    mensajeConsola("Turno eliminado");
                } else {
                    mensajeConsola("Turno no encontrado");
                }
                break;
            case '6':
                mensajeDespedida();
                break;
            default:
                mensajeConsola('Opción no válida 😊');
                break;
        }
    }
    mensajeConsola('Programa terminado 🖐️🖐️');
}
