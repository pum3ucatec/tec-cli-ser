# Guía para configurar y trabajar con MongoDB, Docker.

Esta guía cubre todo el proceso para instalar MongoDB, configurar Docker para ejecutar MongoDB, usar Mongo Compass para interactuar con la base de datos y acceder a los datos desde la terminal usando `mongosh`.

## Requisitos previos

Antes de empezar, asegúrate de tener lo siguiente instalado en tu sistema:

- **Docker**: Para crear y gestionar contenedores.
- **MongoDB**: Para gestionar las bases de datos.
- **Mongo Compass**: Herramienta gráfica para interactuar con MongoDB.
- **mongosh**: Shell interactivo de MongoDB.
- **Sistema operativo**: Esta guía está orientada a sistemas Windows, pero puede aplicarse a otros con algunas variaciones.

## Paso 1: Instalar MongoDB y Docker

### Instalar Docker
1. Descarga e instala Docker desde su [sitio oficial](https://www.docker.com/products/docker-desktop).
2. Sigue las instrucciones según tu sistema operativo.
3. Verifica la instalación con el siguiente comando en tu terminal o PowerShell:
   ```bash
   docker --version
   ```
![alt text](image.png)

### Instalar MongoDB
1. **Mongo Compass**: Descarga e instala Mongo Compass desde [aquí](https://www.mongodb.com/try/download/compass).
2. **Mongo Shell (`mongosh`)**: Asegúrate de instalar Mongo Shell siguiendo las instrucciones de [MongoDB Documentation](https://www.mongodb.com/try/download/shell).

### Instalar y configurar `mongosh`:
1. Abre el terminal de PowerShell y verifica la instalación de `mongosh`:
   ```bash
   mongosh --version
   ```
![alt text](image-1.png)

## Paso 2: Crear un contenedor Docker con MongoDB

1. Crea un archivo `docker-compose.yml` en tu proyecto con el siguiente contenido:
   ```yaml
   version: '3.8'

   services:
     mongo:
       image: mongo:latest
       container_name: mongodb
       restart: always
       ports:
         - "27018:27017"
       volumes:
         - mongodb_data:/data/db
       networks:
         - mongo_network

     mongo-express:
       image: mongo-express:latest
       container_name: mongo-express
       restart: always
       ports:
         - "8081:8081"
       environment:
         ME_CONFIG_MONGODB_SERVER: mongo
         ME_CONFIG_MONGODB_PORT: 27017
         ME_CONFIG_BASICAUTH_USERNAME: admin
         ME_CONFIG_BASICAUTH_PASSWORD: admin123
       depends_on:
         - mongo
       networks:
         - mongo_network

   volumes:
     mongodb_data:
       driver: local

   networks:
     mongo_network:
       driver: bridge
   ```

2. En la misma carpeta donde guardaste el archivo `docker-compose.yml`, abre la terminal y ejecuta:
   ```bash
   docker-compose up -d
   ```

3. Verifica que los contenedores están corriendo:
   ```bash
   docker ps
   ```
![alt text](image-11.png)

## Paso 3: Crear una base de datos en MongoDB desde Mongo Compass

1. Abre **Mongo Compass** e ingresa los siguientes detalles de conexión:
   - **Hostname**: `localhost`
   - **Puerto**: `27018`
   - **Autenticación**: No es necesaria en esta configuración

   ![alt text](image-3.png)
   
2. Conéctate al contenedor de MongoDB y, una vez conectado, crea la base de datos `Ucatec` y una colección `alumnos` para almacenar los datos.

   **Pasos en Mongo Compass**:
   - En la interfaz de Mongo Compass, selecciona "Crear base de datos".
   - Crea la base de datos `Ucatec` y agrega una colección llamada `alumnos`.

   ![alt text](image-4.png)

## Paso 4: Insertar datos en Mongo Compass

Desde Mongo Compass, inserta algunos documentos de ejemplo en la colección `alumnos`. Aquí tienes un ejemplo de cómo insertar datos:

```json
{
   "nombre": "Juan Pérez",
   "edad": 21,
   "carrera": "Ingeniería",
   "promedio": 8.5
}
```

Repite el proceso para agregar más datos de alumnos si lo deseas.

![alt text](image-5.png)

## Paso 5: Acceder a MongoDB desde la terminal (PowerShell) usando `mongosh`

1. Accede al contenedor Docker donde se está ejecutando MongoDB:
   ```bash
   docker exec -it mongodb mongosh
   ```
![alt text](image-6.png)

2. **Ver las bases de datos**:
   Una vez dentro de `mongosh`, puedes ver las bases de datos disponibles con:
   ```javascript
   show dbs
   ```
![alt text](image-7.png)

3. **Acceder a la base de datos "Ucatec"**:
   Si la base de datos `Ucatec` ya está creada, puedes seleccionarla con:
   ```javascript
   use Ucatec
   ```
![alt text](image-8.png)

4. **Ver las colecciones**:
   Para listar las colecciones dentro de `Ucatec`, ejecuta:
   ```javascript
   show collections
   ```
![alt text](image-9.png)

5. **Consultar los documentos de la colección "alumnos"**:
   Para ver todos los documentos de la colección `alumnos`, usa:
   ```javascript
   db.alumnos.find().pretty()
   ```
   ![alt text](image-10.png)

## Paso 6: Acceder a Mongo Express (Interfaz Web)

1. Abre tu navegador y ve a:
   ```
   http://localhost:8081
   ```

2. Usa las siguientes credenciales:
   - Usuario: `admin`
   - Contraseña: `admin123`

## Conclusión

Con esta guía, has aprendido a configurar MongoDB en un contenedor Docker, crear una base de datos y una colección desde Mongo Compass, insertar datos y consultarlos desde la terminal usando `mongosh`. Esta es una forma práctica de trabajar con MongoDB en entornos de desarrollo locales utilizando Docker.

¡Ahora estás listo para continuar trabajando con MongoDB de manera eficiente!

```