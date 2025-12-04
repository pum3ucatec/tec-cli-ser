-- Base de datos inicial
CREATE DATABASE IF NOT EXISTS practica_xamp;
USE practica_xamp;

-- Tabla de productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO productos (nombre, precio, stock) VALUES
    ('Laptop Gamer', 1500.00, 10),
    ('Teclado Mecánico', 89.99, 25),
    ('Mouse Inalámbrico', 45.50, 30),
    ('Monitor 24"', 299.99, 15);