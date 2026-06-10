<?php
// api.php
header("Content-Type: application/json; charset=UTF-8");
require 'db.php';

$metodo = $_SERVER['REQUEST_METHOD'];

// LECTURA (GET) - Filtra para no mostrar los eliminados en REST
if ($metodo === 'GET') {
    $stmt = $pdo->query("SELECT * FROM tareas WHERE eliminado_rest = 0");
    $tareas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($tareas);
} 
// CREACIÓN (POST)
elseif ($metodo === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if(!empty($data['titulo'])) {
        $stmt = $pdo->prepare("INSERT INTO tareas (titulo) VALUES (:titulo)");
        $stmt->execute(['titulo' => $data['titulo']]);
        echo json_encode(["mensaje" => "Tarea creada exitosamente"]);
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(["error" => "El título es obligatorio"]);
    }
}
// ACTUALIZACIÓN (PUT)
elseif ($metodo === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if(!empty($data['id']) && !empty($data['titulo'])) {
        $stmt = $pdo->prepare("UPDATE tareas SET titulo = :titulo WHERE id = :id");
        $stmt->execute(['titulo' => $data['titulo'], 'id' => $data['id']]);
        echo json_encode(["mensaje" => "Tarea actualizada exitosamente"]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "ID y título son obligatorios"]);
    }
}
// ELIMINACIÓN (DELETE) - Eliminación lógica para REST
elseif ($metodo === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if(!empty($data['id'])) {
        $stmt = $pdo->prepare("UPDATE tareas SET eliminado_rest = 1 WHERE id = :id");
        $stmt->execute(['id' => $data['id']]);
        echo json_encode(["mensaje" => "Tarea eliminada lógicamente para REST"]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "El ID es obligatorio"]);
    }
}
?>