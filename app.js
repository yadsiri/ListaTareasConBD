const input = document.getElementById("nuevaTarea"); //esta en index
const addBtn = document.querySelector(".btn-add");
const ul = document.getElementById("listaTareas"); //BD
const empty = document.querySelector(".empty");

const agregarTarea = async () => {
  const descripcion = input.value;
  if (descripcion.trim() === '') {
    alert('Por favor, ingresa una descripción para la tarea');
    return;
  }

  // enviar la tarea al backend
  const response = await fetch('http://localhost:3000/listatareas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ descripcion }),
  });

  if (response.ok) { //vaidacion de que se agrega -o no- correctamente
    const tarea = await response.json();
    agregarTareaALista(tarea);
    input.value = ""; 
  } else {
    alert('Error al agregar la tarea. Intenta nuevamente.');
  }
};

//agregar tarea a la lista en el frontend
const agregarTareaALista = (tarea) => {
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.textContent = tarea.descripcion;

  li.appendChild(addCompleteBtn(tarea));
  li.appendChild(p);
  li.appendChild(addDeleteBtn(tarea.id)); //se pasa el ID para eliminar
  ul.appendChild(li);

  if (tarea.completada) {
    li.classList.add("completed");
  }

  empty.style.display = "none";
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevencion del boton
  agregarTarea();
});

const obtenerTareas = async () => {
  const response = await fetch('http://localhost:3000/listatareas');
  const data = await response.json();
  data.tareas.forEach((tarea) => agregarTareaALista(tarea));
};

document.addEventListener('DOMContentLoaded', obtenerTareas);

//eliminar las tareas
function addDeleteBtn(id) {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "btn-delete";

  deleteBtn.addEventListener("click", async (e) => {
    //enviar petición DELETE al backend
    await fetch(`http://localhost:3000/listatareas/${id}`, {
      method: 'DELETE',
    });

    const item = e.target.parentElement;
    ul.removeChild(item);

    const items = document.querySelectorAll("li");
    if (items.length === 0) {
      empty.style.display = "block";
    }
  });

  return deleteBtn;
}

//botón para completar las tareas
function addCompleteBtn(tarea) {
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✓";
  completeBtn.className = "btn-complete";

  completeBtn.addEventListener("click", async (e) => {
    const item = e.target.parentElement;
    item.classList.toggle("completed");

    //determinar el estado actual de la tarea
    const completada = item.classList.contains("completed") ? 1 : 0;

    // enviar petición PUT al backend para actualizar el estado
    await fetch(`http://localhost:3000/listatareas/${tarea.id}/completar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completada }),
    });
  });

  //si la tarea ya está completada, añadir la clase "completed"
  if (tarea.completada) {
    completeBtn.parentElement?.classList.add("completed");
  }

  return completeBtn;
}
