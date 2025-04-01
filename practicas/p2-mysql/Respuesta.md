
# 🐬 Práctica Docker: Levantar un contenedor MySQL y realizar consultas

## 📌 Objetivo
Levantar un contenedor Docker con **MySQL 8.0**, conectarse desde la terminal y ejecutar consultas básicas.

---

## 🔹 Requisitos

- Docker instalado
- Conexión a internet
- Terminal o consola

---

## 📝 Paso a paso

### 1️⃣ Descargar la imagen oficial de MySQL

```bash
docker pull mysql:8.0
```

---

### 2️⃣ Crear y ejecutar el contenedor MySQL

```bash
docker run -d \
  --name mi-mysql \
  -e MYSQL_ROOT_PASSWORD=miclave123 \
  -e MYSQL_DATABASE=prueba \
  -p 3306:3306 \
  mysql:8.0
```

📌 Esto:
- Inicia el contenedor en segundo plano (`-d`)
- Define la contraseña del root
- Crea una base de datos llamada `prueba`
- Expone el puerto 3306

---

### 3️⃣ Verificar que el contenedor esté corriendo

```bash
docker ps
```

---

### 4️⃣ Acceder al contenedor y al cliente MySQL

```bash
docker exec -it mi-mysql bash
```

Una vez dentro:

```bash
mysql -u root -p
```

🔐 Ingresar la contraseña: `miclave123`

---

### 5️⃣ Consultas en MySQL

```sql
-- Mostrar bases de datos
SHOW DATABASES;

-- Usar la base de datos creada
USE prueba;

-- Crear una tabla
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  email VARCHAR(100)
);

-- Insertar datos
INSERT INTO usuarios (nombre, email) VALUES ('Santiago', 'santy@example.com');

-- Consultar los datos
SELECT * FROM usuarios;
```

---

### 6️⃣ Salir del cliente MySQL y del contenedor

```sql
exit
```

```bash
exit
```

---

### 7️⃣ Detener y eliminar el contenedor (opcional)

```bash
docker stop mi-mysql
docker rm mi-mysql
```

---

## ✅ Resultado esperado

- Contenedor MySQL corriendo con la base de datos `prueba`
- Consulta exitosa a una tabla `usuarios` con al menos un dato insertado

---
