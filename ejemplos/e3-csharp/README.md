
# Guía para Crear y Ejecutar un Proyecto MVC en C# con .NET

Este documento describe los pasos básicos para crear, compilar y ejecutar un proyecto **MVC en C#** utilizando la CLI de .NET.

---

## 1. Verificar la versión de .NET instalada

```bash
dotnet --version
```
Este comando muestra la versión instalada del SDK de .NET. Es importante verificar que esté instalado correctamente antes de continuar.

---

## 2. Crear un nuevo proyecto MVC

```bash
dotnet new mvc -n e3-csharp
```
Crea un nuevo proyecto ASP.NET Core MVC llamado `e3-csharp`. La estructura del proyecto incluirá controladores, vistas y archivos de configuración.

---

## 3. Navegar a la carpeta del proyecto

```bash
cd csharp
```
Este comando cambia el directorio de trabajo a la carpeta del proyecto. **(Nota: debería ser `cd e3-csharp` si seguiste el nombre de la carpeta del paso anterior)**.

---

## 4. Ejecutar el servidor de desarrollo

```bash
dotnet run
```
Compila el proyecto y levanta un servidor de desarrollo para probar la aplicación web. Por defecto, estará disponible en `http://localhost:5000`.

---

## 5. Compilar el proyecto

```bash
dotnet build
```
Este comando compila el proyecto y verifica que no existan errores en el código fuente.

---

## ✅ ¡Listo!
Tu aplicación MVC básica en C# ya está lista para ser editada, extendida o desplegada.

Conexiones a base de datos y comandos de integracion

dotnet add package Microsoft.Data.SqlClient
dotnet add package DotNetEnv

dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools

dotnet build

dotnet ef migrations add InitialCreate

dotnet ef database update

dotnet build
dotnet ef migrations add AddSubject
dotnet ef database update
