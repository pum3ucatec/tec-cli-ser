# Tecnologías Cliente Servidor - Microevaluación N°2

## Descripción
En esta microevaluación, cada grupo deberá configurar y ejecutar un contenedor con Docker Compose utilizando el **DBMS asignado**. Además, deberán conectarse a la base de datos mediante un cliente adecuado, ya sea una aplicación de escritorio o una aplicación web agregada al `docker-compose.yml`. Cada integrante debe subir una rama

## Fecha de entrega
📅 **04/04/2025**

## Asignación de DBMS por grupo:
- 🟠 **Grupo 1** - Oracle
- 🔵 **Grupo 2** - SQL Server
- 🟢 **Grupo 3** - MongoDB
- 🟣 **Grupo 4** - PostgreSQL

## Requisitos
Antes de comenzar, asegúrate de tener instalados los siguientes prerequisitos:

- **Docker**: [Instalar Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Instalar Docker Compose](https://docs.docker.com/compose/install/)
- **Git**: [Instalar Git](https://git-scm.com/downloads)
- **Bases de datos**:
  - [Oracle Database](https://www.oracle.com/database/technologies/)  
  - [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server)  
  - [MongoDB](https://www.mongodb.com/try/download/community)  
  - [PostgreSQL](https://www.postgresql.org/download/)  

## Instrucciones
1. **Crear una rama en GitHub** con el nombre:
   ```sh
   git checkout -b GastonQuelali/Microevaluacion2
   ```
2. **Configurar un contenedor con Docker Compose** utilizando el DBMS asignado.
3. **Conectarse al DBMS** mediante un cliente adecuado:
   - Aplicación de escritorio (Ejemplo: MySQL Workbench, DBeaver, SSMS, etc.).
   - Aplicación web dentro de Docker Compose (Ejemplo: phpMyAdmin para MySQL/MariaDB, pgAdmin para PostgreSQL, etc.).
4. **Documentar el proceso** en un archivo Markdown `Respuesta.md` dentro del repositorio:
   - Paso a paso detallado.
   - Configuración del `docker-compose.yml`.
   - Comandos utilizados.
   - Capturas de pantalla del proceso.
5. **Subir la rama al repositorio GitHub** con los cambios realizados:
   ```sh
   git add .
   git commit -m "Microevaluación 2 - Configuración del DBMS"
   git push origin GastonQuelali/Microevaluacion2
   ```

## Evaluación
- ✅ Configuración correcta del `docker-compose.yml`.
- ✅ Uso del cliente adecuado.
- ✅ Documentación clara en `Respuesta.md`.
- ✅ Evidencias en capturas de pantalla.

🛠 ¡Buena suerte y éxito en la microevaluación! 🚀