# 📚 Sistema de Gestión de Biblioteca - MVC con C# y SQL Server

## 📋 Descripción del Proyecto

Este es un sistema de gestión de biblioteca desarrollado con el patrón **MVC (Model-View-Controller)** utilizando **ASP.NET Core**, **Entity Framework Core** y **SQL Server**. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre un catálogo de libros.

---

## 🏗️ Arquitectura MVC

### ¿Qué es MVC?

**MVC (Model-View-Controller)** es un patrón de diseño arquitectónico que separa la aplicación en tres componentes principales:

### 📦 Model (Modelo)
- **Ubicación:** `Models/Libro.cs`, `Models/DatabaseContext.cs`
- **Responsabilidad:** Representa los datos y la lógica de negocio
- **Función:** 
  - Define la estructura de los datos (clase `Libro`)
  - Maneja la conexión con la base de datos (`DatabaseContext`)
  - Aplica validaciones de datos

```
Models/
├── Libro.cs           → Entidad que representa un libro
└── DatabaseContext.cs → Contexto de Entity Framework
```

### 🎮 Controller (Controlador)
- **Ubicación:** `Controllers/LibroController.cs`
- **Responsabilidad:** Maneja la lógica de la aplicación y coordina Model y View
- **Función:**
  - Recibe las peticiones del usuario
  - Interactúa con el modelo para obtener/modificar datos
  - Selecciona la vista apropiada para mostrar
  - Implementa las operaciones CRUD

```
Controllers/
└── LibroController.cs → Gestiona todas las operaciones de libros
```

### 🎨 View (Vista)
- **Ubicación:** `Views/Libro/`
- **Responsabilidad:** Presenta la información al usuario
- **Función:**
  - Muestra los datos en formato HTML
  - Captura la entrada del usuario (formularios)
  - Se comunica únicamente con el controlador

```
Views/Libro/
├── Index.cshtml  → Lista todos los libros
├── Create.cshtml → Formulario para crear libro
├── Edit.cshtml   → Formulario para editar libro
└── Delete.cshtml → Confirmación de eliminación
```

---

## 🔗 Conexión con SQL Server

### 1. Entity Framework Core

El proyecto utiliza **Entity Framework Core** como ORM (Object-Relational Mapping) para conectarse a SQL Server:

```csharp
// DatabaseContext.cs - Clase que gestiona la conexión
public class DatabaseContext : DbContext
{
    public DbSet<Libro> Libros { get; set; }
    
    // Constructor que recibe las opciones de conexión
    public DatabaseContext(DbContextOptions<DatabaseContext> options) 
        : base(options)
    {
    }
}
```

### 2. Cadena de Conexión

Se configura en `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "BibliotecaConnection": "Server=localhost;Database=BibliotecaDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

**Parámetros:**
- `Server`: Dirección del servidor SQL Server
- `Database`: Nombre de la base de datos
- `Trusted_Connection=True`: Usa autenticación de Windows
- `TrustServerCertificate=True`: Confía en el certificado del servidor

### 3. Registro del Servicio

En `Program.cs` se registra el contexto:

```csharp
builder.Services.AddDbContext<DatabaseContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BibliotecaConnection")));
```

### 4. Flujo de Datos

```
Usuario → Controller → DbContext → SQL Server
                ↓
              View
```

1. El usuario realiza una acción (ej: crear libro)
2. El **Controller** recibe la petición
3. El **Controller** usa **DbContext** para comunicarse con SQL Server
4. **Entity Framework** traduce las operaciones a SQL
5. SQL Server ejecuta la consulta y devuelve resultados
6. El **Controller** pasa los datos a la **View**
7. La **View** muestra los datos al usuario

---

## 🚀 Puesta en Marcha del Proyecto

### Requisitos Previos

- ✅ [.NET SDK 6.0 o superior](https://dotnet.microsoft.com/download)
- ✅ [SQL Server](https://www.microsoft.com/sql-server/sql-server-downloads) (Express, Developer o LocalDB)
- ✅ [Visual Studio Code](https://code.visualstudio.com/)
- ✅ Extensión de C# para VS Code

### Paso 1: Clonar/Descargar el Proyecto

```bash
# Si usas Git
git clone <url-del-repositorio>
cd BibliotecaMVC

# O descomprime el archivo ZIP en una carpeta
```

### Paso 2: Verificar Instalación de .NET

```bash
dotnet --version
```

Deberías ver algo como: `8.0.100` o superior

### Paso 3: Instalar Dependencias

```bash
# Restaurar paquetes NuGet
dotnet restore
```

### Paso 4: Configurar SQL Server

#### Opción A: Usar SQL Server Management Studio (SSMS)

1. Abre SSMS
2. Conéctate a tu instancia de SQL Server
3. Ejecuta el siguiente script:

```sql
CREATE DATABASE BibliotecaDB;
GO

USE BibliotecaDB;
GO

CREATE TABLE Libros (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Titulo NVARCHAR(200) NOT NULL,
    Autor NVARCHAR(100) NOT NULL,
    ISBN NVARCHAR(20) NOT NULL,
    Anio INT NOT NULL,
    Categoria NVARCHAR(50) NOT NULL,
    Disponible BIT NOT NULL DEFAULT 1,
    FechaRegistro DATETIME NOT NULL DEFAULT GETDATE()
);
GO
```

#### Opción B: Usar Entity Framework Migrations (Recomendado)

```bash
# 1. Instalar herramienta EF (si no la tienes)
dotnet tool install --global dotnet-ef

# 2. Crear migración
dotnet ef migrations add InitialCreate

# 3. Crear base de datos
dotnet ef database update
```

### Paso 5: Configurar Cadena de Conexión

Edita `appsettings.json` según tu configuración:

**Para SQL Server Express:**
```json
"Server=localhost\\SQLEXPRESS;Database=BibliotecaDB;Trusted_Connection=True;TrustServerCertificate=True;"
```

**Para LocalDB:**
```json
"Server=(localdb)\\mssqllocaldb;Database=BibliotecaDB;Trusted_Connection=True;TrustServerCertificate=True;"
```

**Con usuario y contraseña:**
```json
"Server=localhost;Database=BibliotecaDB;User Id=sa;Password=TuContraseña;TrustServerCertificate=True;"
```

### Paso 6: Compilar el Proyecto

```bash
dotnet build
```

### Paso 7: Ejecutar la Aplicación

```bash
dotnet run
```

Verás algo como:

```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:5001
      Now listening on: http://localhost:5000
```

### Paso 8: Abrir en el Navegador

Abre tu navegador y ve a:

```
https://localhost:5001/Libro
```

o

```
http://localhost:5000/Libro
```

---

## 🎯 Funcionalidades Implementadas

### ✅ CRUD Completo

| Operación | Ruta | Método | Descripción |
|-----------|------|--------|-------------|
| **Listar** | `/Libro` | GET | Muestra todos los libros |
| **Crear** | `/Libro/Create` | GET/POST | Formulario y guardado de nuevo libro |
| **Editar** | `/Libro/Edit/{id}` | GET/POST | Formulario y actualización de libro |
| **Eliminar** | `/Libro/Delete/{id}` | GET/POST | Confirmación y eliminación de libro |

### 📊 Campos del Libro

- **Título**: Nombre del libro (máx. 200 caracteres)
- **Autor**: Nombre del autor (máx. 100 caracteres)
- **ISBN**: Código ISBN (máx. 20 caracteres)
- **Año**: Año de publicación (1000-2100)
- **Categoría**: Tipo de libro (Ficción, Clásico, etc.)
- **Disponible**: Si está disponible para préstamo (Sí/No)
- **Fecha de Registro**: Fecha de ingreso al sistema (automática)

### 🔒 Validaciones

- ✅ Todos los campos son obligatorios
- ✅ Validación de longitud de texto
- ✅ Validación de rango de año
- ✅ Protección contra inyección SQL (Entity Framework)
- ✅ Protección CSRF (AntiForgeryToken)

---

## 📁 Estructura del Proyecto

```
BibliotecaMVC/
├── Controllers/
│   └── LibroController.cs         # Lógica de negocio
├── Models/
│   ├── Libro.cs                   # Entidad Libro
│   └── DatabaseContext.cs         # Contexto EF Core
├── Views/
│   ├── Libro/
│   │   ├── Index.cshtml          # Lista de libros
│   │   ├── Create.cshtml         # Crear libro
│   │   ├── Edit.cshtml           # Editar libro
│   │   └── Delete.cshtml         # Eliminar libro
│   └── Shared/
│       └── _Layout.cshtml         # Layout principal
├── wwwroot/
│   ├── css/                       # Estilos CSS
│   ├── js/                        # Scripts JavaScript
│   └── lib/                       # Librerías (Bootstrap)
├── appsettings.json               # Configuración
├── Program.cs                     # Punto de entrada
└── BibliotecaMVC.csproj          # Configuración del proyecto
```

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **ASP.NET Core MVC** | 8.0 | Framework web |
| **Entity Framework Core** | 8.0 | ORM para base de datos |
| **SQL Server** | 2019+ | Base de datos |
| **Bootstrap** | 5.3 | Framework CSS |
| **C#** | 12.0 | Lenguaje de programación |

---

## 🔧 Comandos Útiles

### Gestión de Base de Datos

```bash
# Crear nueva migración
dotnet ef migrations add NombreMigracion

# Aplicar migraciones
dotnet ef database update

# Revertir migración
dotnet ef database update NombreMigracionAnterior

# Eliminar base de datos
dotnet ef database drop

# Ver migraciones aplicadas
dotnet ef migrations list

# Generar script SQL de migraciones
dotnet ef migrations script
```

### Desarrollo

```bash
# Restaurar dependencias
dotnet restore

# Compilar
dotnet build

# Ejecutar
dotnet run

# Ejecutar con hot reload
dotnet watch run

# Limpiar build
dotnet clean
```

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to database"

**Solución:**
1. Verifica que SQL Server esté ejecutándose
2. Revisa la cadena de conexión en `appsettings.json`
3. Prueba la conexión con SSMS

### Error: "Invalid column name"

**Solución:**
```bash
dotnet ef database drop --force
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Error: "Build failed"

**Solución:**
```bash
dotnet clean
dotnet restore
dotnet build
```

### Puerto ocupado

**Solución:** Edita `Properties/launchSettings.json` y cambia los puertos

---

## 📝 Notas Importantes

- 🔐 La aplicación usa autenticación de Windows por defecto
- 🎨 El diseño es responsivo gracias a Bootstrap 5
- 🔄 Las operaciones son asíncronas para mejor rendimiento
- ✅ Incluye validaciones tanto en cliente como en servidor
- 🛡️ Protegido contra ataques CSRF

---

## 👨‍💻 Autor

**Kevin Castellon**

---

## 📄 Licencia

Este proyecto es de uso educativo.

---

## 📸 Capturas de Pantalla

### Pantalla Principal - Lista de Libros
![Lista de Libros](screenshots/lista-libros.png)

### Formulario de Creación
![Crear Libro](screenshots/crear-libro.png)

### Formulario de Edición
![Editar Libro](screenshots/editar-libro.png)

### Confirmación de Eliminación
![Eliminar Libro](screenshots/eliminar-libro.png)

### Diagrama de Arquitectura MVC
![Arquitectura MVC](screenshots/arquitectura-mvc.png)

### Estructura de Base de Datos
![Base de Datos](screenshots/base-datos.png)

---

## 🔗 Enlaces Útiles

- [Documentación de ASP.NET Core](https://docs.microsoft.com/aspnet/core)
- [Entity Framework Core](https://docs.microsoft.com/ef/core)
- [SQL Server Documentation](https://docs.microsoft.com/sql)
- [Bootstrap 5](https://getbootstrap.com)

---

## 📞 Contacto

Si tienes preguntas o sugerencias, no dudes en contactarme.

---

**¡Gracias por usar este sistema! 🚀**