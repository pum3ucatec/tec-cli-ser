
# 📘 Manual: Crear una Base de Datos Oracle con Docker

## ✅ Requisitos Previos

Antes de comenzar, asegúrate de tener los siguientes softwares instalados:

- 🔧 **Docker Desktop**: [Descargar Docker](https://www.docker.com/products/docker-desktop)
- 🧠 **Oracle SQL Developer**(Windows 64-bit with JDK 17 included): [Descargar SQL Developer](https://www.oracle.com/database/sqldeveloper/technologies/download)

---

## 🐳 Paso 1: Descargar la Imagen de Oracle

Oracle ofrece una imagen gratuita para desarrollo desde su Container Registry. Abre tu terminal y ejecuta:

```bash
docker pull container-registry.oracle.com/database/free:latest
```
![Terminal descarga de imagen de docker](imagenes/img1.png)

> 🔐 Nota: Es posible que debas iniciar sesión en [container-registry.oracle.com](https://container-registry.oracle.com) y aceptar los términos de uso.

---

## 🚀 Paso 2: Ejecutar el Contenedor

Una vez descargada la imagen, puedes levantar un contenedor con este comando:

```bash
docker run -d --name "oracle-local" -p 1521:1521 -e ORACLE_PWD="Ora1234" container-registry.oracle.com/database/free:latest
```
![Terminal ejecucion contenedor](imagenes/img2.png)

📌 Parámetros importantes:

- `--name oracle-local`: Nombre del contenedor.

- `-p 1521:1521`: Expone el puerto 1521, que es el puerto por defecto para Oracle DB.

- `-e ORACLE_PWD="Ora1234"`: Define la contraseña del usuario SYS y SYSTEM.

---

## 🔍 Paso 3: Verificar que el contenedor esté corriendo

```bash
docker ps
```
![Deberias ver una salida parecida a esta](imagenes/img3.png)

Puedes ver los logs del contenedor con:

```bash
docker logs -f oracle-local
```
![Deberias ver una salida parecida a esta](imagenes/img4.png)

🟢 Espera el mensaje: `DATABASE IS READY TO USE!`

---

## 🧩 Paso 4: Conectarse desde SQL Developer

1. Abrir Oracle SQL Developer.
2. Click en "Nueva conexión":
3. Completa los datos (ejemplo):

   | Campo           | Valor        |
   |-----------------|--------------|
   | Nombre conexio  | UcatecDB     |
   | Usuario         | SYSTEM       |
   | Contraseña      | Ora1234      |
   | Hostname        | localhost    |
   | Puerto          | 1521         |
   | SID             | FREE         |
4. Haz click en **Probar** -> Si todo esta bien, da click en **Conectar**.

![Datos Base de datos](imagenes/img5.png)

---

## 🧾 Paso 5: Crear y Consultar una Tabla

Una vez conectado, puedes ejecutar los siguientes comandos SQL:

```sql
CREATE TABLE persona (
  id VARCHAR2(10),
  nombre VARCHAR2(30),
  edad NUMBER
);

INSERT INTO persona(id, nombre, edad) VALUES ('1', 'Juan Perez', 25);

SELECT * FROM persona;
```

![Creacion de tabla](imagenes/img6.png)

---

## 📄 (Opcional): Usar Docker Compose

En lugar de usar un comando largo en terminal, puedes crea un archivo `docker-compose.yml` con esta configuracion dentro:

```yaml
version: '3.9'

services:
  oracle-db:
    image: container-registry.oracle.com/database/free:latest
    container_name: oracle-local
    ports:
      - "1521:1521"
    environment:
      - ORACLE_PWD=Ora1234
    volumes:
      - oracle_data:/opt/oracle/oradata
    restart: always

volumes:
  oracle_data:
```

📁 Instrucciones:

1. Crea un archivo llamado docker-compose.yml en una carpeta vacía.

2. Pega el contenido anterior en el archivo.

3. En esa misma carpeta, abre una terminal y ejecuta:

```bash
docker-compose up -d
```

Esto va a:

- Descargar la imagen de Oracle si no está.

- Crear y levantar el contenedor con persistencia.

- Exponer el puerto 1521.

- Asignar la contraseña Ora1234 al usuario SYSTEM y SYS.

▶️ Comandos útiles con Docker Compose:

-Ver el estado de los servicios:
```bash
docker-compose ps
```
-Detener los servicios:
```bash
docker-compose down
```
-Ver logs:
```bash
docker-compose logs -f
```
---

### ▶️ Algunos comandos útiles:

- Levantar contenedor:

  ```bash
  docker-compose up -d
  ```

- Ver estado:

  ```bash
  docker-compose ps
  ```

- Ver logs:

  ```bash
  docker-compose logs -f
  ```

- Detener:

  ```bash
  docker-compose down
  ```

---

## 🛠 Problemas Comunes

- ❌ No conecta desde SQL Developer:
  - Verifica que el contenedor esté corriendo (`docker ps`).
  - Asegúrate de usar el SID correcto: `FREE`.

- ❌ Error de contraseña:
  - Verifica la variable `ORACLE_PWD` usada al iniciar el contenedor.

---
## 🧠 Recomendaciones

- Usa Docker Compose para facilitar la gestión del entorno.
- No uses esta imagen en producción.
- Puedes automatizar pruebas SQL dentro del contenedor para desarrollo.

---