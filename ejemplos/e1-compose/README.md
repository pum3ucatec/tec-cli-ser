# Guía Rápida: Docker Compose y Verificación de Contenedores

## Levantar Servicios con Docker Compose

Para iniciar los servicios definidos en un archivo `docker-compose.yml`, usa el siguiente comando:

```sh
docker-compose up -d
```

### Explicación:
- `up`: Levanta los servicios definidos en el `docker-compose.yml`.
- `-d`: Ejecuta los contenedores en modo **desacoplado** (background).

## Verificar Contenedores en Ejecución

Para listar los contenedores en ejecución, utiliza:

```sh
docker ps
```

### Explicación:
- Muestra una lista de los contenedores activos.
- Incluye información como el **ID del contenedor**, **imagen**, **estado**, **puertos expuestos**, etc.

## Cargar una Imagen en Markdown

Para agregar una imagen en un archivo Markdown, usa la siguiente sintaxis:

![Descripción de la imagen](images/image01.png)

## Para ingresar al contenedor
```
# Ingresar al contenedor MySQL de forma interactiva
docker exec -it mysql-container bash

# Una vez dentro del contenedor, ver la versión de Linux:
cat /etc/os-release

# O alternativamente:
lsb_release -a

# Para ver el kernel Linux:
uname -a
```

## Ingresar a mysql por consola desde el contenedor

```
# Primero ingresar al contenedor
docker exec -it mysql-container bash

# Luego conectar a MySQL desde dentro
mysql -u root -p
```

## Comandos para usar con MYSQL

```
-- Ver version de MySQL
SELECT version();

-- Mostrar todas las bases de datos
SHOW DATABASES;

-- Usar una base de datos específica
USE nombre_base_datos;

-- Mostrar tablas de la base de datos actual
SHOW TABLES;

-- Ver información del usuario actual
SELECT user(), current_user();

-- Salir de MySQL
EXIT;
```
