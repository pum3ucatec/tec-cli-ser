# Microevaluacion 3
## Tecnologías Utilizadas

- .NET 8.0 - Framework principal

- Entity Framework Core 8.0 - ORM para base de datos

- SQL Server - Base de datos

- ASP.NET Core MVC - Arquitectura web

- Swashbuckle (Swagger) - Documentación de APIs

- Bootstrap 5 - Estilos y diseño responsive

- JavaScript ES6 - Consumo de APIs desde frontend

### Estructura del Proyecto
```
Microevaluacion3/
├── Controllers/
│   ├── HomeController.cs              # Controlador principal MVC
│   ├── DefensesController.cs          # CRUD Defensas (MVC)
│   ├── StudentsController.cs          # CRUD Estudiantes (MVC)
│   ├── EvaluatorsController.cs        # CRUD Evaluadores (MVC)
│   └── Api/                           # Controladores API REST
│       ├── DefensesApiController.cs
│       ├── StudentsApiController.cs
│       └── EvaluatorsApiController.cs
├── Models/
│   ├── Defense.cs                     # Entidad Defensa
│   ├── Student.cs                     # Entidad Estudiante
│   ├── Evaluator.cs                   # Entidad Evaluador
│   └── DTOs/                          # Data Transfer Objects
│       ├── DefenseDTO.cs
│       ├── StudentDTO.cs
│       └── EvaluatorDTO.cs
├── Views/                             # Vistas MVC
│   ├── Home/
│   ├── Defenses/
│   ├── Students/
│   └── Evaluators/
├── Data/
│   └── ApplicationDbContext.cs        # Contexto de base de datos
├── wwwroot/
│   └── js/
│       ├── api-consumer.js            # Cliente JavaScript para APIs
│       └── api-demo.js                # Demostración interactiva
├── Program.cs                         # Configuración principal
├── appsettings.json                   # Configuración de conexión
└── Microevaluacion3.csproj            # Configuración del proyecto
```
![alt text](/Images/image.png)
--- 
### Paso 1: Creación del Proyecto MVC

Crear nuevo proyecto MVC con .NET 8.0

```
dotnet new mvc -n Microevaluacion3 -f net8.0
cd Microevaluacion3
```

### Paso 2: Instalación de Paquetes NuGet Esenciales

Entity Framework Core para SQL Server

```
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.0.0
```

Swagger para documentación de APIs

```
dotnet add package Swashbuckle.AspNetCore
```

Scaffolding para generar vistas automáticamente

```
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
```

Restaurar todos los paquetes

```
dotnet restore
```

### Paso 3: Configuración de Base de Datos (```appsettings.json```)

```
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=Microevaluacion3DB;Trusted_Connection=True;TrustServerCertificate=true;"
  }
}
```

![alt text](/Images/image2.png)

### Paso 4: Creación de Modelos de Datos

Se crearon 3 modelos principales en Models/:

1. Defense.cs - Para defensas de tesis/proyectos:

- Propiedades: Id, Title, Description, Career, DefenseType, Status, DefenseDate, etc.

- Relación: Cada defensa pertenece a un Student (clave foránea StudentId)

2. Student.cs - Para estudiantes:

- Propiedades: Id, Code, FirstName, LastName, Email, Career, Semester, IsActive

- Relación: Un estudiante puede tener múltiples defensas (colección Defenses)

3. Evaluator.cs - Para evaluadores/profesores:

- Propiedades: Id, Code, FirstName, LastName, Title, Type, Department, IsActive

![alt text](/Images/image3.png)

### Paso 5: Creación de Controladores API
Se crearon en Controllers/Api/:

1. DefensesApiController.cs - Endpoints REST para Defensas

- GET /api/DefensesApi (todas las defensas)

- GET /api/DefensesApi/{id} (defensa específica)

- POST /api/DefensesApi (crear defensa)

- PUT /api/DefensesApi/{id} (actualizar defensa)

- DELETE /api/DefensesApi/{id} (eliminar defensa)

- Endpoints especiales: /today, /career/{career}, /student/{studentId}

2. StudentsApiController.cs - Endpoints REST para Estudiantes

- Similar estructura pero para estudiantes

- Endpoints especiales: /active, /career/{career}, /search

3. EvaluatorsApiController.cs - Endpoints REST para Evaluadores

- Similar estructura pero para evaluadores

- Endpoints especiales: /type/{type}, /department/{department}

![alt text](/Images/image4.png)

### Paso 6: Generación de Controladores con Scaffolding

Generar controladores MVC con vistas CRUD completas
```
dotnet aspnet-codegenerator controller -name DefensesController -m Defense -dc ApplicationDbContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries --force
dotnet aspnet-codegenerator controller -name StudentsController -m Student -dc ApplicationDbContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries --force
dotnet aspnet-codegenerator controller -name EvaluatorsController -m Evaluator -dc ApplicationDbContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries --force
```

![alt text](/Images/image5.png)

### Paso 7: Creación de Migraciones

Crear migración inicial

```
dotnet ef migrations add InitialCreate
```

Aplicar migración a la base de datos

```
dotnet ef database update

```
### Paso 8: Comandos Finales de Verificación

Compilación final

```
dotnet clean
dotnet restore
dotnet build
```

Verificar migraciones

```
dotnet ef migrations list
```

Ejecutar aplicación

```
dotnet run
```

![alt text](/Images/image6.png)

## Vistas del sistema 

#### Defensas

![alt text](/Images/image7.png)

### Apis

![alt text](/Images/image8.png)

### Swagger

![alt text](/Images/image9.png)