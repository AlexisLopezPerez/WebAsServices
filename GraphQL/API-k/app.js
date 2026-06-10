// app.js - Versión Robusta con Diagnóstico Completo
const container = document.getElementById('directorio-container');

// Hacemos la petición a nuestro backend en PHP
fetch('api.php')
    .then(response => {
        // Leemos primero como texto para evitar que se rompa la promesa si viene un error formateado
        return response.text();
    })
    .then(text => {
        let res;
        try {
            // Intentamos parsear manualmente el JSON
            res = JSON.parse(text);
        } catch (e) {
            console.error("El servidor PHP no devolvió un JSON válido. Texto exacto recibido de api.php:", text);
            container.innerHTML = `<p class="error" style="color:red; font-weight:bold;">Error: El backend no envió un JSON válido. Revisa los detalles en la consola de desarrollador.</p>`;
            return;
        }

        // 1. Validación de errores controlados enviados desde PHP o BaseQL
        if (res.errors) {
            console.error("Errores del servidor atrapados:", res.errors);
            container.innerHTML = `<p class="error">Error: ${res.errors[0].message}</p>`;
            
            // Si el backend capturó una respuesta cruda extraña, la exponemos en consola
            if (res.errors[0].raw_response) {
                console.log("Respuesta cruda del servidor externo:", res.errors[0].raw_response);
            }
            return;
        }

        // Limpiamos el mensaje de "Cargando..."
        container.innerHTML = '';

        // 2. Validación obligatoria de la estructura esperada de los datos
        if (!res.data || !res.data.hoja1) {
            console.error("Estructura JSON inesperada. Falta 'data.hoja1':", res);
            container.innerHTML = `<p class="error">Error: La respuesta de la base de datos no contiene la estructura esperada.</p>`;
            return;
        }

        const listaNegocios = res.data.hoja1;

        // Si la lista está vacía
        if (listaNegocios.length === 0) {
            container.innerHTML = `<p>No hay comercios registrados en este momento.</p>`;
            return;
        }

        // 3. Recorremos los datos seguros para crear las tarjetas HTML
        listaNegocios.forEach(negocio => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <img src="${negocio.imagen || 'https://via.placeholder.com/300x180'}" class="card-img" alt="${negocio.nombre || 'Negocio'}">
                <div class="card-info">
                    <span class="badge">${negocio.categoria || 'General'}</span>
                    <h3>${negocio.nombre || 'Sin nombre'}</h3>
                    <p>📞 Tel: ${negocio.telefono || 'No disponible'}</p>
                    <a href="https://wa.me/${negocio.telefono || ''}" target="_blank" class="btn-contacto">Pedir por WhatsApp</a>
                </div>
            `;
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Error crítico en el flujo de JS:", error);
        container.innerHTML = '<p class="error">Ocurrió un problema crítico al procesar los datos de la interfaz.</p>';
    });