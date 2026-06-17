<?php  
    session_start();

  if (!isset($_SESSION['type_auth'])) {    
    echo "<script>alert('Inicie session para poder acceder');</script>";
    echo "<script>window.location = 'logout.php'</script>";
    session_destroy();
  }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restaurantes en Villahermosa</title>
    <link rel="stylesheet" href="style.css">    
</head>
<body>
    <div id="menu-perfil" class="card">
        <h3><?php echo $_SESSION['name'] ?></h3>
        <strong class="biz-detail" style="color:black"><?php echo $_SESSION['email'] ?></strong>
        <button class="btn-cancel" id="btn-logout">Cerrar sesión</button>
    </div>    
    <header>        
        <h2>Bienvenido <?php echo $_SESSION['name'] ?></h2>    
        <button id="btn-perfil">Perfil</button>
    </header>
    <h1>Restaurantes de Villahermosa</h1>        

    <div class="form-container">
        <button class="btn-submit" onclick="bajar()">Agregar Negocio</a>
    </div>
    

    <div class="catalog-grid" id="catalog"></div>

    <div class="form-container" id="agregarNegocio">
        <h3 id="form-title">Agregar Nuevo Negocio</h3>
        <form id="crud-form" onsubmit="guardarNegocio(event)">
            <input type="hidden" id="edit-id">
            
            <div class="form-group">
                <label for="name">Nombre del Negocio:</label>
                <input type="text" id="name" required>
            </div>
            <div class="form-group">
                <label for="category">Categoría:</label>
                <input type="text" id="category" placeholder="Ej. Café, Restaurante" required>
            </div>
            <div class="form-group">
                <label for="address">Dirección:</label>
                <input type="text" id="address" placeholder="Ej. Av. Paseo Tabasco" required>
            </div>
            
            <div class="form-buttons">
                <button type="submit" class="btn-submit" id="btn-save-text">Agregar</button>
                <button type="button" class="btn-cancel" id="btn-cancel" style="display:none;" onclick="cancelarEdicion()">Cancelar</button>
            </div>
        </form>
    </div>

    <script src="script.js"></script>
</body>
</html>
<!---->