MVC Gestión de Activos (CompanyAssets)

Este repositorio contiene una implementación profesional de un sistema CRUD (Crear, Leer, Actualizar, Eliminar) para activos. El objetivo es demostrar cómo construir una aplicación escalable utilizando ASP.NET Core MVC y SQL Server.

Requisitos Previos: ¿Qué necesitas?

Para ejecutar o reconstruir este proyecto, tu entorno de desarrollo debe cumplir con lo siguiente:

| Herramienta | Función Principal | Verificación (Terminal) |
| :--- | :--- | :--- |
| **.NET SDK 8.0** | Compilador y herramientas CLI para construir la app. | `dotnet --version` |
| **SQL Server** | Motor de base de datos. | `Get-Service "MSSQL$SQLEXPRESS"` |
| **VS Code** | Editor de código. | `code --version` |

Arquitectura y Flujo: ¿Cómo funciona?

El proyecto sigue el patrón MVC (Modelo-Vista-Controlador) con un enfoque Code-First:

1. Modelo (Models): Definimos la estructura de datos en clases C# primero.

2. Contexto (Data): Entity Framework traduce esas clases a tablas de SQL Server.

3. Controlador (Controllers): Maneja la lógica (guardar, editar) y conecta la base de datos con la vista.

4. Vista (Views): Muestra la interfaz de usuario (HTML/Razor) al usuario final.

### Guía de Implementación Paso a Paso

Iniciamos una plantilla vacía de MVC e instalamos las librerías que permiten a .NET hablar con SQL Server.

#### Crear la solución
![alt text](/IMAGES/image.png)
```
dotnet new mvc -n CompanyAssets
cd CompanyAssets
```

#### Instalar Entity Framework Core (El traductor C# <-> SQL)

```
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
```
![alt text](/IMAGES/image1.png)
### Definición del Modelo (Asset.cs)

Creamos la clase que representa la tabla en la base de datos. Usamos Data Annotations (como [Required]) para validar los datos automáticamente antes de que lleguen a la base de datos.

// Ubicación: Models/Asset.cs
```
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CompanyAssets.Models
{
    public class Asset
    {
        [Key] // Llave primaria (PK)
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio")]
        [Display(Name = "Nombre del Activo")]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        public string Categoria { get; set; } = string.Empty;

        [Required]
        [Display(Name = "N° de Serie")]
        public string NumeroSerie { get; set; } = string.Empty;

        // Propiedades opcionales
        public string Marca { get; set; } = string.Empty;
        public string Modelo { get; set; } = string.Empty;
        
        [Column(TypeName = "decimal(18,2)")] // Define precisión monetaria en SQL
        [DataType(DataType.Currency)]
        public decimal Precio { get; set; }

        [DataType(DataType.Date)]
        public DateTime FechaCompra { get; set; } = DateTime.Now;

        public string Estado { get; set; } = "Activo";
    }
}
```
![alt text](image2.png)

#### El Contexto de Datos (ApplicationDbContext.cs)

Esta clase actúa como el puente. Hereda de DbContext y expone nuestros modelos como DbSet (tablas).

// Ubicación: Data/ApplicationDbContext.cs

```
using Microsoft.EntityFrameworkCore;
using CompanyAssets.Models;

namespace CompanyAssets.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // Esta línea creará la tabla "Assets" en SQL Server
        public DbSet<Asset> Assets { get; set; }
    }
}

```
#### Conexión a Base de Datos (appsettings.json)

Aquí definimos dónde está nuestro servidor SQL.
Importante: Trusted_Connection=true usa tus credenciales de Windows, evitando poner usuario/contraseña en texto plano.

![alt text](/IMAGES/image3.png)

#### Inyección de Dependencias (Program.cs)

Configuramos la aplicación para que sepa que existe una base de datos SQL y la inyecte cuando sea necesario.

```
using Microsoft.EntityFrameworkCore;
using CompanyAssets.Data;

var builder = WebApplication.CreateBuilder(args);

// Servicios del contenedor
builder.Services.AddControllersWithViews();

// Configurar Entity Framework con SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configurar pipeline HTTP
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```

#### Migraciones (Code-First)

Este paso es crucial. No creamos la tabla en SQL manualmente. Le decimos a .NET: "Mira mi código C# y crea la base de datos por mí".

#### Crea el script de migración basado en tus modelos
```
dotnet ef migrations add InitialCreate
```
#### Ejecuta el script en SQL Server (Crea la DB y Tablas reales)
```
dotnet ef database update
```

#### Generación Automática (Scaffolding)

Para no escribir todo el código repetitivo del CRUD (Controlador y Vistas HTML), usamos el generador de código de .NET.

```
dotnet aspnet-codegenerator controller -name AssetController -m Asset -dc ApplicationDbContext -outDir Controllers --useDefaultLayout --referenceScriptLibraries
```

Esto genera automáticamente Controllers/AssetController.cs y todas las vistas en Views/Asset/.

![alt text](/IMAGES/image4.png)

### Cómo Ejecutar el Proyecto

Una vez completados los pasos anteriores, compila y lanza el servidor local:

```
dotnet run
```

![alt text](/IMAGES/image5.png)

Abre tu navegador en la dirección indicada (ej. https://localhost:XXXX) y navega a /Asset para ver el sistema funcionando.

![alt text](/IMAGES/image6.png)