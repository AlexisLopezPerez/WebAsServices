<?php
// api.php - El Backend Seguro


// 1. Simulamos el archivo .env o la configuración segura

$endpoint = "coloca-tu-endpoint";
$apiKey   = "coloca-tu-api-key";

// 2. Definimos la query de GraphQL que queremos hacer
$graphQLQuery = [
    "query" => "query MiConsultaDeClase { directorio { nombre categoria telefono imagen } }"
];




// 3. Configuramos cURL para hacer la petición POST segura hacia BaseQL
$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($graphQLQuery));

// Configuramos las cabeceras incluyendo la API Key
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey // <- La llave viaja oculta desde el servidor
]);

// 4. Ejecutamos la petición y recibimos la respuesta
$response = curl_exec($ch);
curl_close($ch);

// 5. Le devolvemos el JSON limpio a nuestro JavaScript en el Frontend
header('Content-Type: application/json');
echo $response;
?>