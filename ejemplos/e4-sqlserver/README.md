# RUN
Para levantar el docker compose en la ubicacion del proyecto
```
docker-compose up -d
```
o
```
docker start sqlserver_blog
```
Para ingresar al plugin del contenedor
```
sqlcmd -S localhost -U SA -P "*********"
```

```
SELECT name FROM sys.databases;
GO
```
Otra opcion es utilizar directamente este comando para visualizar que el manejador de base de datos esta 


```
docker exec -it sqlserver_test /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "**********" -C -d master -Q "SELECT name FROM sys.databases;"
```