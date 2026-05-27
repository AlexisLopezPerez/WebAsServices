document.getElementById('btnCargar').addEventListener('click', cargarDatos);

async function cargarDatos() {
    const contenedor = document.getElementById('contenedorPersonajes');
    contenedor.innerHTML = 'Cargando...';

    try {
        const respuesta = await fetch('https://rickandmortyapi.com/api/character');
        const datos = await respuesta.json();
        
        contenedor.innerHTML = ''; // Limpiar el "Cargando..."

        // Iterar y filtrar solo los que están "Alive"
        datos.results.forEach(personaje => {
  
                const tarjeta = document.createElement('div');
                tarjeta.className = 'tarjeta';
                tarjeta.innerHTML = `
                    <img src="${personaje.image}" alt="${personaje.name}">
                    <h3>${personaje.name}</h3>
                    <p>Especie: ${personaje.species}</p>
                `;
                contenedor.appendChild(tarjeta);
        });
    } catch (error) {
        console.error("Error en la petición:", error);
        contenedor.innerHTML = 'Hubo un error al cargar los datos.';
    }
}