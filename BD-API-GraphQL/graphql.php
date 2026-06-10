<?php
// graphql.php
require 'vendor/autoload.php';
require 'db.php';

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\GraphQL;
use GraphQL\Type\Schema;

header('Content-Type: application/json; charset=UTF-8');

// 1. Definir el "Tipo" Tarea
$tareaType = new ObjectType([
    'name' => 'Tarea',
    'fields' => [
        'id' => Type::int(),
        'titulo' => Type::string(),
        'completada' => Type::boolean(),
        'eliminado_rest' => Type::int(),
        'eliminado_gql' => Type::int()
    ]
]);

// 2. Definir Query (Lectura) - Filtra para no mostrar los eliminados en GraphQL
$queryType = new ObjectType([
    'name' => 'Query',
    'fields' => [
        'tareas' => [
            'type' => Type::listOf($tareaType),
            'resolve' => function () use ($pdo) {
                $stmt = $pdo->query("SELECT * FROM tareas WHERE eliminado_gql = 0");
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
        ]
    ]
]);

// 3. Definir Mutation (Creación, Actualización, Eliminación)
$mutationType = new ObjectType([
    'name' => 'Mutation',
    'fields' => [
        // Mutación para crear
        'crearTarea' => [
            'type' => Type::string(),
            'args' => [
                'titulo' => Type::nonNull(Type::string())
            ],
            'resolve' => function ($root, $args) use ($pdo) {
                $stmt = $pdo->prepare("INSERT INTO tareas (titulo) VALUES (:titulo)");
                $stmt->execute(['titulo' => $args['titulo']]);
                return "Tarea creada exitosamente vía GraphQL";
            }
        ],
        // Mutación para actualizar
        'actualizarTarea' => [
            'type' => Type::string(),
            'args' => [
                'id' => Type::nonNull(Type::int()),
                'titulo' => Type::nonNull(Type::string())
            ],
            'resolve' => function ($root, $args) use ($pdo) {
                $stmt = $pdo->prepare("UPDATE tareas SET titulo = :titulo WHERE id = :id");
                $stmt->execute(['titulo' => $args['titulo'], 'id' => $args['id']]);
                return "Tarea actualizada vía GraphQL";
            }
        ],
        // Mutación para eliminar - Eliminación lógica para GraphQL
        'eliminarTarea' => [
            'type' => Type::string(),
            'args' => [
                'id' => Type::nonNull(Type::int())
            ],
            'resolve' => function ($root, $args) use ($pdo) {
                $stmt = $pdo->prepare("UPDATE tareas SET eliminado_gql = 1 WHERE id = :id");
                $stmt->execute(['id' => $args['id']]);
                return "Tarea eliminada lógicamente para GraphQL";
            }
        ]
    ]
]);

// 4. Ejecutar el Schema
$schema = new Schema([
    'query' => $queryType,
    'mutation' => $mutationType
]);

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);
$query = $input['query'];
$variables = isset($input['variables']) ? $input['variables'] : null;

// GraphQL procesa el texto y ejecuta las funciones (resolvers)
$result = GraphQL::executeQuery($schema, $query, null, null, $variables);
echo json_encode($result->toArray());
?>