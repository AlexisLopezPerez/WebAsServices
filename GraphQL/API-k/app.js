// app.js - Versión Final Corregida
const container = document.getElementById('directorio-container');

// Hacemos la petición a nuestro backend en PHP
fetch('api.php')
    .then(response => response.json())
    .then(res => {
        // 1. Validación obligatoria de errores de GraphQL
        if (res.errors) {
            container.innerHTML = `<p class="error">Error en la consulta: ${res.errors[0].message}</p>`;
            return;
        }

        // Limpiamos el mensaje de "Cargando..."
        container.innerHTML = '';

        // 2. CORRECCIÓN CLAVE: Leemos exactamente 'hoja1' tal como viene en tu JSON
        const listaNegocios = res.data.hoja1;

        // 3. Recorremos los datos para crear las tarjetas HTML
        listaNegocios.forEach(negocio => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <img src="${negocio.imagen || 'https://via.placeholder.com/300x180'}" class="card-img" alt="${negocio.nombre}">
                <div class="card-info">
                    <span class="badge">${negocio.categoria}</span>
                    <h3>${negocio.nombre}</h3>
                    <p>📞 Tel: ${negocio.telefono}</p>
                    <a href="https://wa.me/${negocio.telefono}" target="_blank" class="btn-contacto">Pedir por WhatsApp</a>
                </div>
            `;
            container.appendChild(card);
        });
    })
    .catch(error => {
        // MEJORA: Imprimimos el error real en la consola para no adivinar
        console.error("Error real atrapado en JS:", error);
        container.innerHTML = '<p class="error">Ocurrió un problema al procesar los datos de la interfaz.</p>';
    });