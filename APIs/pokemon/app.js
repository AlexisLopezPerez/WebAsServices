document.getElementById('btnCargar').addEventListener('click', cargarDatos);

async function cargarDatos() {
    const contenedor = document.getElementById('contenedorPersonajes');
    contenedor.innerHTML = 'Cargando...';

    try {
        let respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/"); 
                    
        let datos = await respuesta.json();
        
        contenedor.innerHTML = ''; // Limpiar el "Cargando..."
        
        for (const pokemon of datos.results) {            
            const resDetalle = await fetch(pokemon.url);
            const datosPokemon = await resDetalle.json();

            const tarjeta = document.createElement('div');
                tarjeta.className = 'tarjeta';
                tarjeta.innerHTML = `
                    <img src="${datosPokemon.sprites.front_default}" alt="${datosPokemon.name}">
                    <h3>${datosPokemon.name}</h3>                    
                `;                
                contenedor.appendChild(tarjeta);
        }
    } catch (error) {
        console.error("Error en la petición:", error);
        contenedor.innerHTML = 'Hubo un error al cargar los datos.';
    }
}