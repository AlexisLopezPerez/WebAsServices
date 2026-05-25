<?php
// api.php

// 1. Indicar al navegador que la respuesta será un objeto JSON
header("Content-Type: application/json");

// 2. Permitir que cualquier aplicación acceda a esta API (CORS)
header("Access-Control-Allow-Origin: *");

// 3. Crear el mensaje de "Hola Mundo"
$respuesta = [
    "status" => "success",
    "message" => "¡Hola Mundo desde la API en PHP!"
];

// 4. Transformar el array de PHP a formato JSON y enviarlo
echo json_encode($respuesta);
?>