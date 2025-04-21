# Documentación del Proyecto Clashroom

Este archivo documenta el proceso de agregado el modelo `Clashroom` en la aplicación ASP.NET MVC


## 📦 Añadir Clashroom al Proyecto

### 1. Crear el Modelo Clashroom

En la carpeta `Models`, crear un archivo llamado `Clashroom.cs` con el siguiente contenido:


![Texto alternativo](images/1.PNG)


### 2. Añadir DbSet al Contexto

Editar el archivo `ApplicationDbContext.cs` y añadir la línea:

![Texto alternativo](images/2.PNG)

### 3. Crear y Aplicar Migraciones
Comando para crear una nueva migración, por ejemplo para añadir Clashroom
```
dotnet ef migrations add AddClashroom
```
Comando para crear el controlador automaticamente 
```
dotnet aspnet-codegenerator controller -name ClashroomController -m Clashroom -dc ApplicationDbContext -outDir Controllers -scripts
```

Compilar el proyecto
```
dotnet build
```
![Texto alternativo](images/3.PNG)

Ejecutar el proyecto
```
dotnet run
```
![Texto alternativo](images/44.PNG)

Para crear o actualizar la base de datos
```
dotnet ef database update
```
![Texto alternativo](images/4.PNG)



## 🧪 Resultado Final

Ingresar al host 
```
http://localhost:5134/Clashroom
```
![Texto alternativo](images/5.PNG)
---


**Fecha:** 20 de abril de 2025\
**Autor:** Mauricio Roa 

---

