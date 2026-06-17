        let listaNegocios = [];

        window.addEventListener('DOMContentLoaded', () => {
            const datosLocales = localStorage.getItem('mis_negocios');
            if (datosLocales) {
                listaNegocios = JSON.parse(datosLocales);
                renderCatalog();
            } else {
                inicializarDesdeOSM();
            }
        });

        async function inicializarDesdeOSM() {
            const catalog = document.getElementById("catalog");
            catalog.innerHTML = "<p style='text-align:center; grid-column: 1/-1;'>Cargando datos iniciales de OpenStreetMap...</p>";

            const url = "https://nominatim.openstreetmap.org/search?q=restaurantes+en+Villahermosa+Tabasco&format=json&limit=10&addressdetails=1";

            try {
                const response = await fetch(url, {
                    headers: { "User-Agent": "MiAppEscolar/1.0 (desechablealexis@gmail.com)" }
                });
                const datos = await response.json();
                
                // Mapeamos los datos de OSM a una estructura limpia propia
                listaNegocios = datos.map((item, index) => ({
                    id: Date.now() + index, // ID único temporal
                    name: item.name || item.display_name.split(',')[0],
                    category: item.type ? item.type.toUpperCase() : "NEGOCIO",
                    address: item.address.road || "Dirección Centro, Villahermosa",
                    image: `https://loremflickr.com/320/240/restaurant/all?lock=${index}`
                }));

                guardarEnLocalStorage();
                renderCatalog();

            } catch (error) {
                console.error(error);
                catalog.innerHTML = "<p style='text-align:center; grid-column: 1/-1;'>Error al conectar con la API. Puedes agregar registros manualmente.</p>";
            }
        }
        
        function renderCatalog() {
            const catalog = document.getElementById("catalog");
            catalog.innerHTML = "";

            if (listaNegocios.length === 0) {
                catalog.innerHTML = "<p style='text-align:center; grid-column: 1/-1;'>No hay negocios registrados. ¡Agrega uno nuevo arriba!</p>";
                return;
            }

            listaNegocios.forEach(item => {
                const card = document.createElement("div");
                card.className = "card";
                
                card.innerHTML = `
                    <div class="image-container">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="biz-name">${item.name}</div>
                    <div class="biz-detail"><strong>Categoría:</strong> ${item.category}</div>
                    <div class="biz-detail" style="color: #777;">📍 ${item.address}</div>
                    
                    <div class="card-actions">
                        <button class="btn-edit" onclick="cargarParaEditar(${item.id})">Editar</button>
                        <button class="btn-delete" onclick="eliminarNegocio(${item.id})">Eliminar</button>
                    </div>
                `;
                catalog.appendChild(card);
            });
        }
        
        function guardarNegocio(event) {
            event.preventDefault();

            const idField = document.getElementById("edit-id").value;
            const name = document.getElementById("name").value;
            const category = document.getElementById("category").value;
            const address = document.getElementById("address").value;

            if (idField) {                
                const index = listaNegocios.findIndex(item => item.id == idField);
                if (index !== -1) {
                    listaNegocios[index].name = name;
                    listaNegocios[index].category = category.toUpperCase();
                    listaNegocios[index].address = address;
                }
            } else {                
                const nuevoNegocio = {
                    id: Date.now(), 
                    name: name,
                    category: category.toUpperCase(),
                    address: address,                    
                    image: `https://loremflickr.com/320/240/restaurant/all?lock=${Math.floor(Math.random() * 100)}`
                };
                listaNegocios.unshift(nuevoNegocio); 
            }

            guardarEnLocalStorage();
            renderCatalog();
            cancelarEdicion(); 
        }
        
        function cargarParaEditar(id) {
            const negocio = listaNegocios.find(item => item.id === id);
            if (!negocio) return;

            document.getElementById("edit-id").value = negocio.id;
            document.getElementById("name").value = negocio.name;
            document.getElementById("category").value = negocio.category;
            document.getElementById("address").value = negocio.address;
            
            document.getElementById("form-title").innerText = "Editar Negocio";
            document.getElementById("btn-save-text").innerText = "Guardar Cambios";
            document.getElementById("btn-cancel").style.display = "inline-block";
                        
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
        
        function eliminarNegocio(id) {
            if (confirm("¿Estás seguro de que deseas eliminar este establecimiento?")) {
                listaNegocios = listaNegocios.filter(item => item.id !== id);
                guardarEnLocalStorage();
                renderCatalog();
            }
        }

        // Auxiliares: resetear interfaz de edición
        function cancelarEdicion() {
            document.getElementById("crud-form").reset();
            document.getElementById("edit-id").value = "";
            document.getElementById("form-title").innerText = "Agregar Nuevo Negocio";
            document.getElementById("btn-save-text").innerText = "Agregar";
            document.getElementById("btn-cancel").style.display = "none";
        }

        function guardarEnLocalStorage() {
            localStorage.setItem('mis_negocios', JSON.stringify(listaNegocios));
        }    

        function bajar(){
            window.scrollTo({
                top: document.body.scrollHeight, 
                behavior: 'smooth'               
            });
        }

    const btnPerfil = document.getElementById('btn-perfil');
    const menuPeril = document.getElementById('menu-perfil');
    const btnLogout = document.getElementById('btn-logout');
    let perfilVisible = false;

    btnPerfil.addEventListener('click', () => {
        if(!perfilVisible){
            perfilVisible = true;
            menuPeril.style.display = "flex";
        }
        else{
            perfilVisible = false;
            menuPeril.style.display = "none";
        }
    })

    btnLogout.addEventListener('click', cerrarSesion)

    function cerrarSesion() {
        let cerrarSesion = confirm("¿Esta seguro que quiere cerrar sesión?");

        if (!cerrarSesion) {
            return;
        }

        window.location = "logout.php";
    }
//        