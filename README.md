# proyecto-postgres

Docker Compose con PostgreSQL que crea automáticamente una tabla `productos` usando init.sql.

## Cómo usar
1. `docker compose up -d`
2. `docker exec -it postgres_example psql -U myuser -d mydatabase`
3. Dentro de psql: `\dt` y `SELECT * FROM productos;`

Credenciales:
- USER: myuser
- PASS: mypassword
- DB: mydatabase
- HOST: localhost:5432
