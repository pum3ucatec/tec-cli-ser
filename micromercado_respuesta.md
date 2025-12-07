# 🛒 Sistema de Gestión de Micro Mercado - MVC con C# y SQL Server

## 📋 Descripción del Proyecto

Sistema completo de gestión para un micro mercado desarrollado con **ASP.NET Core MVC**, **Entity Framework Core** y **SQL Server**. Incluye gestión de productos, categorías, control de inventario y registro de ventas con actualización automática de stock.

---

## 🏗️ Arquitectura MVC

### ¿Qué es MVC?

**MVC (Model-View-Controller)** separa la aplicación en tres componentes:

### 📦 Model (Modelo)
**Ubicación:** `Models/`

**Entidades:**
- `Producto.cs` - Representa los productos del mercado
- `Categoria.cs` - Categorías de productos
- `Venta.cs` - Registro de ventas
- `DetalleVenta.cs` - Items individuales de cada venta
- `MercadoContext.cs` - Contexto de Entity Framework

**Responsabilidades:**
- Define la estructura de datos
- Maneja validaciones
- Gestiona relaciones entre entidades
- Conecta con la base de datos

### 🎮 Controller (Controlador)
**Ubicación:** `Controllers/`

**Controladores:**
- `ProductoController.cs` - CRUD de productos
- `CategoriaController.cs` - CRUD de categorías
- `VentaController.cs` - Registro y gestión de ventas

**Responsabilidades:**
- Procesa peticiones del usuario
- Ejecuta lógica de negocio
- Actualiza stock automáticamente
- Valida operaciones
- Comunica modelos con vistas

### 🎨 View (Vista)
**Ubicación:** `Views/`

**Vistas por módulo:**
```
Views/
├── Producto/
│   ├── Index.cshtml   - Lista de productos
│   ├── Create.cshtml  - Agregar producto
│   ├── Edit.cshtml    - Editar producto
│   └── Delete.cshtml  - Eliminar producto
├── Categoria/
│   ├── Index.cshtml   - Lista de categorías
│   ├── Create.cshtml  - Agregar categoría
│   ├── Edit.cshtml    - Editar categoría
│   └── Delete.cshtml  - Eliminar categoría
└── Venta/
    ├── Index.cshtml   - Lista de ventas
    ├── Create.cshtml  - Nueva venta
    ├── Details.cshtml - Detalle de venta
    └── Delete.cshtml  - Cancelar venta
```

---

## 🔗 Conexión con SQL Server

### 1. Entity Framework Core como ORM

```csharp
// MercadoContext.cs gestiona la conexión
public class MercadoContext : DbContext
{
    public DbSet<Producto> Productos { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Venta> Ventas { get; set; }
    public DbSet<DetalleVenta> DetallesVenta { get; set; }
}
```

### 2. Cadena de Conexión

Configurada en `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "MercadoConnection": "Server=localhost;Database=MicroMercadoDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

### 3. Registro del Servicio

En `Program.cs`:

```csharp
builder.Services.AddDbContext<MercadoContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MercadoConnection")));
```

### 4. Relaciones entre Tablas

```
Categorias (1) -----> (N) Productos
Productos (1) -----> (N) DetallesVenta
Ventas (1) -----> (N) DetallesVenta
```

---

## 🚀 Puesta en Marcha del Proyecto

### Requisitos Previos

- ✅ [.NET SDK 8.0 o superior](https://dotnet.microsoft.com/download)
- ✅ [SQL Server](https://www.microsoft.com/sql-server/sql-server-downloads) (Express, Developer o LocalDB)
- ✅ [Visual Studio Code](https://code.visualstudio.com/)
- ✅ Extensión de C# para VS Code

---

### Paso 1: Crear el Proyecto

```bash
# Crear proyecto MVC
dotnet new mvc -n MicroMercadoMVC
cd MicroMercadoMVC
```

---

### Paso 2: Instalar Dependencias

```bash
# Instalar paquetes NuGet
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.EntityFrameworkCore.Design

# Restaurar paquetes
dotnet restore
```

---

### Paso 3: Crear la Estructura de Carpetas

```
MicroMercadoMVC/
├── Controllers/
│   ├── ProductoController.cs
│   ├── CategoriaController.cs
│   └── VentaController.cs
├── Models/
│   ├── Producto.cs
│   ├── Categoria.cs
│   ├── Venta.cs
│   └── MercadoContext.cs
├── Views/
│   ├── Producto/
│   ├── Categoria/
│   └── Venta/
├── Program.cs
├── appsettings.json
└── MicroMercadoMVC.csproj
```

---

### Paso 4: Configurar la Base de Datos

#### Opción A: Usar SQL Script (Manual)

1. Abre SQL Server Management Studio
2. Ejecuta el archivo `Database.sql`

#### Opción B: Usar Entity Framework Migrations (Recomendado)

```bash
# 1. Instalar herramienta EF
dotnet tool install --global dotnet-ef

# 2. Crear migración
dotnet ef migrations add InitialCreate

# 3. Crear base de datos
dotnet ef database update
```

---

### Paso 5: Configurar Cadena de Conexión

Edita `appsettings.json` según tu instalación:

**SQL Server Express:**
```json
"Server=localhost\\SQLEXPRESS;Database=MicroMercadoDB;Trusted_Connection=True;TrustServerCertificate=True;"
```

**LocalDB:**
```json
"Server=(localdb)\\mssqllocaldb;Database=MicroMercadoDB;Trusted_Connection=True;TrustServerCertificate=True;"
```

**Con usuario/contraseña:**
```json
"Server=localhost;Database=MicroMercadoDB;User Id=sa;Password=TuContraseña;TrustServerCertificate=True;"
```

---


---

### Paso 6: Compilar y Ejecutar

```bash
# Compilar
dotnet build

# Ejecutar
dotnet run
```

---

### Paso 7: Abrir en el Navegador

```
https://localhost:5001/Producto
http://localhost:5000/Producto
```

---

## 🎯 Funcionalidades del Sistema

### 1. Gestión de Categorías

| Función | Descripción |
|---------|-------------|
| **Crear** | Agregar nuevas categorías de productos |
| **Listar** | Ver todas las categorías |
| **Editar** | Modificar categorías existentes |
| **Eliminar** | Eliminar categorías (valida que no tengan productos) |

**Campos:**
- Nombre
- Descripción
- Estado (Activo/Inactivo)

---

### 2. Gestión de Productos

| Función | Descripción |
|---------|-------------|
| **Crear** | Agregar nuevos productos al inventario |
| **Listar** | Ver todos los productos con alertas de stock |
| **Editar** | Modificar información de productos |
| **Eliminar** | Eliminar productos del sistema |

**Campos:**
- Código único
- Nombre
- Descripción
- Precio
- Stock
- Categoría
- Estado (Activo/Inactivo)
- Fecha de registro


---

### 3. Sistema de Ventas

| Función | Descripción |
|---------|-------------|
| **Nueva Venta** | Registrar venta con múltiples productos |
| **Listar Ventas** | Ver historial de todas las ventas |
| **Ver Detalle** | Consultar información completa de una venta |
| **Cancelar Venta** | Anular venta y restaurar stock |

**Proceso de venta:**
1. Seleccionar productos del inventario
2. Definir cantidades (valida stock disponible)
3. Sistema calcula subtotales y total automáticamente
4. Al confirmar: genera número de venta y actualiza stock
5. Opción de imprimir comprobante


---


## 🔧 Comandos Útiles

### Entity Framework

```bash
# Crear migración
dotnet ef migrations add NombreMigracion

# Aplicar migraciones
dotnet ef database update

# Eliminar base de datos
dotnet ef database drop

# Listar migraciones
dotnet ef migrations list

# Generar script SQL
dotnet ef migrations script

# Revertir a migración específica
dotnet ef database update NombreMigracion
```

### Desarrollo

```bash
# Restaurar dependencias
dotnet restore

# Compilar
dotnet build

# Ejecutar
dotnet run

# Ejecutar con recarga automática
dotnet watch run

# Limpiar build
dotnet clean

# Verificar versión de .NET
dotnet --version
```

---



### Error: "Build failed"

**Solución:**
```bash
dotnet clean
dotnet restore
dotnet build
```



## 📁 Estructura Completa del Proyecto

```
MicroMercadoMVC/
├── Controllers/
│   ├── ProductoController.cs      (CRUD Productos)
│   ├── CategoriaController.cs     (CRUD Categorías)
│   └── VentaController.cs         (Sistema de Ventas)
├── Models/
│   ├── Producto.cs                (Entidad Producto)
│   ├── Categoria.cs               (Entidad Categoría)
│   ├── Venta.cs                   (Entidad Venta)
│   └── MercadoContext.cs          (DbContext EF)
├── Views/
│   ├── Producto/
│   │   ├── Index.cshtml
│   │   ├── Create.cshtml
│   │   ├── Edit.cshtml
│   │   └── Delete.cshtml
│   ├── Categoria/
│   │   ├── Index.cshtml
│   │   ├── Create.cshtml
│   │   ├── Edit.cshtml
│   │   └── Delete.cshtml
│   └── Venta/
│       ├── Index.cshtml
│       ├── Create.cshtml
│       ├── Details.cshtml
│       └── Delete.cshtml
├── wwwroot/
│   ├── css/
│   ├── js/
│   └── lib/
├── Migrations/                     (Control de versiones DB)
├── appsettings.json               (Configuración)
├── Program.cs                     (Punto de entrada)
└── MicroMercadoMVC.csproj        (Config del proyecto)
```

---

---

## 👨‍💻 Autor

**Kevin Castellon**

---


## 📸 Capturas de Pantalla

### 
![Lista de Productos](build.png)

### 
![Crear Producto](run.png)

### 
![Categorías](db.png)

### 
![Nueva Venta](productos.png)

### 
![Lista de Ventas](catProd.png)

### 
![Detalle Venta](editProd.png)

---
