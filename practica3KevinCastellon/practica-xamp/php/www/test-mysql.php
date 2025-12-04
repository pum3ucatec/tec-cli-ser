<?php
// Mejorar manejo de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuracion de conexion
$config = [
    'host' => 'mysql',
    'dbname' => 'app_db',
    'username' => 'app_user',
    'password' => 'userpassword'
];
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prueba MySQL - XAMP Docker</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            background: white;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .header h1 {
            color: #333;
            margin-bottom: 15px;
            font-size: 2.5rem;
        }

        .header .subtitle {
            color: #666;
            font-size: 1.1rem;
        }

        .result-card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .success {
            border-left: 5px solid #28a745;
        }

        .error {
            border-left: 5px solid #dc3545;
        }

        .result-icon {
            font-size: 3rem;
            margin-bottom: 20px;
            text-align: center;
        }

        .success .result-icon {
            color: #28a745;
        }

        .error .result-icon {
            color: #dc3545;
        }

        .btn {
            display: inline-block;
            background: #007bff;
            color: white;
            padding: 12px 25px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            margin: 5px;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 123, 255, 0.4);
        }

        .btn-back {
            background: #6c757d;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 0.9em;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        table thead tr {
            background: linear-gradient(to right, #4A00E0, #8E2DE2);
            color: white;
            text-align: left;
            font-weight: bold;
        }

        table th, table td {
            padding: 15px;
            border-bottom: 1px solid #ddd;
        }

        table tbody tr {
            border-bottom: 1px solid #ddd;
        }

        table tbody tr:nth-of-type(even) {
            background-color: #f8f9fa;
        }

        table tbody tr:last-of-type {
            border-bottom: 2px solid #4A00E0;
        }

        table tbody tr:hover {
            background-color: #e9ecef;
        }

        .badge {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: bold;
            margin-left: 10px;
        }

        .badge-success {
            background: #d4edda;
            color: #155724;
        }

        .badge-info {
            background: #d1ecf1;
            color: #0c5460;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .info-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }

        .info-card h3 {
            color: #333;
            margin-bottom: 15px;
            font-size: 1.2rem;
        }

        .info-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }

        .info-item:last-child {
            border-bottom: none;
        }

        .info-label {
            font-weight: 600;
            color: #555;
        }

        .info-value {
            font-family: 'Courier New', monospace;
            color: #333;
        }

        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }
            
            .header h1 {
                font-size: 1.8rem;
            }
            
            table {
                font-size: 0.8em;
            }
            
            table th, table td {
                padding: 10px;
            }
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1><i class="fas fa-database"></i> Prueba de Conexion MySQL</h1>
            <p class="subtitle">Validacion de integracion entre PHP y MySQL en Docker</p>
            <p style="margin-top: 15px; color: #666;">
                <i class="fas fa-user-graduate"></i> Estudiante: Kevin Castellon | 
                <i class="fas fa-calendar"></i> <?php echo date('d/m/Y H:i:s'); ?>
            </p>
        </div>

        <?php
        try {
            // Intentar conexion
            $conn = new PDO(
                "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8mb4",
                $config['username'],
                $config['password'],
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
            ?>
            
            <div class="result-card success">
                <div class="result-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2 style="color: #28a745; text-align: center; margin-bottom: 20px;">
                    ? Conexion a MySQL establecida correctamente
                </h2>
                
                <div style="text-align: center; margin-bottom: 30px;">
                    <span class="badge badge-success">Conexion Activa</span>
                    <span class="badge badge-info">MySQL 8.0</span>
                </div>

                <!-- Informacion del servidor -->
                <div class="info-grid">
                    <div class="info-card">
                        <h3><i class="fas fa-server"></i> Informacion del Servidor</h3>
                        <?php
                        $version = $conn->query("SELECT VERSION() as version")->fetch();
                        $hostInfo = $conn->query("SELECT @@hostname as hostname")->fetch();
                        ?>
                        <div class="info-item">
                            <span class="info-label">Version MySQL:</span>
                            <span class="info-value"><?php echo htmlspecialchars($version['version']); ?></span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Hostname:</span>
                            <span class="info-value"><?php echo htmlspecialchars($hostInfo['hostname']); ?></span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Usuario BD:</span>
                            <span class="info-value"><?php echo htmlspecialchars($config['username']); ?></span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Base de datos:</span>
                            <span class="info-value"><?php echo htmlspecialchars($config['dbname']); ?></span>
                        </div>
                    </div>

                    <div class="info-card">
                        <h3><i class="fas fa-database"></i> Bases de Datos</h3>
                        <?php
                        $databases = $conn->query("SHOW DATABASES");
                        while($db = $databases->fetch()):
                        ?>
                        <div class="info-item">
                            <span class="info-label"><?php echo htmlspecialchars($db['Database']); ?></span>
                            <span class="info-value">
                                <?php 
                                if($db['Database'] == $config['dbname']) {
                                    echo '<i class="fas fa-check" style="color: #28a745;"></i> Activa';
                                } else {
                                    echo '<i class="fas fa-database" style="color: #6c757d;"></i>';
                                }
                                ?>
                            </span>
                        </div>
                        <?php endwhile; ?>
                    </div>
                </div>

                <!-- Operaciones con la base de datos -->
                <h3 style="margin-top: 30px; color: #333;">
                    <i class="fas fa-table"></i> Operaciones de Prueba
                </h3>
                
                <?php
                // Crear tabla si no existe
                $sql = "CREATE TABLE IF NOT EXISTS pruebas_xamp (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    estudiante VARCHAR(100) NOT NULL,
                    matricula VARCHAR(20),
                    practica VARCHAR(100),
                    calificacion DECIMAL(3,1),
                    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    estado ENUM('completado', 'en_proceso') DEFAULT 'completado'
                )";
                $conn->exec($sql);
                echo "<p style='color: #666; margin: 15px 0;'><i class='fas fa-check'></i> Tabla 'pruebas_xamp' creada/verificada</p>";

                // Insertar datos de prueba
                $estudiantes = [
                    ['Kevin Castellon', '2023-001', 'XAMP con Docker', 9.5],
                    ['Ana Lopez', '2023-002', 'Docker Compose', 8.8],
                    ['Carlos Ramirez', '2023-003', 'Arquitectura Web', 9.0],
                    ['Maria Fernandez', '2023-004', 'Bases de Datos', 9.2]
                ];

                $stmt = $conn->prepare("INSERT INTO pruebas_xamp (estudiante, matricula, practica, calificacion) VALUES (?, ?, ?, ?)");
                
                // Solo insertar si la tabla esta vacia
                $count = $conn->query("SELECT COUNT(*) as total FROM pruebas_xamp")->fetch()['total'];
                if($count == 0) {
                    foreach($estudiantes as $estudiante) {
                        $stmt->execute($estudiante);
                    }
                    echo "<p style='color: #666; margin: 15px 0;'><i class='fas fa-check'></i> Datos de prueba insertados</p>";
                }
                ?>

                <!-- Mostrar datos de la tabla -->
                <h4 style="margin-top: 30px; color: #555;">Registros en la base de datos:</h4>
                <?php
                $result = $conn->query("SELECT * FROM pruebas_xamp ORDER BY calificacion DESC");
                if($result->rowCount() > 0):
                ?>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Estudiante</th>
                            <th>Matricula</th>
                            <th>Prictica</th>
                            <th>Calificaciin</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while($row = $result->fetch()): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($row['id']); ?></td>
                            <td><strong><?php echo htmlspecialchars($row['estudiante']); ?></strong></td>
                            <td><?php echo htmlspecialchars($row['matricula']); ?></td>
                            <td><?php echo htmlspecialchars($row['practica']); ?></td>
                            <td style="font-weight: bold; color: <?php echo $row['calificacion'] >= 9 ? '#28a745' : '#ffc107'; ?>">
                                <?php echo htmlspecialchars($row['calificacion']); ?>
                            </td>
                            <td>
                                <span style="padding: 3px 8px; border-radius: 10px; font-size: 0.8rem; background: <?php echo $row['estado'] == 'completado' ? '#d4edda' : '#fff3cd'; ?>; color: <?php echo $row['estado'] == 'completado' ? '#155724' : '#856404'; ?>">
                                    <?php echo htmlspecialchars($row['estado']); ?>
                                </span>
                            </td>
                            <td><?php echo htmlspecialchars($row['fecha_registro']); ?></td>
                        </tr>
                        <?php endwhile; ?>
                    </tbody>
                </table>
                <?php else: ?>
                <p style="color: #666; text-align: center; padding: 20px;">No hay registros en la base de datos.</p>
                <?php endif; ?>

                <!-- Estadisticas -->
                <?php
                $stats = $conn->query("
                    SELECT 
                        COUNT(*) as total_estudiantes,
                        AVG(calificacion) as promedio,
                        MAX(calificacion) as maxima,
                        MIN(calificacion) as minima
                    FROM pruebas_xamp
                ")->fetch();
                ?>
                
                <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                    <h4><i class="fas fa-chart-bar"></i> Estadisticas:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px;">
                        <div style="text-align: center; padding: 15px; background: white; border-radius: 8px;">
                            <div style="font-size: 2rem; color: #4A00E0;"><?php echo $stats['total_estudiantes']; ?></div>
                            <div style="color: #666;">Total Estudiantes</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: white; border-radius: 8px;">
                            <div style="font-size: 2rem; color: #28a745;"><?php echo number_format($stats['promedio'], 1); ?></div>
                            <div style="color: #666;">Calificaciin Promedio</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: white; border-radius: 8px;">
                            <div style="font-size: 2rem; color: #ffc107;"><?php echo $stats['maxima']; ?></div>
                            <div style="color: #666;">Calificaciin Mixima</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: white; border-radius: 8px;">
                            <div style="font-size: 2rem; color: #dc3545;"><?php echo $stats['minima']; ?></div>
                            <div style="color: #666;">Calificaciin Minima</div>
                        </div>
                    </div>
                </div>

            </div>

            <?php
        } catch(PDOException $e) {
            ?>
            <div class="result-card error">
                <div class="result-icon">
                    <i class="fas fa-times-circle"></i>
                </div>
                <h2 style="color: #dc3545; text-align: center; margin-bottom: 20px;">
                    ? Error de conexiin a MySQL
                </h2>
                
                <div style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h4><i class="fas fa-exclamation-triangle"></i> Mensaje de error:</h4>
                    <p style="font-family: monospace; margin: 10px 0;"><?php echo htmlspecialchars($e->getMessage()); ?></p>
                </div>

                <div style="background: #fff3cd; color: #856404; padding: 15px; border-radius: 8px;">
                    <h4><i class="fas fa-tools"></i> Soluciin recomendada:</h4>
                    <p>Ejecuta los siguientes comandos en PowerShell:</p>
                    <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; overflow-x: auto;">
# Instalar extensiones PHP para MySQL
docker exec -it xamp-php bash -c "
    apt update &&
    apt install -y libpng-dev libonig-dev libxml2-dev &&
    docker-php-ext-install pdo pdo_mysql mysqli &&
    exit"

# Reiniciar el servicio PHP
docker-compose restart php</pre>
                </div>
            </div>
            <?php
        }
        ?>

        <div style="text-align: center; margin-top: 30px;">
            <a href="/" class="btn btn-back">
                <i class="fas fa-arrow-left"></i> Volver al Inicio
            </a>
            <a href="/info.php" class="btn">
                <i class="fas fa-info-circle"></i> Ver PHP Info
            </a>
            <a href="http://localhost:8080" target="_blank" class="btn" style="background: #17a2b8;">
                <i class="fas fa-external-link-alt"></i> phpMyAdmin
            </a>
        </div>
    </div>
</body>
</html>
