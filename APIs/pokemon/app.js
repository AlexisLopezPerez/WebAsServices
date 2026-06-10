document.getElementById('btnCargar').addEventListener('click', cargarDatos);

async function cargarDatos() {
    const contenedor = document.getElementById('contenedorPersonajes');
    contenedor.innerHTML = 'Cargando...';

    try {
        const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const datos = await respuesta.json();

        contenedor.innerHTML = ''; // Limpiar el "Cargando..."

        for (const personaje of datos.results) {
            
            const respuestaDetalle = await fetch(personaje.url);
            const detalle = await respuestaDetalle.json();

            const nombre = detalle.name;
            const foto = detalle.sprites.front_default; 
            const tipos = detalle.types.map(t => t.type.name).join(', ');
            const peso = detalle.weight / 10; 

            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta';
            tarjeta.innerHTML = `
                <img src="${foto}" alt="${nombre}" style="width: 100px; height: 100px;">
                <h3>${nombre.toUpperCase()}</h3>
                <p><strong>Tipo:</strong> ${tipos}</p>
                <p><strong>Peso:</strong> ${peso} kg</p>
            `;

            contenedor.appendChild(tarjeta);
        }

    } catch (error) {
        console.error("Error en la petición:", error);
        contenedor.innerHTML = 'Hubo un error al cargar los datos.';
    }
}