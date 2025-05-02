# 🏫 Examen Final Classroom - CRUD Fullstack con React + .NET + Docker + Swagger
Estudiante: Mauricio Roa

Este proyecto implementa un sistema de gestión de aulas (Classroom) usando un stack moderno:  
**React** para el frontend, **.NET Web API** para el backend y **Docker** para la base de datos.

---

## 🚀 Paso a paso del desarrollo

### 🐳 1. Levantar base de datos con Docker Compose

Primero, levantamos el contenedor con la base de datos (por ejemplo, SQL Server o PostgreSQL):

```bash
docker-compose up -d
```
✅ Esto crea y ejecuta un contenedor que aloja nuestra base de datos de desarrollo.

### ⚙️ 2. Crear el ClassroomApiController en el backend
Luego, en el proyecto backend con .NET, se creó el controlador:

📄 Controllers/ClassroomApiController.cs
```
Este controlador contiene las rutas necesarias para el CRUD:

GET /ClassroomApi → Lista todas las aulas

GET /ClassroomApi/{id} → Obtiene una aula por ID

POST /ClassroomApi → Crea una nueva aula

PUT /ClassroomApi/{id} → Actualiza un aula

DELETE /ClassroomApi/{id} → Elimina un aula
```
![Texto alternativo](images/1.PNG)



### 🌐 3. Crear frontend en React (e6-client-react)
En el proyecto React, se integró el frontend con el backend. Aquí los pasos principales:


## Se implemento ClassroomApi.ts

![Texto alternativo](images/3.PNG)

## El archivo de ClassroomForm
![Texto alternativo](images/3.1.PNG)



### 🧩 4. Componentes principales
```
ListClassroomsPage.tsx
```
Muestra una tabla con todos los registros. Permite editar o eliminar.

CreateClassroomPage.tsx
```
Contiene el formulario para crear una nueva aula.
```

EditClassroomPage.tsx
```
Carga datos del aula existente y permite su edición.
```

ClassroomForm.tsx
```
Formulario reutilizable que se adapta a creación o edición.
```
![Texto alternativo](images/3.2.PNG)

🔁 React Router
Se añadieron estas rutas en Router.tsx:

```
{
  path: "/classrooms",
  element: <ListClassroomsPage />,
},
{
  path: "/classrooms/create",
  element: <CreateClassroomPage />,
},
{
  path: "/classrooms/edit/:id",
  element: <EditClassroomPage />,
}
```
![Texto alternativo](images/3.3.PNG)

### 🧪 5. Probar en el navegador
Levantar el frontend con:



📄 http://localhost:5173/classrooms → Listado de aulas

➕ http://localhost:5173/classrooms/create → Crear nueva aula

✏️ http://localhost:5173/classrooms/edit/1 → Editar aula con ID 1

✅ Resultado Final
API funcional con Swagger para probar endpoints 🎯

Interfaz bonita con React + Tailwind CSS 🎨

CRUD completo con rutas protegidas y navegación intuitiva 🌍

¡Y listo! 🎉 Ya tienes tu propio sistema CRUD para Aulas funcionando de extremo a extremo.
![Texto alternativo](images/2.PNG)

 Tambien se puede eliminar
 ![Texto alternativo](images/2.1.PNG)

 y crear 
 ![Texto alternativo](images/2.2.PNG)