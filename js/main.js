// Recuperar turnos de LocalStorage o iniciar vacío
let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
console.log("🔄 Cargando turnos desde LocalStorage:", turnos);

// Referencias al DOM
const formTurno = document.getElementById("formTurno");
const listaTurnos = document.getElementById("lista-turnos");
const btnVaciar = document.getElementById("btnVaciar");
const mensaje = document.getElementById("mensaje");

// Renderizar turnos
function mostrarTurnos() {
  listaTurnos.innerHTML = "";

  console.log("📋 Turnos actuales en memoria:", turnos);

  if (turnos.length === 0) {
    listaTurnos.innerHTML = `<li class="list-group-item text-muted">No hay turnos reservados.</li>`;
    return;
  }

  turnos.forEach((turno, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${turno.nombre} - ${turno.dia} - ${turno.hora} - ${turno.servicio}`;
    listaTurnos.appendChild(li);
    console.log(`➡️ Renderizando turno #${index + 1}:`, turno);
  });
}

// Guardar en LocalStorage
function guardarTurnos() {
  localStorage.setItem("turnos", JSON.stringify(turnos));
  console.log("💾 Turnos guardados en LocalStorage:", turnos);
}

// Reservar turno
formTurno.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const dia = document.getElementById("dia").value;
  const hora = document.getElementById("hora").value;
  const servicio = document.getElementById("servicio").value;

  console.log("📝 Datos ingresados:", { nombre, dia, hora, servicio });

  if (!nombre || !dia || !hora || !servicio) {
    mensaje.textContent = "⚠️ Complete todos los campos.";
    mensaje.className = "error";
    console.warn("⚠️ Intento de reserva con datos incompletos");
    return;
  }

  const existe = turnos.find((t) => t.dia === dia && t.hora === hora);

  if (existe) {
    mensaje.textContent = `❌ El turno del ${dia} a las ${hora} ya está ocupado.`;
    mensaje.className = "error";
    console.warn("❌ Turno duplicado detectado:", existe);
    return;
  }

  const nuevoTurno = { nombre, dia, hora, servicio };
  turnos.push(nuevoTurno);
  console.log("✅ Nuevo turno agregado:", nuevoTurno);

  guardarTurnos();
  mostrarTurnos();

  mensaje.textContent = `✅ Turno confirmado para ${nombre} el ${dia} a las ${hora} (${servicio}).`;
  mensaje.className = "success";

  formTurno.reset();
});

// Vaciar turnos
btnVaciar.addEventListener("click", () => {
  console.log("🗑️ Vaciando turnos. Estado previo:", turnos);
  turnos = [];
  guardarTurnos();
  mostrarTurnos();
  mensaje.textContent = "🗑️ Todos los turnos fueron eliminados.";
  mensaje.className = "error";
});

// Render inicial
mostrarTurnos();
