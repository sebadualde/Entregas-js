let turnos = [];

function elegirServicio() {
  let servicios = ["Corte de pelo", "Peinado", "Coloración"];
  let mensaje = "Selecciona un servicio:\n";
  servicios.forEach((servicio, index) => {
    mensaje += `${index + 1}. ${servicio}\n`;
  });

  let opcion = parseInt(prompt(mensaje));

  if (opcion >= 1 && opcion <= servicios.length) {
    let servicioSeleccionado = servicios[opcion - 1];
    console.log(`Servicio seleccionado: ${servicioSeleccionado}`);
    return servicioSeleccionado;
  } else {
    alert("Opción no válida. Intenta de nuevo.");
    return elegirServicio();
  }
}

function reservarTurno() {
  let nombre = prompt("Ingrese su nombre:");
  let dia = prompt("Ingrese el día del turno (ejemplo: lunes):");
  let hora = prompt("Ingrese la hora del turno (formato 00 a 23):");

  if (isNaN(hora) || hora < 9 || hora > 18) {
    alert("Hora no válida. Intente nuevamente.");
    console.log("Entrada de hora inválida.");
    return;
  }

  let servicioElegido = elegirServicio();

  verificarDisponibilidad(nombre, dia.toLowerCase(), `${hora}:9`, servicioElegido);
}

function verificarDisponibilidad(nombre, dia, hora, servicio) {
  let turnoExistente = turnos.find(
    (turno) => turno.dia === dia && turno.hora === hora
  );

  if (turnoExistente) {
    alert(`El turno del ${dia} a las ${hora} ya está reservado. Intente otro.`);
    console.log(`Turno ocupado: ${dia} a las ${hora}`);
  } else {
    let confirmar = confirm(`¿Deseás reservar el turno para ${nombre} el ${dia} a las ${hora} para ${servicio}?`);
    if (confirmar) {
      let nuevoTurno = {
        nombre: nombre,
        dia: dia,
        hora: hora,
        servicio: servicio
      };
      turnos.push(nuevoTurno);
      alert(`✅ Turno confirmado para ${nombre} el ${dia} a las ${hora} para ${servicio}.`);
      console.log("Turno reservado:", nuevoTurno);
    } else {
      alert("Reserva cancelada.");
      console.log("Reserva cancelada por el usuario.");
    }
  }
}

function mostrarTurnos() {
  if (turnos.length === 0) {
    alert("No hay turnos reservados.");
    console.log("No hay turnos para mostrar.");
  } else {
    let mensaje = "Turnos reservados:\n";
    console.log("Listado de turnos reservados:");
    turnos.forEach((turno, index) => {
      let linea = `${index + 1}. ${turno.nombre} - ${turno.dia} - ${turno.hora} - ${turno.servicio}`;
      mensaje += `${linea}\n`;
      console.log(linea);
    });
    alert(mensaje);
  }
}

// Menú principal
let salir = false;
while (!salir) {
  let opcion = prompt("Bienvenido al sistema de turnos.\n1. Reservar turno\n2. Ver turnos reservados\n3. Salir");
  switch (opcion) {
    case "1":
      console.log("=== Reservar nuevo turno ===");
      reservarTurno();
      break;
    case "2":
      console.log("=== Mostrar turnos reservados ===");
      mostrarTurnos();
      break;
    case "3":
      console.log("=== Salir del sistema ===");
      salir = true;
      break;
    default:
      alert("Opción no válida.");
      console.log("Opción inválida seleccionada.");
  }
}
