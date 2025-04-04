# Manual para Crear una Base de Datos PostgreSQL con Docker

Este manual te guiará paso a paso para crear y ejecutar una base de datos PostgreSQL utilizando Docker.

## Prerequisitos

- Tener Docker instalado en tu máquina.
- Conocimientos básicos de comandos de terminal.

## Paso 1: Instalar Docker

Si aún no tienes Docker instalado, sigue los siguientes pasos según tu sistema operativo.

### En Windows/macOS

1. Dirígete al [sitio oficial de Docker](https://www.docker.com/products/docker-desktop).
2. Descarga e instala Docker Desktop siguiendo las instrucciones.

### En Linux

Ejecuta los siguientes comandos para instalar Docker en tu sistema:

```bash
sudo apt-get update
sudo apt-get install docker.io
Verifica la instalación con:

bash
Copiar
docker --version
Paso 2: Descargar la imagen de PostgreSQL
Una vez que Docker está instalado, descarga la imagen oficial de PostgreSQL desde Docker Hub con el siguiente comando:

bash
Copiar
docker pull postgres
Paso 3: Crear y Ejecutar el Contenedor de PostgreSQL
Para crear un contenedor de PostgreSQL, ejecuta el siguiente comando:

bash
Copiar
docker run --name postgres-container -e POSTGRES_PASSWORD=mi_contraseña -d -p 5432:5432 postgres
Explicación de los parámetros:

--name postgres-container: Define el nombre del contenedor como postgres-container.

-e POSTGRES_PASSWORD=mi_contraseña: Establece la contraseña del superusuario (postgres).

-d: Ejecuta el contenedor en segundo plano.

-p 5432:5432: Mapea el puerto 5432 de PostgreSQL al puerto 5432 de tu máquina local.

postgres: La imagen de PostgreSQL que se está utilizando.

Paso 4: Verificar que el Contenedor Está Funcionando
Para verificar que el contenedor está en ejecución, usa el siguiente comando:

bash
Copiar
docker ps
Deberías ver algo similar a esto:

nginx
Copiar
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS                    NAMES
abcd1234       postgres  "docker-entrypoint.s…"   5 seconds ago   Up 4 seconds   0.0.0.0:5432->5432/tcp   postgres-container
Paso 5: Acceder a PostgreSQL desde la Terminal
Para acceder al contenedor y trabajar con PostgreSQL, ejecuta el siguiente comando:

bash
Copiar
docker exec -it postgres-container psql -U postgres
Este comando te conectará al sistema de bases de datos PostgreSQL dentro del contenedor.

Paso 6: Crear una Base de Datos
Una vez dentro de la terminal de PostgreSQL, puedes crear una base de datos utilizando el siguiente comando SQL:

sql
Copiar
CREATE DATABASE mi_basededatos;
Para verificar que la base de datos se ha creado, usa:

sql
Copiar
\l
Paso 7: Conectarse a la Base de Datos
Para conectarte a la base de datos recién creada, usa el siguiente comando:

sql
Copiar
\c mi_basededatos
Paso 8: Crear Tablas y Manipular Datos
Ya dentro de tu base de datos, puedes comenzar a crear tablas y manipular datos.

Crear una Tabla
Por ejemplo, para crear una tabla llamada empleados:

sql
Copiar
CREATE TABLE empleados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    salario NUMERIC
);
Insertar Datos
Para insertar datos en la tabla empleados, usa:

sql
Copiar
INSERT INTO empleados (nombre, salario) VALUES ('Juan', 3000);
INSERT INTO empleados (nombre, salario) VALUES ('Maria', 3500);
Consultar Datos
Para consultar los datos de la tabla empleados:

sql
Copiar
SELECT * FROM empleados;
Paso 9: Detener y Eliminar el Contenedor
Si deseas detener el contenedor, usa el siguiente comando:

bash
Copiar
docker stop postgres-container
Para eliminar el contenedor:

bash
Copiar
docker rm postgres-container
Paso 10: Configuración Avanzada (Opcional)
Si deseas persistir los datos fuera del contenedor, puedes montar un volumen en tu máquina local:

bash
Copiar
docker run --name postgres-container -e POSTGRES_PASSWORD=mi_contraseña -d -p 5432:5432 -v /path/to/your/local/folder:/var/lib/postgresql/data postgres
Asegúrate de reemplazar /path/to/your/local/folder con la ruta local donde deseas almacenar los datos de PostgreSQL.

Paso 11: Conectarse a la Base de Datos Desde una Aplicación
Para conectarte desde una aplicación, usa los siguientes parámetros de conexión:

Host: localhost (o la IP del contenedor si no está en localhost).

Puerto: 5432.

Usuario: postgres (usuario predeterminado).

Contraseña: La contraseña que hayas definido.

Base de Datos: El nombre de la base de datos que hayas creado.

Conclusión
¡Y eso es todo! Ahora tienes una base de datos PostgreSQL corriendo en un contenedor Docker. Puedes administrar la base de datos usando psql o conectarte desde cualquier aplicación que soporte PostgreSQL.

Si tienes alguna pregunta adicional o necesitas más detalles, ¡no dudes en preguntar!

csharp
Copiar

Este es un manual básico en formato Markdown que cubre desde la instalación de Docker hasta la crea9