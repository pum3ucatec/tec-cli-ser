
# 🐳 **Levantando un servidor MySQL con Docker y Volumen Persistente**

Este es el paso a paso de cómo levantar un contenedor de MySQL usando Docker, crear una base de datos llamada `ClienteServidor`, y una tabla llamada `ejemplo1` con los campos `nombre` y `edad`, además de asegurar que los datos se guarden de forma persistente usando un volumen.

## 1. **Instalar Docker**

Si aún no tienes Docker instalado, ve a la página oficial y sigue los pasos para descargarlo e instalarlo:

- [Descargar Docker](https://www.docker.com/get-started)

## 2. **Levantar el contenedor MySQL con un volumen persistente**

Para levantar un contenedor MySQL, usamos el siguiente comando en la terminal. Este comando hace varias cosas:

```bash
docker run --name mysql-server   -e MYSQL_ROOT_PASSWORD=12345   -d -p 3306:3306   -v mysql_data:/var/lib/mysql   mysql:latest
```

**Explicación de cada parte del comando:**

| Parte | Explicación |
|-------|-------------|
| `docker run` | Este comando es utilizado para ejecutar un contenedor. |
| `--name mysql-server` | Asigna un nombre al contenedor para que sea más fácil de identificar. |
| `-e MYSQL_ROOT_PASSWORD=12345` | Establece la contraseña para el usuario `root` de MySQL. Aquí se usa `12345` como contraseña, pero puedes cambiarla. |
| `-d` | Ejecuta el contenedor en segundo plano (modo "detached"). |
| `-p 3306:3306` | Mapea el puerto `3306` del contenedor al puerto `3306` de la máquina local. Esto permite acceder a MySQL desde tu máquina local a través de ese puerto. |
| `-v mysql_data:/var/lib/mysql` | Crea un volumen persistente llamado `mysql_data` que se monta en el contenedor para almacenar los datos de la base de datos. Esto asegura que los datos se mantendrán incluso si se detiene o elimina el contenedor. |
| `mysql:latest` | Usa la última versión oficial de la imagen de MySQL. |

Este comando creará un contenedor de MySQL y lo ejecutará en segundo plano.

## 3. **Acceder al contenedor MySQL**

Una vez que el contenedor esté corriendo, puedes acceder al cliente de MySQL dentro del contenedor utilizando el siguiente comando:

```bash
docker exec -it mysql-server mysql -u root -p
```

**Explicación:**

- `docker exec -it`: Ejecuta un comando dentro del contenedor en modo interactivo.
- `mysql-server`: Es el nombre del contenedor al que estamos accediendo.
- `mysql -u root -p`: Llama al cliente de MySQL como el usuario `root`. Se pedirá la contraseña que definimos anteriormente (`12345`).

## 4. **Crear la base de datos `ClienteServidor`**

Una vez dentro del cliente de MySQL, creamos la base de datos llamada `ClienteServidor` con el siguiente comando:

```sql
CREATE DATABASE ClienteServidor;
USE ClienteServidor;
```

**Explicación:**

- `CREATE DATABASE ClienteServidor;`: Crea una nueva base de datos llamada `ClienteServidor`.
- `USE ClienteServidor;`: Cambia el contexto para empezar a trabajar dentro de la base de datos `ClienteServidor`.

## 5. **Crear la tabla `ejemplo1`**

Ahora, dentro de la base de datos `ClienteServidor`, creamos una tabla llamada `ejemplo1` con los siguientes campos:

```sql
CREATE TABLE ejemplo1 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    edad INT
);
```

**Explicación:**

- `id`: identificador único que se autoincrementa.
- `nombre`: campo de texto (cadena de caracteres) para almacenar el nombre del estudiante.
- `edad`: campo numérico para almacenar la edad del estudiante.

## 6. **Insertar un registro de ejemplo**

Para insertar un registro en la tabla `ejemplo1`, usamos el siguiente comando:

```sql
INSERT INTO ejemplo1 (nombre, edad) VALUES ('Andrea', 21);
```

**Explicación:**

- `INSERT INTO ejemplo1 (nombre, edad) VALUES ('Andrea', 21);`: Inserta un registro en la tabla `ejemplo1` con el nombre `Andrea` y la edad `21`.

Para verificar que el dato se ha insertado correctamente, usamos:

```sql
SELECT * FROM ejemplo1;
```

Este comando nos muestra todos los registros en la tabla `ejemplo1`.

## 7. **Detener el contenedor MySQL**

Si deseas detener el contenedor, puedes hacerlo con el siguiente comando:

```bash
docker stop mysql-server
```

Esto detendrá el contenedor de MySQL sin eliminarlo, por lo que podrás reiniciarlo más tarde y mantener los datos.

## 8. **Iniciar el contenedor MySQL cuando lo necesites**

Para iniciar nuevamente el contenedor y seguir con los datos guardados, usa:

```bash
docker start mysql-server
```

---


