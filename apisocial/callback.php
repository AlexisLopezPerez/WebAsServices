<?php
// 1. Configuración de credenciales (Mantenlas seguras en un archivo de entorno en producción)
$client_id = 'TU_CLIENT_ID_AQUI';
$client_secret = 'TU_CLIENT_SECRET_AQUI';
$redirect_uri = 'http://localhost/callback.php';

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
    die("Error al obtener el token de acceso.");
}

$access_token = $token_data['access_token'];

// 4. Usamos el 'access_token' para pedir los datos del usuario a la API de MLH
$user_url = 'https://my.mlh.io/api/v3/user.json';

$ch = curl_init($user_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Enviamos el token en la cabecera (Header) de la petición
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $access_token
]);
$user_response = curl_exec($ch);
curl_close($ch);

$user_data = json_decode($user_response, true);

// 5. Mostramos los datos obtenidos (En una app real, aquí iniciarías la sesión en tu base de datos)
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Perfil del Hacker</title>
    <style>
        body { font-family: Arial; padding: 20px; background: #f4f4f9; }
        .profile { background: white; padding: 20px; border-radius: 8px; max-width: 500px; }
    </style>
</head>
<body>
    <div class="profile">
        <h2>¡Autenticación Exitosa!</h2>
        <p><strong>Nombre:</strong> <?php echo htmlspecialchars($user_data['data']['first_name'] . ' ' . $user_data['data']['last_name']); ?></p>
        <p><strong>Email:</strong> <?php echo htmlspecialchars($user_data['data']['email']); ?></p>
        <p><strong>Escuela:</strong> <?php echo htmlspecialchars($user_data['data']['school']['name']); ?></p>
        
        <hr>
        <p><em>En este punto, el backend ya tiene los datos del usuario. Puedes guardarlos en tu base de datos y generar una cookie de sesión para tu propia aplicación.</em></p>
    </div>
</body>
</html>