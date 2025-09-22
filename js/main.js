fetch('data/servicios.json')
  .then(r => r.json())
  .then(servicios => {
    const select = document.getElementById("servicio");
    servicios.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.nombre;
      opt.textContent = `${s.nombre} - $${s.precio}`;
      select.appendChild(opt);
    });
  })
  .catch(err => console.error("Error cargando servicios:", err));


// Recuperar turnos de LocalStorage o iniciar vacío
let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

// Referencias al DOM
const formTurno = document.getElementById("formTurno");
const listaTurnos = document.getElementById("lista-turnos");
const btnVaciar = document.getElementById("btnVaciar");
const mensaje = document.getElementById("mensaje");

// Renderizar turnos en la UI
function mostrarTurnos() {
  listaTurnos.innerHTML = "";

  if (turnos.length === 0) {
    listaTurnos.innerHTML = `<li class="list-group-item text-muted">No hay turnos reservados.</li>`;
    return;
  }

  turnos.forEach((turno, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    // Texto del turno
    const span = document.createElement("span");
    span.textContent = `${turno.nombre} - ${turno.dia} - ${turno.hora} - ${turno.servicio}`;

    // Botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn btn-sm btn-outline-danger";
    btnEliminar.textContent = "Eliminar";

    btnEliminar.addEventListener("click", () => {
      eliminarTurno(index);
    });

    li.appendChild(span);
    li.appendChild(btnEliminar);
    listaTurnos.appendChild(li);
  });
}

// Guardar en LocalStorage
function guardarTurnos() {
  localStorage.setItem("turnos", JSON.stringify(turnos));
}

// Eliminar un turno específico
function eliminarTurno(indice) {
  turnos.splice(indice, 1);
  guardarTurnos();
  mostrarTurnos();
  mensaje.textContent = "🗑️ Turno eliminado correctamente.";
  mensaje.className = "error";
}

// Reservar turno (submit)
formTurno.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const dia = document.getElementById("dia").value;
  const hora = document.getElementById("hora").value;
  const servicio = document.getElementById("servicio").value;

  // Validación en DOM (sin consola)
  if (!nombre || !dia || !hora || !servicio) {
    mensaje.textContent = "⚠️ Complete todos los campos.";
    mensaje.className = "error";
    return;
  }

  const existe = turnos.find((t) => t.dia === dia && t.hora === hora);
  if (existe) {
    mensaje.textContent = `❌ El turno del ${dia} a las ${hora} ya está ocupado.`;
    mensaje.className = "error";
    return;
  }

  const nuevoTurno = { nombre, dia, hora, servicio };
  turnos.push(nuevoTurno);
  guardarTurnos();
  mostrarTurnos();

  mensaje.textContent = `✅ Turno confirmado para ${nombre} el ${dia} a las ${hora} (${servicio}).`;
  mensaje.className = "success";

  formTurno.reset();
});

// Vaciar turnos
btnVaciar.addEventListener("click", () => {
  turnos = [];
  guardarTurnos();
  mostrarTurnos();
  mensaje.textContent = "🗑️ Todos los turnos fueron eliminados.";
  mensaje.className = "error";
});

// Render inicial
mostrarTurnos();
