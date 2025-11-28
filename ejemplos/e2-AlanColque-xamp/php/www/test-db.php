<!DOCTYPE html>
<html>
<head>
    <title>Test de Base de Datos - XAMP Docker</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .success { color: green; }
        .error { color: red; }
        .container { max-width: 800px; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧪 Test de Conexión a Base de Datos</h1>
        
        <?php
        $host = 'mysql';
        $dbname = 'app_db';
        $username = 'app_user';
        $password = 'userpassword';
        
        try {
            $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            echo "<p class='success'>✅ Conexión a MySQL exitosa!</p>";
            
            // Crear una tabla de prueba si no existe
            $pdo->exec("CREATE TABLE IF NOT EXISTS test_table (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(50),
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )");
            
            // Insertar datos de prueba
            $stmt = $pdo->prepare("INSERT INTO test_table (nombre) VALUES (?)");
            $stmt->execute(["Test desde PHP - " . date('Y-m-d H:i:s')]);
            
            echo "<p class='success'>✅ Tabla de prueba creada/verificada</p>";
            echo "<p class='success'>✅ Datos de prueba insertados</p>";
            
            // Mostrar datos existentes
            $stmt = $pdo->query("SELECT * FROM test_table ORDER BY id DESC LIMIT 5");
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo "<h3>Últimos registros:</h3>";
            echo "<table border='1' cellpadding='8' cellspacing='0'>";
            echo "<tr><th>ID</th><th>Nombre</th><th>Fecha</th></tr>";
            foreach ($results as $row) {
                echo "<tr>";
                echo "<td>{$row['id']}</td>";
                echo "<td>{$row['nombre']}</td>";
                echo "<td>{$row['fecha_creacion']}</td>";
                echo "</tr>";
            }
            echo "</table>";
            
        } catch (PDOException $e) {
            echo "<p class='error'>❌ Error de conexión: " . $e->getMessage() . "</p>";
        }
        ?>
        
        <br>
        <a href="/">← Volver al inicio</a>
    </div>
</body>
</html>