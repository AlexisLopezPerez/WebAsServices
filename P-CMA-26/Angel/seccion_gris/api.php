<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$archivo_db = 'negocios.json';

// Inicializar con datos de Villahermosa si el archivo no existe
if (!file_exists($archivo_db)) {
    $datos_semilla = [
        ["id" => "1", "nombre" => "Horchatería La Catedral", "categoria" => "Alimentos", "zona" => "Centro", "telefono" => "9933123456"],
        ["id" => "2", "nombre" => "Mariscos El Bayo", "categoria" => "Restaurante", "zona" => "Tabasco 2000", "telefono" => "9933556677"],
        ["id" => "3", "nombre" => "Cafetería Zona Luz", "categoria" => "Café", "zona" => "Centro Histórico", "telefono" => "9931998877"]
    ];
    file_put_contents($archivo_db, json_encode($datos_semilla, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$metodo = $_SERVER['REQUEST_METHOD'];
$negocios = json_decode(file_get_contents($archivo_db), true);

switch ($metodo) {
    case 'GET':
        // LEER: Retorna todos los negocios
        echo json_encode($negocios, JSON_UNESCAPED_UNICODE);
        break;

    case 'POST':
        // CREAR O EDITAR
        $entrada = json_decode(file_get_contents('php://input'), true);
        
        if (empty($entrada['nombre'])) {
            echo json_encode(["error" => "El nombre es obligatorio"]);
            exit;
        }

        if (!empty($entrada['id'])) {
            // Modo: EDITAR
            foreach ($negocios as &$n) {
                if ($n['id'] === $entrada['id']) {
                    $n['nombre'] = $entrada['nombre'];
                    $n['categoria'] = $entrada['categoria'];
                    $n['zona'] = $entrada['zona'];
                    $n['telefono'] = $entrada['telefono'];
                    break;
                }
            }
        } else {
            // Modo: CREAR
            $entrada['id'] = (string)time(); // Genera un ID único basado en tiempo
            $negocios[] = $entrada;
        }

        file_put_contents($archivo_db, json_encode($negocios, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(["success" => true]);
        break;

    case 'DELETE':
        // ELIMINAR
        $entrada = json_decode(file_get_contents('php://input'), true);
        $id_eliminar = $entrada['id'] ?? '';

        $negocios_filtrados = array_filter($negocios, function($n) use ($id_eliminar) {
            return $n['id'] !== $id_eliminar;
        });

        // Reindexar el arreglo para evitar problemas con objetos JSON
        file_put_contents($archivo_db, json_encode(array_values($negocios_filtrados), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(["success" => true]);
        break;

    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}
?>