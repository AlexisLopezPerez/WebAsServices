<?php
require_once "config.php";
// 1. Configuración de credenciales (Mantenlas seguras en un archivo de entorno en producción)
session_start();

$client_id = CLIENT_ID_MLH;
$client_secret = CLIENT_SECRET_MLH;
$redirect_uri = REDIRECT_URI;

// 2. Verificamos si MLH nos envió el código de autorización
if (!isset($_GET['code'])) {
    die("Error: No se recibió ningún código de autorización.");
}

$code = $_GET['code'];

// 3. Intercambiamos el 'code' por un 'access_token' usando cURL
$token_url = 'https://my.mlh.io/oauth/token';
$post_data = [
    'client_id' => $client_id,
    'client_secret' => $client_secret,
    'code' => $code,
    'redirect_uri' => $redirect_uri,
    'grant_type' => 'authorization_code'
];

$ch = curl_init($token_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_data));
$token_response = curl_exec($ch);
curl_close($ch);

$token_data = json_decode($token_response, true);

if (!isset($token_data['access_token'])) {
    session_destroy();
    echo '<a href="index.php"> Volver </a>';
    die("Error al obtener el token de acceso.");    
}

$access_token = $token_data['access_token'];

// 4. Usamos el 'access_token' para pedir los datos del usuario a la API de MLH
$user_url = 'https://api.mlh.com/v4/users/me'; // -&expand=[]email

$ch = curl_init($user_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Enviamos el token en la cabecera (Header) de la petición
//curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $access_token,
    'Accept: application/json'
]);
$user_response = curl_exec($ch);
if(curl_errno($ch)){
    session_destroy();
    die('Error de cURL: ' . curl_error($ch));
}
curl_close($ch);

$user_data = json_decode($user_response, true);

if (!isset($user_data['first_name'])) {
    echo "<h3>Error al obtener los datos. Respuesta de la API:</h3>";
    echo "<pre>";
    print_r($user_response); 
    echo "</pre>";
    session_destroy();
    echo '<a href="index.php"> Volver </a>';
    die();
}

$_SESSION['type_auth']  = "MLH";
$_SESSION['name']       = $user_data['first_name'] . ' ' . $user_data['last_name'];
$_SESSION['email']      = $user_data['email'];

header("location:catalogo.php");

/*echo "<pre>";
echo json_encode($user_data, JSON_PRETTY_PRINT);
echo "</pre>";*/
// 5. Mostramos los datos obtenidos (En una app real, aquí iniciarías la sesión en tu base de datos)
?>
<!--
<p> AUTH: <?php //echo $_SESSION['type_auth'] ?> </p>
<p> NAME: <?php //echo $_SESSION['name'] ?> </p>
<p> EMAIL: <?php// echo $_SESSION['email'] ?> </p>
-->