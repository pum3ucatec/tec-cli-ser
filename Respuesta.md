# Guía para Crear y Ejecutar un Proyecto MVC en C# con .NET

# Crear nuevo proyecto MVC
dotnet new mvc -n e3-csharp

# Navegar a la carpeta del proyecto
cd e3-csharp

# Ejecutar el servidor de desarrollo
dotnet run

# Compilar el proyecto
dotnet build

```
Este comando compila el proyecto y verifica que no existan errores en el código fuente.

---

## ✅ ¡Listo!
Tu aplicación MVC básica en C# ya está lista para ser editada, extendida o desplegada.

Conexiones a base de datos y comandos de integracion

Agregar paquetes para trabajar con SqlServer y Entity Framework

```
dotnet add package Microsoft.Data.SqlClient
dotnet add package DotNetEnv
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

Compilar el proyecto
```
dotnet build
```

Ejecutar un proyecto

```
dotnet run
```

Para crear o actualizar la base de datos
```
dotnet ef database update
```

dotnet ef migrations add InitialCreate

Comando para crear una migracion, para actualizar la base de datos

```
dotnet ef migrations add AddSubject
```

Instala el tool `dotnet-aspnet-codegenerator`
```
dotnet tool install --global dotnet-aspnet-codegenerator
```

Generador de controladores y vistas de acuerdo a una Modelo
```
dotnet aspnet-codegenerator controller -name SubjectController -m Subject -dc ApplicationDbContext -outDir Controllers -scripts
```
## Arquitectura CLIENTE - SERVIDOR

```
dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson
```

```
dotnet add package Swashbuckle.AspNetCore
```

Cartar esta url en el browser
[swagger](http://localhost:5134/swagger/index.html)

-------------------------------------------------------------------------------------------------------------

e6-client-react

Iniciar el servidor backend (en la carpeta e3-csharp):

     dotnet run

Iniciar el servidor frontend (en la carpeta e6-client-react):

     npm install
     npm run dev

Si necesitas restaurar las dependencias del backend:

dotnet restore

¡Y listo! Con estos comandos tendrás el proyecto funcionando correctamente.