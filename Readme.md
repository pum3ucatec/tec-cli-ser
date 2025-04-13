🐳 Guía: Crear una base de datos PostgreSQL con Docker
✅ Requisitos:
Tener Docker instalado

Terminal o línea de comandos

1. 🏗️ Crear un contenedor de PostgreSQL
Usa este comando para crear y correr un contenedor PostgreSQL:

Copiar

docker run --name mi_postgres \ -e POSTGRES_USER=usuario \ -e POSTGRES_PASSWORD=contrasena \
  -e POSTGRES_DB=mi_basededatos \
  -p 5432:5432 \
  -d postgres
Explicación de los parámetros:

--name: nombre del contenedor

-e: variables de entorno (usuario, contraseña, base de datos)

-p: expone el puerto 5432 del contenedor al host

-d: modo "detached" (en segundo plano)

postgres: imagen oficial de PostgreSQL (descargará la última versión)

2. 🧪 Verificar que esté corriendo
bash
Copiar

docker ps

Deberías ver tu contenedor mi_postgres en la lista.

3. 🛠️ Conectarte al contenedor (opcional)
Puedes ingresar al contenedor con:


Copiar

docker exec -it mi_postgres psql -U usuario -d mi_basededatos

Ahí puedes correr comandos SQL como:

sql

CREATE TABLE ejemplo (
  id SERIAL PRIMARY KEY,
  nombre TEXT
);

4. 💾 Conectarte desde tu máquina (cliente externo)
Puedes usar herramientas como:

psql desde terminal:

Copiar

psql -h localhost -p 5432 -U usuario -d mi_basededatos
DBeaver, pgAdmin, TablePlus, etc.

5. 🧼 Parar o eliminar el contenedor
Detener el contenedor:

Copiar

docker stop mi_postgres

Eliminar el contenedor:


Copiar

docker rm mi_postgres