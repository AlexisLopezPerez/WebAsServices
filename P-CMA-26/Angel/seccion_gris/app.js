// app.js

const API_URL = 'api.php';

// Elementos de la interfaz
const form = document.getElementById('business-form');
const inputId = document.getElementById('biz-id');
const inputNombre = document.getElementById('biz-nombre');
const inputCategoria = document.getElementById('biz-categoria');
const inputZona = document.getElementById('biz-zona');
const inputTelefono = document.getElementById('biz-telefono');
const formTitle = document.getElementById('form-title');
const btnSubmit = document.getElementById('btn-submit');
const btnCancelar = document.getElementById('btn-cancelar');
const tablaNegocios = document.getElementById('tabla-negocios');
const contador = document.getElementById('contador');

// Variable global para mantener la lista en memoria del navegador
let listaNegocios = [];

// 1. OBTENER Y RENDERIZAR DATOS DESDE EL BACKEND PHP
async function cargarNegocios() {
    try {
        const respuesta = await fetch(API_URL);
        listaNegocios = await respuesta.json();
        
        // Limpiar tabla antes de rellenar
        tablaNegocios.innerHTML = '';
        contador.textContent = `${listaNegocios.length} Establecimientos`;

        if (listaNegocios.length === 0) {
            tablaNegocios.innerHTML = `
                <tr>
                    <td colspan="3" class="px-6 py-8 text-center text-slate-400 italic">No hay negocios registrados localmente.</td>
                </tr>`;
            return;
        }

        listaNegocios.forEach(negocio => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-slate-50 transition-colors';
            tr.innerHTML = `
                <td class="px-6 py-4">
                    <div class="font-medium text-slate-900">${negocio.nombre}</div>
                    <div class="text-xs text-slate-400">${negocio.categoria}</div>
                </td>
                <td class="px-6 py-4">
                    <div class="text-slate-600">${negocio.zona}</div>
                    <div class="text-xs text-slate-400">${negocio.telefono || 'Sin teléfono'}</div>
                </td>
                <td class="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    <button onclick="prepararEdicion('${negocio.id}')" class="text-blue-600 hover:text-blue-800 font-medium text-xs bg-blue-50 px-2 py-1 rounded">Editar</button>
                    <button onclick="eliminarNegocio('${negocio.id}')" class="text-red-600 hover:text-red-800 font-medium text-xs bg-red-50 px-2 py-1 rounded">Eliminar</button>
                </td>
            `;
            tablaNegocios.appendChild(tr);
        });
    } catch (error) {
        console.error("Error al conectar con la API de PHP:", error);
    }
}

// 2. ENVIAR FORMULARIO (GUARDAR NUEVO O ACTUALIZAR EXISTENTE)
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
        id: inputId.value, // Si tiene valor, PHP sabrá que es una edición
        nombre: inputNombre.value,
        categoria: inputCategoria.value,
        zona: inputZona.value,
        telefono: inputTelefono.value
    };

    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const resultado = await respuesta.json();
        if (resultado.success) {
            resetearFormulario();
            cargarNegocios(); // Refrescar la tabla con los nuevos cambios
        }
    } catch (error) {
        console.error("Error al procesar el formulario:", error);
    }
});

// 3. SELECCIONAR NEGOCIO PARA COLOCARLO EN MODO EDICIÓN
window.prepararEdicion = function(id) {
    const negocio = listaNegocios.find(n => n.id === id);
    if (!negocio) return;

    // Llenar inputs del formulario con los valores actuales
    inputId.value = negocio.id;
    inputNombre.value = negocio.nombre;
    inputCategoria.value = negocio.categoria;
    inputZona.value = negocio.zona;
    inputTelefono.value = negocio.telefono;

    // Cambiar aspecto visual del formulario
    formTitle.textContent = "Modificar Datos";
    btnSubmit.textContent = "Actualizar Registro";
    btnSubmit.className = "flex-1 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium py-2 rounded-md transition shadow-sm";
    btnCancelar.classList.remove('hidden');
};

// 4. ELIMINAR REGISTRO ÚNICAMENTE DE NUESTRO JSON LOCAL
window.eliminarNegocio = async function(id) {
    if (!confirm("¿Deseas remover este comercio de tu base de datos local de Villahermosa?")) return;

    try {
        const respuesta = await fetch(API_URL, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });

        const resultado = await respuesta.json();
        if (resultado.success) {
            // Si el elemento que borramos se estaba editando actualmente, limpiamos el formulario
            if (inputId.value === id) resetearFormulario();
            cargarNegocios();
        }
    } catch (error) {
        console.error("Error al intentar eliminar:", error);
    }
};

// Cancelar edición y limpiar campos
btnCancelar.addEventListener('click', resetearFormulario);

function resetearFormulario() {
    form.reset();
    inputId.value = '';
    formTitle.textContent = "Registrar Negocio";
    btnSubmit.textContent = "Guardar Datos";
    btnSubmit.className = "flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition shadow-sm";
    btnCancelar.classList.add('hidden');
}

// Inicialización de la página al cargar por primera vez
document.addEventListener('DOMContentLoaded', cargarNegocios);