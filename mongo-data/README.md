## Manual de MongoDB docker

## Pasos Ejecutados

### Paso 1: Descargar Imagen de MongoDB
# Descargar la imagen oficial de MongoDB
```Terminal
docker pull mongo:latest
```
---
![alt text](/mongo-data/images/DOCKER%20PULL%20MONGO.png)
---
### Paso 2: Crear Directorio para Datos
```Terminal
mkdir mongo-data
cd mongo-data
```
![alt text](/mongo-data/images/dIR.png)
---

### Paso 3: Ejecutar Contenedor MongoDB
#### Ejecutar contenedor con configuración básica
```
docker run -d `
  --name mongodb-container `
  -p 27017:27017 `
  -v ${PWD}/data:/data/db `
  -e MONGO_INITDB_ROOT_USERNAME=admin `
  -e MONGO_INITDB_ROOT_PASSWORD=password123 `
  mongo:latest
```
---

### Paso 4: Verificar que el Contenedor está Corriendo
#### Verificar estado del contenedor
```
docker ps
```
#### Ver logs del contenedor
```
docker logs mongodb-container
```
![alt text](/mongo-data/images/DOCKERRUN.png)
---

### Paso 5: Conectarse al Contenedor MongoDB
#### Conectarse al contenedor con MongoDB Shell

```Terminal
docker exec -it mongodb-container mongosh `
  -u admin `
  -p password123 `
  --authenticationDatabase admin
```
![alt text](/mongo-data/images/Captura%20de%20pantalla%202025-11-16%20183324.png)
---
### Paso 6: Comandos Básicos de MongoDB
#### Una vez dentro de MongoDB Shell, ejecuta estos comandos:
#### Mostrar bases de datos
```Terminal
show dbs    
```
#### Crear/usar una nueva base de datos
```Terminal
use mi_empresa
```
#### Crear una colección (tabla)
```Terminal
db.createCollection("empleados")
```
#### Mostrar colecciones
```Terminal
show collections
```
---
### Ejemplo 1: Insertar Datos Básicos
#### Insertar un documento en la colección empleados
```Terminal
db.empleados.insertOne({
  nombre: "Juan Pérez",
  edad: 30,
  puesto: "Desarrollador",
  salario: 50000,
  departamento: "TI",
  fecha_contratacion: new Date(),
  habilidades: ["JavaScript", "Node.js", "MongoDB"],
  activo: true
})
```
---
### Ejemplo 2: Consultas Básicas
#### Consultar todos los empleados
```Terminal
db.empleados.find()
```
#### Consultar empleados activos
```Terminal
db.empleados.find({ activo: true })
```
#### Consultar empleados de TI con salario mayor a 48000
```Terminal
db.empleados.find({
  departamento: "TI",
  salario: { $gt: 48000 }
})
```
#### Consultar con proyección (solo campos específicos)
```Terminal
db.empleados.find(
  { departamento: "TI" },
  { nombre: 1, puesto: 1, salario: 1, _id: 0 }
)
```
---
### Ejemplo 3: Actualizaciones
#### Actualizar salario de un empleado
```Terminal
db.empleados.updateOne(
  { nombre: "Juan Pérez" },
  { $set: { salario: 52000 } }
)
```
#### Agregar una habilidad a un empleado
```Terminal
db.empleados.updateOne(
  { nombre: "María García" },
  { $push: { habilidades: "Illustrator" } }
)
```
---
### Ejemplo 5: Eliminaciones
#### Desactivar un empleado (eliminación lógica)
```Terminal
db.empleados.updateOne(
  { nombre: "Ana Martínez" },
  { $set: { activo: false } }
)
```
#### Eliminar un empleado completamente
```Terminal
db.empleados.deleteOne({ nombre: "Ana Martínez" })
```
---