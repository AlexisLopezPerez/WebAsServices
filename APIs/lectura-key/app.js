document.getElementById('btnBuscar').addEventListener('click', async () => {
    const ciudad = document.getElementById('ciudad').value;
    const resultadoDiv = document.getElementById('resultado');

    if (!ciudad) {
        resultadoDiv.innerText = "Por favor, escribe una ciudad.";
        return;
    }

    resultadoDiv.innerText = "Consultando...";

    try {
        // Apuntamos a NUESTRO backend en PHP, no a OpenWeather
        const respuesta = await fetch(`api_clima.php?ciudad=${ciudad}`);
        const datos = await respuesta.json();

        // Validamos si la API de OpenWeather devolvió error (ej. ciudad no encontrada)
        if (datos.cod != 200) {
            resultadoDiv.innerText = `Error: ${datos.message}`;
            return;
        }

        const temperatura = datos.main.temp;
        const humedad = datos.main.humidity;
        resultadoDiv.innerHTML = `
        <p>La temperatura en ${datos.name} es de ${temperatura}°C.</p>
        <p>La humedad es de: ${humedad}</p>
        `;
    } catch (error) {
        console.error("Error:", error);
        resultadoDiv.innerText = 'Error al comunicarse con el servidor local.';
    }
});