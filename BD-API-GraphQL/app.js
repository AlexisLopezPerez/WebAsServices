// app.js
const lista = document.getElementById('listaTareas');
const input = document.getElementById('nuevaTarea');

// Función auxiliar para pintar en el HTML
function renderizarTareas(tareas) {
    lista.innerHTML = '';
    tareas.forEach(t => {
        lista.innerHTML += `<li>${t.id} - ${t.titulo}</li>`;
    });
}

// ==========================================
// INTERACCIONES RESTful
// ==========================================

function cargarTareasREST() {
    // REST: Se hace un simple GET a la URL del recurso
    fetch('api.php')
        .then(res => res.json())
        .then(data => renderizarTareas(data));
}

function crearTareaREST() {
    const titulo = input.value;
    // REST: Se hace un POST enviando un objeto JSON plano
    fetch('api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: titulo })
    }).then(() => {
        input.value = '';
        cargarTareasREST();
    });
}

// ==========================================
// INTERACCIONES GRAPHQL
// ==========================================

function cargarTareasGraphQL() {
    // GraphQL: se manda un POST con un string especificando qué campos queremos
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
        // GraphQL siempre devuelve los datos dentro de un objeto "data"
        renderizarTareas(response.data.tareas);
    });
}

function crearTareaGraphQL() {
    const titulo = input.value;
    // GraphQL: Mandamos un POST con un string tipo "mutation" y pasamos variables
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