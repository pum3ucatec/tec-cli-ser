<?php
$servername = "db"; // nombre del servicio en docker-compose
$username = "user";
$password = "password";
$dbname = "laravel";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$result = $conn->query("SHOW TABLES");
echo "<h2>Tablas en la base de datos:</h2>";
if ($result) {
    echo "<ul>";
    while ($row = $result->fetch_row()) {
        echo "<li>{$row[0]}</li>";
    }
    echo "</ul>";
} else {
    echo "Error en la consulta.";
}

$conn->close();
?>