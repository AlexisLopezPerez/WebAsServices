<?php 
    require_once 'config.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login con MyMLH</title>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f1c40f;
            margin: 0;
        }
        .login-container {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            text-align: center;
        }
        .mlh-btn {
            background-color: #ff3333; /* Color característico de MLH */
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            width: 80%;
        }
        .mlh-btn:hover {
            background-color: #cc0000;
        }
    </style>
</head>
<body>

    <div class="login-container">
        <h2>Bienvenido a Sección Amarilla</h2>
        <p>Inicia sesión para continuar</p>
        <button class="mlh-btn" onclick="iniciarSesionMLH()">Iniciar sesión con MLH</button>
        <div id="buttonDiv" style="margin:10px auto; min-width:100%; display:flex; justify-content: center;"></div>
    </div>    

    <script>
        function handleCredentialResponse(response) {

            fetch('callbackGoogle.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: response.credential })
            })
            .then(res => res.json())
            .then(data => {
                console.log("Sesión iniciada:", data);
                
                if (data.status === "success") {
                    window.location.href = 'catalogo.php'; 
                } else {
                    alert("Error en la autenticación: " + data.message);
                }
            })
            .catch(err => console.error("Error en la petición:", err));
        }

        window.onload = function () {
            google.accounts.id.initialize({
                client_id: "<?php echo CLIENT_ID_GOOGLE ?>", // Reemplaza esto
                callback: handleCredentialResponse
            });

            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large", text: "signin_with" }  // Opciones de personalización
            );

            google.accounts.id.prompt(); 
        }
    </script>

    <script>
        function iniciarSesionMLH() {
            const clientId = '<?php echo CLIENT_ID_MLH; ?>';  //Recordar quitar esto
            
            const redirectUri = encodeURIComponent('<?php echo REDIRECT_URI; ?>'); 
            
            const mlhAuthUrl = `https://www.mlh.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user%3Aread%3Aprofile+user%3Aread%3Aemail+public&response_type=code`;
            
            window.location.href = mlhAuthUrl;
        }
    </script>

</body>
</html>