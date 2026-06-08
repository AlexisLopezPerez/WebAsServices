<?php
// Requerir el autoload de Composer
require_once __DIR__ . '/vendor/autoload.php';

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\GraphQL;

// 1. Definir los Tipos y las Consultas (Queries)
$queryType = new ObjectType([
    'name' => 'Query',
    'fields' => [
        // Una consulta simple que devuelve un texto
        'saludo' => [
            'type' => Type::string(),
            'args' => [
                'nombre' => ['type' => Type::string()]
            ],
            'resolve' => function ($rootValue, $args) {
                $nombre = isset($args['nombre']) ? $args['nombre'] : 'Mundo';
                return "¡Hola, $nombre! Bienvenido a tu API GraphQL.";
            }
        ]
    ]
]);

// 2. Construir el Esquema (Schema)
$schema = new Schema([
    'query' => $queryType
]);

// 3. Capturar la petición entrante (Input)
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

// Extraer la consulta (query) y las variables
$query = $input['query'] ?? '{ saludo }';
$variableValues = $input['variables'] ?? null;

// 4. Ejecutar la consulta
try {
    $result = GraphQL::executeQuery($schema, $query, null, null, $variableValues);
    $output = $result->toArray();
} catch (\Exception $e) {
    // Manejo de errores
    $output = [
        'errors' => [
            ['message' => $e->getMessage()]
        ]
    ];
}

// 5. Devolver la respuesta en JSON
header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);