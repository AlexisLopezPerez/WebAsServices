<?php
require_once '../vendor/autoload.php';
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$idToken = $data['token'] ?? null;

if ($idToken) {
    $CLIENT_ID = CLIENT_ID_GOOGLE;
    $client = new Google_Client(['client_id' => $CLIENT_ID]);
    
    try {
        $payload = $client->verifyIdToken($idToken);
        
        if ($payload) {
            $userid = $payload['sub']; 
            $email = $payload['email'];
            $name = $payload['name'];            

            
            echo json_encode(["status" => "success", "message" => "Bienvenido " . $name]);

            $_SESSION['type_auth']  = "Google";
            $_SESSION['name']       = $name;
            $_SESSION['email']      = $email;
            
        } else {
            echo json_encode(["status" => "error", "message" => "Token inválido"]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Error de verificación"]);
    }
}