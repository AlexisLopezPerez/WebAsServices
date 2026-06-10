CREATE DATABASE mi_app;
USE mi_app;

CREATE TABLE tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    completada TINYINT(1) DEFAULT 0
);

INSERT INTO tareas (titulo) VALUES ('Aprender PHP Vanilla'), ('Dominar GraphQL');