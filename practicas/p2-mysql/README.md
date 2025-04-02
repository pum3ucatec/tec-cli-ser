# README - Uso de MySQL en Docker

## Introducción
Este documento explica paso a paso el proceso de instalación y ejecución de MySQL en Docker, incluyendo la creación de un contenedor, la conexión a la base de datos y la realización de consultas.

## Prerrequisitos
Para seguir estos pasos, necesitas:
- Tener instalado **Docker** en tu sistema.
- Acceso a una terminal o PowerShell.

## Descarga y Configuración de MySQL en Docker

### 1. Descargar la imagen de MySQL
Ejecutamos el siguiente comando para descargar la imagen oficial de MySQL:
```sh
docker pull mysql:latest
```
Esto descarga la versión más reciente de MySQL desde el repositorio oficial de Docker Hub.

### 2. Verificar las imágenes disponibles
Para asegurarnos de que la imagen se descargó correctamente, ejecutamos:
```sh
docker images
```
Esto mostrará una lista de las imágenes disponibles, incluyendo **mysql:latest**.

### 3. Crear y ejecutar un contenedor de MySQL
Ejecutamos el siguiente comando para iniciar un contenedor de MySQL:
```sh
docker run --name mysql1 -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 mysql:latest
```
Explicación:
- `--name mysql1`: Asigna el nombre "mysql1" al contenedor.
- `-e MYSQL_ROOT_PASSWORD=root`: Define la contraseña del usuario root.
- `-d`: Ejecuta el contenedor en segundo plano.
- `-p 3306:3306`: Expone el puerto 3306 para conexiones externas.
- `mysql:latest`: Indica la imagen que se usará.

### 4. Verificar los contenedores en ejecución
Para confirmar que el contenedor está corriendo, usamos:
```sh
docker ps
```
Esto mostrará una lista de los contenedores activos, incluyendo **mysql1**.

## Conectarse a MySQL dentro del contenedor

### 1. Acceder a la terminal del contenedor
Ejecutamos:
```sh
docker exec -it mysql1 bash
```
Esto nos permite abrir una sesión de terminal dentro del contenedor.

### 2. Iniciar sesión en MySQL
Dentro del contenedor, ingresamos al cliente de MySQL:
```sh
mysql -u root -p
```
Nos pedirá la contraseña, que en este caso es `root`.

### 3. Mostrar las bases de datos disponibles
Una vez dentro de MySQL, ejecutamos:
```sql
SHOW DATABASES;
```
Esto listará las bases de datos disponibles en el sistema.

### 4. Seleccionar una base de datos
Para usar una base de datos específica, ejecutamos:
```sql
USE UcatecDB;
```
Esto nos permite trabajar con la base de datos **UcatecDB**.

### 5. Mostrar las tablas dentro de la base de datos
```sql
SHOW TABLES;
```
Este comando listará todas las tablas dentro de la base de datos seleccionada.

### 6. Consultar datos de una tabla
Para ver el contenido de la tabla **ALUMNO**, ejecutamos:
```sql
SELECT * FROM ALUMNO;
```
Esto mostrará todos los registros almacenados en la tabla.

## Errores Comunes y Soluciones
1. **Error: "Access denied for user 'root'@'localhost'"**
   - Asegúrate de ingresar la contraseña correcta (`root`).
   - Verifica que el contenedor se esté ejecutando (`docker ps`).

2. **Error de sintaxis en SQL**
   - Verifica la sintaxis de los comandos (`SELECT * FROM tabla;` en lugar de `selec from* tabla;`).

3. **Error: "docker: invalid reference format"**
   - Asegúrate de que los comandos estén bien escritos y sin caracteres erróneos.

## Conclusión
Con estos pasos, hemos logrado:
1. Descargar y ejecutar MySQL en Docker.
2. Acceder a la base de datos y listar su contenido.
3. Ejecutar consultas en la tabla **ALUMNO**.

Este proceso permite gestionar bases de datos de manera sencilla y eficiente dentro de un entorno Dockerizado.

