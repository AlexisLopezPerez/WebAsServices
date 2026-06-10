// app.js
const lista = document.getElementById('listaTareas');
const input = document.getElementById('nuevaTarea');

// Función auxiliar para pintar en el HTML con botones independientes para cada tecnología
function renderizarTareas(tareas) {
    lista.innerHTML = '';
    tareas.forEach(t => {
        lista.innerHTML += `
            <li style="margin-bottom: 1rem; padding: 10px;">
                <strong>[ID: ${t.id}]</strong> ${t.titulo}
                <div style="margin-top: 8px;">
                    <button class="rest-btn" onclick="actualizarTareaREST(${t.id}, '${t.titulo}')" style="padding: 3px 8px; font-size: 0.8rem;">Editar REST</button>
                    <button class="rest-btn" onclick="eliminarTareaREST(${t.id})" style="padding: 3px 8px; font-size: 0.8rem; background-color: #d32f2f;">Eliminar REST</button>
                    
                    <button class="gql-btn" onclick="actualizarTareaGraphQL(${t.id}, '${t.titulo}')" style="padding: 3px 8px; font-size: 0.8rem; margin-left: 15px;">Editar GQL</button>
                    <button class="gql-btn" onclick="eliminarTareaGraphQL(${t.id})" style="padding: 3px 8px; font-size: 0.8rem; background-color: #7b1fa2;">Eliminar GQL</button>
                </div>
            </li>`;
    });
}

// ==========================================
// INTERACCIONES RESTful
// ==========================================

function cargarTareasREST() {
    fetch('api.php')
        .then(res => res.json())
        .then(data => renderizarTareas(data));
}

function crearTareaREST() {
    const titulo = input.value;
    if (!titulo.trim()) return alert("Escribe una tarea primero");

    fetch('api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: titulo })
    }).then(() => {
        input.value = '';
        cargarTareasREST();
    });
}

function actualizarTareaREST(id, tituloActual) {
    const nuevoTitulo = prompt("[REST] Modificar título de la tarea:", tituloActual);
    if (nuevoTitulo && nuevoTitulo.trim() !== "") {
        fetch('api.php', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, titulo: nuevoTitulo })
        }).then(() => cargarTareasREST()); // Recarga usando REST
    }
}

function eliminarTareaREST(id) {
    if (confirm("[REST] ¿Estás seguro de que deseas eliminar esta tarea?")) {
        fetch('api.php', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        }).then(() => cargarTareasREST()); // Recarga usando REST
    }
}

// ==========================================
// INTERACCIONES GRAPHQL
// ==========================================

function cargarTareasGraphQL() {
    const query = `
        query {
            tareas {
                id
                titulo
            }
        }
    `;
    fetch('graphql.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query })
    })
    .then(res => res.json())
    .then(response => {
        renderizarTareas(response.data.tareas);
    });
}

function crearTareaGraphQL() {
    const titulo = input.value;
    if (!titulo.trim()) return alert("Escribe una tarea primero");

    const mutation = `
        mutation($tituloStr: String!) {
            crearTarea(titulo: $tituloStr)
        }
    `;
    fetch('graphql.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            query: mutation,
            variables: { tituloStr: titulo }
        })
    }).then(() => {
        input.value = '';
        cargarTareasGraphQL();
    });
}

function actualizarTareaGraphQL(id, tituloActual) {
    const nuevoTitulo = prompt("[GraphQL] Modificar título de la tarea:", tituloActual);
    if (nuevoTitulo && nuevoTitulo.trim() !== "") {
        const mutation = `
            mutation($idInt: Int!, $tituloStr: String!) {
                actualizarTarea(id: $idInt, titulo: $tituloStr)
            }
        `;
        fetch('graphql.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: mutation,
                variables: { idInt: parseInt(id), tituloStr: nuevoTitulo }
            })
        }).then(() => cargarTareasGraphQL()); // Recarga usando GraphQL
    }
}

function eliminarTareaGraphQL(id) {
    if (confirm("[GraphQL] ¿Estás seguro de que deseas eliminar esta tarea?")) {
        const mutation = `
            mutation($idInt: Int!) {
                eliminarTarea(id: $idInt)
            }
        `;
        fetch('graphql.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: mutation,
                variables: { idInt: parseInt(id) }
            })
        }).then(() => cargarTareasGraphQL()); // Recarga usando GraphQL
    }
}