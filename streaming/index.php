<?php
// 1. PHP: Lógica del servidor
// Generamos un nombre de sala dinámico para que no choquen las llamadas.
// Ejemplo: "ClaseWebAsAService_7482"
$materia = "ClassWebAsAService";
$idAleatorio = rand(1000, 9999);
$nombreSala = $materia . "_" . $idAleatorio;
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plataforma de Tutorías</title>
    
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 20px;
            text-align: center;
        }
        .header {
            background-color: #0056b3;
            color: white;
            padding: 10px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        /* Este es el contenedor vital donde la API inyectará el video */
        #jitsi-container {
            width: 80%;
            height: 600px;
            margin: 0 auto;
            background-color: #000;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .controles {
            margin-top: 20px;
        }
        button {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>

    <div class="header">
        <h1>Tutorías Virtuales</h1>
        <p>Estás en la sala privada: <strong><?php echo $nombreSala; ?></strong></p>
    </div>

    <div id="jitsi-container"></div>

    <div class="controles">
        <button id="btn-silenciar">Silenciar mi Micrófono desde la App</button>
    </div>

    <script src="https://meet.jit.si/external_api.js"></script>

    <script>
        // Le pasamos el dato de PHP a JavaScript
        const salaGenerada = "<?php echo $nombreSala; ?>";

        // Configuramos la petición a la API
        const domain = 'meet.jit.si';
        const options = {
            roomName: salaGenerada,
            width: '100%',
            height: '100%',
            parentNode: document.querySelector('#jitsi-container'), // ¿Dónde se va a dibujar?
            interfaceConfigOverwrite: {
                // Podemos ocultar botones del reproductor de Jitsi
                SHOW_JITSI_WATERMARK: false
            }
        };

        // ¡Iniciamos la plataforma de streaming!
        const api = new JitsiMeetExternalAPI(domain, options);

        // EXTRA: Demostración de interacción entre nuestra App y la API
        document.getElementById('btn-silenciar').addEventListener('click', function() {
            // Le damos una orden a la plataforma mediante su método executeCommand
            api.executeCommand('toggleAudio');
            alert("Has alternado tu micrófono usando un botón de TU propia página web.");
        });
    </script>

</body>
</html>