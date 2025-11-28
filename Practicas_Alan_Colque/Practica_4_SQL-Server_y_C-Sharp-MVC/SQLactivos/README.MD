# Practica 4 SQL Server y C Sharp MVC

aplicación web MVC desarrollada en C# que se conecta a SQL Server Express para gestionar un inventario de activos. Incluye Entity Framework Core, migraciones de base de datos y una interfaz web para visualizar los datos.

## Tecnologías Utilizadas

- .NET 9.0 - Framework de desarrollo

- ASP.NET Core MVC - Arquitectura web

- Entity Framework Core 7.0 - ORM para base de datos

- SQL Server Express - Base de datos

- Microsoft.Data.SqlClient - Conector a SQL Server

- DotNetEnv - Manejo de variables de entorno

## Estructura del Proyecto
```
SQLactivos/
├── Controllers/
│   └── ActivosController.cs
├── Data/
│   └── AppDbContext.cs
├── Models/
│   └── Activo.cs
├── Views/
│   └── Activos/
│       └── Index.cshtml
├── Migrations/
├── Program.cs
├── SQLactivos.csproj
├── .env
└── .gitignore
```

## Guía de Implementación Paso a Paso

### Paso 1: Creación del Proyecto MVC

Crear nuevo proyecto MVC

```
dotnet new mvc -n SQLactivos
cd SQLactivos
```
![alt text](/Practicas_Alan_Colque/Practica_4_SQL-Server_y_C-Sharp-MVC/images/image1.png)

###  Paso 2: Instalación de Paquetes NuGet

Paquetes esenciales
```
dotnet add package Microsoft.Data.SqlClient
dotnet add package DotNetEnv
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

![alt text](/Practicas_Alan_Colque/Practica_4_SQL-Server_y_C-Sharp-MVC/images/image2.png)

Instalar CLI de Entity Framework globalmente
```
dotnet tool install --global dotnet-ef
```
### Paso 3: Configuración de Variables de Entorno

Crear un archivo ```.env``` el cual se encargara de realizar la coneccion con la base de datos

```
DB_HOST=Nombre del Servidor
DB_PORT=
DB_NAME=ActivosDB (Base de datos)
```

Crear un archivo ```.gitignore``` para evitar subir estos datos personales al repositorio

```
.env
*.db
bin/
obj/
```
### Paso 4: Configuración de la Conexión a BD

Insertar lo siguiente en su archivo ```Program.cs```
```
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using SQLactivos.Data;

var builder = WebApplication.CreateBuilder(args);

// Cargar variables .env
Env.Load();

// Configurar conexión
string dbHost = Environment.GetEnvironmentVariable("DB_HOST") ?? "Servidor"; (nombre del servidor)
string dbPort = Environment.GetEnvironmentVariable("DB_PORT") ?? "";
string dbName = Environment.GetEnvironmentVariable("DB_NAME") ?? "ActivosDB"; (base de datos)

string connectionString;


if (string.IsNullOrEmpty(dbPort))
{
    connectionString = 
        $"Server={dbHost};" +
        $"Database={dbName};" +
        "Trusted_Connection=true;" +
        "TrustServerCertificate=True;";
}
else
{
    connectionString = 
        $"Server={dbHost},{dbPort};" +
        $"Database={dbName};" +
        "Trusted_Connection=true;" +
        "TrustServerCertificate=True;";
}

Console.WriteLine($"Conectando a: {connectionString}");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```

### Paso 5: Creación del Modelo
Crear en la carpeta el siguiente archivo: ```Activo.cs```
Define la estructura de datos que se guardará en la base de datos. Entity Framework convertirá esta clase en una tabla.
```
namespace SQLactivos.Models
{
    public class Activo
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Categoria { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public DateTime FechaAdquisicion { get; set; } = DateTime.Now;
    }
}
```
### Paso 6: Configuración del DbContext

En el archivo ```Data/AppDbContext.cs``` insertar lo siguiente:
```
using Microsoft.EntityFrameworkCore;
using SQLactivos.Models;

namespace SQLactivos.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Activo> Activos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<Activo>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nombre).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Categoria).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Descripcion).HasMaxLength(500);
                entity.Property(e => e.FechaAdquisicion).IsRequired();
            });
        }
    }
}
```
DbContext: Es el puente entre tu código y la base de datos

DbSet: Representa una tabla específica en la base de datos

OnModelCreating: Define reglas de validación y restricciones

### Paso 7: Creación de Migraciones

Migraciones: Son como control de versiones para tu base de datos

InitialCreate: Genera el código SQL para crear las tablas desde tus modelos C#

Database Update: Ejecuta los scripts SQL en tu servidor de base de datos

```
# Crear migración inicial
dotnet ef migrations add InitialCreate

# Aplicar migración a la base de datos
dotnet ef database update
```
![alt text](/Practicas_Alan_Colque/Practica_4_SQL-Server_y_C-Sharp-MVC/images/image3.png)

### Paso 8: Implementación del Controlador

Maneja las peticiones HTTP del usuario el AppDbContext Accede a la base de datos mediante Entity Framework
Controllers/ActivosController.cs

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLactivos.Data;
using SQLactivos.Models;

namespace SQLactivos.Controllers
{
    public class ActivosController : Controller
    {
        private readonly AppDbContext _context;

        public ActivosController(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            try
            {
                var lista = await _context.Activos.ToListAsync();
                return View(lista);
            }
            catch (Exception ex)
            {
                ViewBag.Error = $"Error al cargar los activos: {ex.Message}";
                return View(new List<Activo>());
            }
        }
    }
}
```

### Paso 9: Creación de la Vista
En la carpeta views se debe crear un index.cshtml Views/Activos/Index.cshtml esta es la interfaz de usuario que ve el cliente, Recibe los datos del controlador y los muestra en la página html
```
@model IEnumerable<SQLactivos.Models.Activo>

@{
    ViewData["Title"] = "Lista de Activos";
}

<div class="container mt-4">
    <h2>Lista de Activos</h2>
    
    @if (ViewBag.Error != null)
    {
        <div class="alert alert-danger" role="alert">
            @ViewBag.Error
        </div>
    }

    @if (!Model.Any())
    {
        <div class="alert alert-info" role="alert">
            No hay activos registrados. La base de datos está funcionando correctamente.
        </div>
    }
    else
    {
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Descripción</th>
                        <th>Fecha Adquisición</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach (var item in Model)
                    {
                        <tr>
                            <td>@item.Id</td>
                            <td>@item.Nombre</td>
                            <td>@item.Categoria</td>
                            <td>@item.Descripcion</td>
                            <td>@item.FechaAdquisicion.ToString("dd/MM/yyyy")</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    }
</div>
```
![alt text](/Practicas_Alan_Colque/Practica_4_SQL-Server_y_C-Sharp-MVC/images/image4.png)
