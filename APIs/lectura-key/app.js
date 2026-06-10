document.getElementById('btnBuscar').addEventListener('click', async () => {
    const ciudad = document.getElementById('ciudad').value;
    const resultadoDiv = document.getElementById('resultado');

    if (!ciudad) {
        resultadoDiv.innerText = "Por favor, escribe una ciudad.";
        return;
    }

    resultadoDiv.innerHTML = "<p>Consultando...</p>";

    try {
        // Apuntamos a NUESTRO backend en PHP
        const respuesta = await fetch(`api_clima.php?ciudad=${encodeURIComponent(ciudad)}`);
        const datos = await respuesta.json();

        // Validamos si la API de OpenWeather devolvió error (ej. ciudad no encontrada)
        if (datos.cod != 200) {
            resultadoDiv.innerText = `Error: ${datos.message}`;
            return;
        }

        // Extrayendo funciones GRATUITAS adicionales de la API:
        const ciudadNombre = datos.name;
        const pais = datos.sys.country;
        const temperatura = Math.round(datos.main.temp); // Redondeamos para estética
        const sensacion = Math.round(datos.main.feels_like);
        const humedad = datos.main.humidity;
        const viento = (datos.wind.speed * 3.6).toFixed(1); // Convertimos de m/s a km/h
        const descripcion = datos.weather[0].description;
        
        // Obtener el ícono oficial correspondiente al clima actual
        const iconoCodigo = datos.weather[0].icon;
        const iconoUrl = `https://openweathermap.org/img/wn/${iconoCodigo}@2x.png`;

        // Inyectamos la estructura visual estilizada
        resultadoDiv.innerHTML = `
            <div class="weather-card">
                <h2>${ciudadNombre}, ${pais}</h2>
                <img src="${iconoUrl}" alt="${descripcion}" class="weather-icon">
                <div class="temp">${temperatura}°C</div>
                <div class="desc">${descripcion}</div>
                
                <div class="details-grid">
                    <div class="detail-item">
                        <span>T. Térmica</span>
                        <span>${sensacion}°C</span>
                    </div>
                    <div class="detail-item">
                        <span>Humedad</span>
                        <span>${humedad}%</span>
                    </div>
                    <div class="detail-item">
                        <span>Viento</span>
                        <span>${viento} km/h</span>
                    </div>
                    <div class="detail-item">
                        <span>Nubes</span>
                        <span>${datos.clouds.all}%</span>
                    </div>
                </div>
            </div>
        `;

    } catch (error) {
        console.error("Error:", error);
        resultadoDiv.innerText = 'Error al comunicarse con el servidor local.';
    }
});