<?php
$host = 'mysql';
$dbname = 'app_db';
$username = 'app_user';
$password = 'userpassword';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "<h1>✅ Conexión a MySQL exitosa!</h1>";
    
    // Crear tabla de prueba
    $sql = "CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(50),
        email VARCHAR(100),
        fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $conn->exec($sql);
    
    // Insertar datos de prueba
    $stmt = $conn->prepare("INSERT INTO usuarios (nombre, email) VALUES (?, ?)");
    $stmt->execute(['Juan Pérez', 'juan@example.com']);
    $stmt->execute(['María García', 'maria@example.com']);
    
    // Mostrar datos
    $result = $conn->query("SELECT * FROM usuarios");
    echo "<h2>Usuarios registrados:</h2>";
    echo "<table border='1'><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Fecha</th></tr>";
    while($row = $result->fetch()) {
        echo "<tr>";
        echo "<td>" . $row['id'] . "</td>";
        echo "<td>" . $row['nombre'] . "</td>";
        echo "<td>" . $row['email'] . "</td>";
        echo "<td>" . $row['fecha_registro'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
    
} catch(PDOException $e) {
    echo "<h1>❌ Error de conexión:</h1>";
    echo "<p>" . $e->getMessage() . "</p>";
    echo "<p>Para instalar extensiones PHP ejecuta:</p>";
    echo "<pre>docker exec -it xamp-php bash -c 'docker-php-ext-install pdo pdo_mysql'</pre>";
}
?>