# Documentación del Proyecto Classroom

Este archivo documenta el proceso de agregado el modelo `Clashroom` en la aplicación ASP.NET MVC


## 📦 Añadir Classroom al Proyecto

### 1. Crear el Modelo Classroom

En la carpeta `Models`, crear un archivo llamado `Classroom.cs` con el siguiente contenido:


![Texto alternativo](images/1.PNG)


### 2. Añadir DbSet al Contexto

Editar el archivo `ApplicationDbContext.cs` y añadir la línea:

![Texto alternativo](images/2.PNG)

### 3. Crear y Aplicar Migraciones
Comando para crear una nueva migración, por ejemplo para añadir Classroom
```
dotnet ef migrations add AddClassroom
```
![Texto alternativo](images/3.PNG)

Comando para crear el controlador automaticamente 
```
dotnet aspnet-codegenerator controller -name ClassroomController -m Classroom -dc ApplicationDbContext -outDir Controllers -scripts
```
![Texto alternativo](images/5.PNG)
Compilar el proyecto
```
dotnet build
```
![Texto alternativo](images/6.PNG)

Ejecutar el proyecto
```
dotnet run
```
![Texto alternativo](images/66.PNG)

Para crear o actualizar la base de datos
```
dotnet ef database update
```
![Texto alternativo](images/4.PNG)



## 🧪 Resultado Final

Ingresar al host 
```
http://localhost:5134/Classroom
```
![Texto alternativo](images/7.PNG)
---


**Fecha:** 20 de abril de 2025\
**Autor:** Mauricio Roa 

---

