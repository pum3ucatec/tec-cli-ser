# ActivosApp (ASP.NET Core MVC)

**MVC** conectada a **SQL Server** (o LocalDB) con CRUD para la tabla `Activos`.
Este README explica paso a paso la instalación, configuración, migraciones, scaffolding y resolución de errores que surgieron durante el desarrollo.

---

## 🧾 Resumen

Proyecto demostrativo que maneja activos (inventario) con las operaciones **Create / Read / Update / Delete (CRUD)**.
Stack principal:

* .NET 9 (o la versión .NET con la que trabajes)
* ASP.NET Core MVC
* Entity Framework Core (EF Core, versión debe coincidir con .NET)
* SQL Server o LocalDB
* VS Code + terminal / PowerShell
* SQL Server Management Studio (SSMS) opcional para ver la BD

---

## ✅ Requisitos previos

* [.NET SDK](https://dotnet.microsoft.com/) (ej. .NET 9) instalado y en PATH.
  `dotnet --version` → confirma la versión.
* SQL Server (o LocalDB) disponible.

  * Para LocalDB: `sqllocaldb i` muestra instancias, p.ej. `MSSQLLocalDB`.
* SQL Server Management Studio (SSMS) (opcional, pero recomendado).
* VS Code.
* (Opcional) `dotnet-aspnet-codegenerator` para scaffolding.

---

## 1) Crear la base de datos (script SQL — ejecutar en SSMS)

```sql
-- Crear base de datos si no existe
IF DB_ID('MiEmpresaDB') IS NULL
BEGIN
    CREATE DATABASE MiEmpresaDB;
END
GO

USE MiEmpresaDB;
GO

-- Tabla Activos
IF OBJECT_ID('dbo.Activos','U') IS NOT NULL
    DROP TABLE dbo.Activos;
GO

CREATE TABLE dbo.Activos
(
    ActivoId INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(150) NOT NULL,
    Categoria VARCHAR(100) NULL,
    FechaAdquisicion DATETIME NULL,
    Valor DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    Estado VARCHAR(50) NULL
);
GO
```

---

## 2) Cadena de conexión (`appsettings.json`)

**IMPORTANTE:** JSON debe ser válido — no usar `...`.

Ejemplo (LocalDB):

```json
{
   //Aqui en Server=  va nuestro id de nuestro local
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=MiEmpresaDB;Trusted_Connection=True;TrustServerCertificate=True"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

Ejemplo (SQL Server con usuario):

```json
"DefaultConnection": "Server=MI_SERVIDOR\\SQLEXPRESS;Database=MiEmpresaDB;User Id=miusuario;Password=mipassword;TrustServerCertificate=True"
```

> Nota: en JSON la barra invertida `\` se escribe doble `\\`.

---

## 3) Paquetes NuGet obligatorios (en la carpeta del `.csproj`)

Ejecutar en la raíz del proyecto (donde está `ActivosApp.csproj`):

```powershell
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 9.0.0
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 9.0.0
dotnet add package Microsoft.EntityFrameworkCore.Design --version 9.0.0
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design --version 9.0.0
```

> Ajustá versiones a la versión de .NET instalada. Si usás .NET 8, usa EF Core 8. Si .NET 9, EF Core 9.
En el proyecto se tuvo que ajustar la version a 9 

---

## 4) Tool global (scaffolding)

Instalación global del generador (opcional, recomendado para scaffolding) o crear el CRUD de manera rapida:

```powershell
dotnet tool install -g dotnet-aspnet-codegenerator
# si ya existía:
dotnet tool update -g dotnet-aspnet-codegenerator
```

Si Windows no reconoce la tool, agrega la ruta de herramientas globales:

```powershell
setx PATH "$env:PATH;$env:USERPROFILE\.dotnet\tools"
# luego cerrar y reabrir la terminal
```

---

## 5) Archivos clave (snippets)

**Model: `Models/Activo.cs`**

```csharp
using System;
using System.ComponentModel.DataAnnotations;

namespace ActivosApp.Models
{
    public class Activo
    {
        public int ActivoId { get; set; }

        [Required]
        [StringLength(150)]
        public string Nombre { get; set; }

        [StringLength(100)]
        public string Categoria { get; set; }

        public DateTime? FechaAdquisicion { get; set; }

        [Required]
        [DataType(DataType.Currency)]
        public decimal Valor { get; set; }

        // Puedes evitar la warning haciendo:
        // public string? Estado { get; set; }    // <-- acepta null
        // o inicializando: public string Estado { get; set; } = "";
        public string? Estado { get; set; }
    }
}
```

**DbContext: `Data/ApplicationDbContext.cs`**

```csharp
using Microsoft.EntityFrameworkCore;
using ActivosApp.Models;

namespace ActivosApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<Activo> Activos { get; set; }
    }
}
```

**ErrorViewModel (soluciona error de compilación)**
`Models/ErrorViewModel.cs`
En la plantilla de MVC no se me creo mi archivo de ErrorView o lo borre sin querer y lo tuve que volver a crear
```csharp
namespace ActivosApp.Models
{
    public class ErrorViewModel
    {
        public string? RequestId { get; set; }
        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
```

**Program.cs (registro DbContext)**

```csharp
using ActivosApp.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// standard middleware...
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```

---

## 6) Migraciones (EF Core)

Crear la migración inicial y aplicar:

```powershell
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Si el comando `dotnet ef` falla: verifica que `Microsoft.EntityFrameworkCore.Tools` esté instalado y que tu proyecto compile (`dotnet build`).

---

## 7) Scaffolding (generar Controller + Vistas CRUD)

**En PowerShell**: poner todo en una sola línea (evitar `\` al final de línea):

```powershell
dotnet aspnet-codegenerator controller -name ActivosController -m Activo -dc ApplicationDbContext --useDefaultLayout --relativeFolderPath Controllers --referenceScriptLibraries --databaseProvider Microsoft.EntityFrameworkCore.SqlServer
```

Alternativa para multi-línea en PowerShell (con backtick `` ` ``):

```powershell
dotnet aspnet-codegenerator controller `
  -name ActivosController `
  -m Activo `
  -dc ApplicationDbContext `
  --useDefaultLayout `
  --relativeFolderPath Controllers `
  --referenceScriptLibraries `
  --databaseProvider Microsoft.EntityFrameworkCore.SqlServer
```

> **Tener en cuenta**: en PowerShell `\` al final de línea no funciona como en Linux; usar backtick o una sola línea.

---

## 8) Errores comunes y cómo los solucionamos

### 1) `Microsoft.EntityFrameworkCore` no encontrado (CS0234)

* Causa: faltan packages EF Core.
* Solución: `dotnet add package Microsoft.EntityFrameworkCore.SqlServer` y `Design`/`Tools` correspondientes.

### 2) `ErrorViewModel` no encontrado

* Causa: el proyecto no tiene `Models/ErrorViewModel.cs`.
* Solución: crear `ErrorViewModel.cs` con la clase mostrada arriba.

### 3) Warning CS8618: propiedad no-nullable sin inicializar

* Explicación: nullable reference types activado.
* Soluciones posibles:

  * Declarar la propiedad como nullable: `public string? Estado { get; set; }`
  * Inicializar con valor por defecto: `public string Estado { get; set; } = "";`
  * Usar `required` si usas C# 11: `public required string Estado { get; set; }`

### 4) Scaffolder: Could not load file or assembly 'Microsoft.EntityFrameworkCore, Version=9.0.0.0'

* Causa: mismatch entre versión EF Core que el generator intenta cargar y la instalada.
* Solución:

  * Alinear versiones: instalar EF Core versión que corresponda a tu .NET (`dotnet add package ... --version 9.0.0` si usás .NET 9).
  * `dotnet clean` y `dotnet restore` después de cambiar versiones.

### 5) PowerShell parse errors al usar `\` para multi-línea

* Causa: backslash `\` no funciona como continuador en PowerShell.
* Solución: usar **comando en una sola línea** o usar **backtick** `` ` `` al final de cada línea.

### 6) Scaffolder no genera vistas

* Causa: herramientas no instaladas, generator no reconocido o falló por versión.
* Solución: instalar `dotnet-aspnet-codegenerator` global, `Microsoft.VisualStudio.Web.CodeGeneration.Design` en el proyecto y ejecutar el comando correctamente (una sola línea).

---

## 9) Ejecutar la aplicación

```powershell
dotnet run
```

En la consola vas a ver la URL (ej. `http://localhost:5156` o `https://localhost:5001`).
Ir a `http://localhost:5156/Activos` (o la URL que indique) para ver la lista de activos.

Si ves **404**, revisa:

* ¿Existe `Controllers/ActivosController.cs`?
* ¿Existe carpeta `Views/Activos` con `Index.cshtml`?
* ¿El route default está en `Program.cs`? (`pattern: "{controller=Home}/{action=Index}/{id?}"`)
En un momento el scaffolder no me estaba creando correctamente las vistas y tuve que ponerle un **clear** y **restore** a mi dotnet
---

## 10) Comandos útiles resumen

```powershell
# comprobar dotnet
dotnet --version

# instalar paquetes (ejemplo .NET 9)
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 9.0.0
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 9.0.0
dotnet add package Microsoft.EntityFrameworkCore.Design --version 9.0.0
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design --version 9.0.0

# instalar tool global
dotnet tool install -g dotnet-aspnet-codegenerator

# crear migración y actualizar bd
dotnet ef migrations add InitialCreate
dotnet ef database update

# scaffolding (una sola línea)
dotnet aspnet-codegenerator controller -name ActivosController -m Activo -dc ApplicationDbContext --useDefaultLayout --relativeFolderPath Controllers --referenceScriptLibraries --databaseProvider Microsoft.EntityFrameworkCore.SqlServer

# ejecutar
dotnet run
```

---

## 11) Troubleshooting adicional

* Si `dotnet ef` arroja errores: verifica que el proyecto compile (`dotnet build`) y que `Microsoft.EntityFrameworkCore.Tools` esté en el `.csproj`.
* Si scaffolder lanza errores de assembly: asegúrate que la versión del paquete y del SDK coincidan (EF Core vs .NET).
* Si SQL Server no conecta: revisa `Server name` en SSMS y el tipo de autenticación (Windows vs SQL).
* Para LocalDB: usa `Server=(localdb)\\MSSQLLocalDB`.

---

## 12) Recursos útiles

* [.NET docs](https://learn.microsoft.com/dotnet/)
* [EF Core docs](https://learn.microsoft.com/ef/core/)
* [Scaffolding docs](https://learn.microsoft.com/aspnet/core/tutorials/first-mvc-app/adding-model)
* [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/sql/ssms/)
---

## 13) Pruebas de funcionamiento
### Vista 1 Registro
![Regist](images\VISTA1.png)
### Vista 2 Lista
![Regist](images\VISTA2.png)
### Proyecto buildeado
![Regist](images\build.png)
### Base de datos funcionando
![Regist](images\SSM.png)