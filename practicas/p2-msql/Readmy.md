# Manual de Uso: MySQL en Docker

## 1. Descargar la imagen de MySQL
Para descargar la última versión de MySQL desde Docker Hub, ejecuta:

```sh
docker pull mysql:latest
```

---

## 2. Crear y ejecutar un contenedor MySQL
Para iniciar un contenedor de MySQL, usa el siguiente comando:

```sh
docker run -d --name mysql-container -e MYSQL_ROOT_PASSWORD=tucontraseña -e MYSQL_DATABASE=midb -e MYSQL_USER=usuario -e MYSQL_PASSWORD=clave -p 3306:3306 mysql:latest
```

**Explicación:**
- `-d` → Ejecuta el contenedor en segundo plano.
- `--name mysql-container` → Nombre del contenedor.
- `-e MYSQL_ROOT_PASSWORD=tucontraseña` → Define la contraseña del usuario root.
- `-e MYSQL_DATABASE=midb` → Crea una base de datos llamada `midb`.
- `-e MYSQL_USER=usuario` → Crea un usuario con nombre `usuario`.
- `-e MYSQL_PASSWORD=clave` → Define la contraseña del usuario.
- `-p 3306:3306` → Expone el puerto 3306 para conexiones externas.

---

## 3. Verificar que el contenedor está corriendo
Para comprobar si el contenedor se está ejecutando, usa:

```sh
docker ps
```

Si está activo, verás algo como:

```
CONTAINER ID   IMAGE         COMMAND                  STATUS          PORTS                    NAMES
abcd1234       mysql:latest  "docker-entrypoint.s…"   Up 5 minutes    0.0.0.0:3306->3306/tcp   mysql-container
```

---

## 4. Acceder a MySQL dentro del contenedor
Para conectarte a MySQL en la terminal de Docker, ejecuta:

```sh
docker exec -it mysql-container mysql -u root -p
```

Luego ingresa la contraseña de root cuando se te solicite.

---

## 5. Crear una base de datos
Si aún no tienes una base de datos, puedes crear una nueva:

```sql
CREATE DATABASE UcatecDB;
```

Para usarla:

```sql
USE UcatecDB;
```

---

## 6. Crear una tabla `alumno`
Ejecuta el siguiente comando dentro de MySQL para crear la tabla:

```sql
CREATE TABLE alumno (
    idalumno INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    estado ENUM('Activo', 'Inactivo') NOT NULL
);
```

---

## 7. Insertar datos en la tabla `alumno`
Para agregar registros de prueba, usa:

```sql
INSERT INTO alumno (nombre, apellido, estado) VALUES
('Juan', 'Pérez', 'Activo'),
('María', 'Gómez', 'Inactivo'),
('Carlos', 'López', 'Activo'),
('Ana', 'Fernández', 'Inactivo');
```

---

## 8. Verificar los datos de la tabla
Para ver los registros almacenados, usa:

```sql
SELECT * FROM alumno;
```

Deberías obtener un resultado como este:

| idalumno | nombre | apellido  | estado  |
|----------|--------|-----------|---------|
| 1        | Juan   | Pérez     | Activo  |
| 2        | María  | Gómez     | Inactivo |
| 3        | Carlos | López     | Activo  |
| 4        | Ana    | Fernández | Inactivo |

---

## 9. Salir de MySQL
Para salir del cliente MySQL, escribe:

```sql
EXIT;
```

---

## 10. Detener y eliminar el contenedor (opcional)
Si necesitas detener el contenedor de MySQL, usa:

```sh
docker stop mysql-container
```

Para eliminarlo completamente:

```sh
docker rm mysql-container
```

Si deseas borrar la imagen de MySQL de tu sistema:

```sh
docker rmi mysql:latest
```

---

## 11. Conectar MySQL a una aplicación externa
Si quieres acceder a MySQL desde MySQL Workbench o cualquier otra herramienta, usa estos datos:

- **Host:** `localhost`
- **Puerto:** `3306`
- **Usuario:** `usuario` (o `root` si usas root)
- **Contraseña:** `clave`
- **Base de datos:** `tienda`

---
