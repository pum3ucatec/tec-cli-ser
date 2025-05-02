# 🏫 Sistema de Gestión de Aulas

Frontend desarrollado en **React** para la administración eficiente de aulas académicas.

## 📂 Estructura del Proyecto

```plaintext
src/
├── api/
│   └── classroomApi.ts          # Conexión con backend
├── components/
│   ├── classroom/
│   │   ├── ClassroomDataTable.tsx  # Tabla de aulas
│   │   └── ClassroomForm.tsx       # Formulario CRUD
├── pages/
│   ├── classroom/
│   │   ├── CreateClassroomPage.tsx # Creación
│   │   ├── EditClassroomPage.tsx   # Edición
│   │   └── ListClassroomPage.tsx   # Listado
```

## 🧱 Modelo de Datos

```typescript
interface Aula {
  id: number;
  codigo: string;    // Código único (requerido)
  nombre: string;    // Nombre descriptivo (requerido)
  estado: boolean;   // Activo/Inactivo
}
```

## 🛠 Componentes Principales

### 📊 ClassroomDataTable.tsx
- Tabla paginada con ordenamiento.
- Filtros por código y nombre.
- Acciones rápidas:
  - ✏️ Editar
  - 🔄 Cambiar estado
  - 👁️ Ver detalles

### 📝 ClassroomForm.tsx
```jsx
<ClassroomForm 
  initialData={aulaData} 
  onSubmit={handleSubmit}
  isEditing={true/false}
/>
```
- Validaciones integradas.
- Modo creación/edición.
- Diseño responsive.

## 🌐 Páginas Disponibles

| Página   | Ruta             | Descripción                            |
|----------|------------------|----------------------------------------|
| Listado  | `/aulas`         | Muestra todas las aulas con paginación |
| Creación | `/aulas/nuevo`   | Formulario para nueva aula             |
| Edición  | `/aulas/editar/:id` | Edición de aula existente           |

## 🔌 API Service

Métodos disponibles en `classroomApi.ts`:

```typescript
{
  obtenerAulas(): Promise<Aula>;             // GET /aulas
  obtenerAula(id: number): Promise<Aula>;    // GET /aulas/{id}
  crearAula(aula: Aula): Promise<void>;      // POST /aulas
  actualizarAula(id: number, aula: Aula): Promise<void>; // PUT /aulas/{id}
  cambiarEstado(id: number): Promise<void>;  // PATCH /aulas/{id}/estado
}
```

## 🚀 Instalación

1. Clonar el repositorio

```bash
git clone https://tu-repositorio.com
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno

```bash
cp .env.example .env
```

4. Iniciar la aplicación

```bash
npm start
```

## 📦 Dependencias Principales

| Paquete           | Versión    | Uso                  |
|-------------------|------------|-----------------------|
| React             | ^18.2.0    | Core del proyecto     |
| Axios             | ^1.5.0     | Cliente HTTP          |
| React Hook Form   | ^7.45.0    | Manejo de formularios |
| Material UI       | ^5.14.0    | Componentes UI        |

## 📌 Requisitos

- Node.js v16 o superior
- npm v8 o superior
- Backend API activo

## 🎨 Características Adicionales

✔️ Internacionalización (i18n) preparada  
✔️ Esquema de colores configurable  
✔️ Soporte para temas claro/oscuro  
✔️ Optimizado para móviles  

---

© [Tu Nombre o Equipo] – 2025  
Proyecto desarrollado con ❤️ usando React

## Resultado de la tabla Classroom

# En el csharp
![alt text](images/image.png)

# En el swagger
![alt text](images/image-1.png)

# En el react
![alt text](images/image-2.png)





# ⚽ Proyecto - Tabla `Soccer`

Este proyecto es una aplicación ASP.NET Core MVC con Entity Framework Core. Aquí documentamos cómo se creó la tabla `Soccer`, incluyendo el modelo, la base de datos, controladores y vistas Razor (CRUD).

---

## 🧱 1. Crear el Modelo `Soccer`

Ubicación: `Models/Soccer.cs`

```csharp
using System.ComponentModel.DataAnnotations;

namespace e3_csharp.Models
{
    public class Soccer
    {
        public int Id { get; set; }

        [Required]
        public string NombreEquipo { get; set; }

        public bool Estado { get; set; }
    }
}
```

---

## 🧩 2. Registrar la Tabla en `ApplicationDbContext`

Ubicación: `Data/ApplicationDbContext.cs`

Agrega lo siguiente:

```csharp
public DbSet<Soccer> Soccers { get; set; }
```

Ejemplo:

```csharp
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Soccer> Soccers { get; set; }
}
```

---

## 🛠 3. Crear la Migración y Actualizar la Base de Datos

### Paso 1: Crear la migración

```bash
dotnet ef migrations add CreateSoccerTable
```

### Paso 2: Aplicar la migración

```bash
dotnet ef database update
```

Esto crea la tabla `Soccers` en la base de datos.

---

## 🚀 4. Generar Controladores y Vistas

### Opción 1: Manual (ya creado)

Ubicación:

- `Controllers/SoccerController.cs`
- `Controllers/SoccerApiController.cs`
- `Views/Soccer/`:
  - `Create.cshtml`
  - `Edit.cshtml`
  - `Delete.cshtml`
  - `Details.cshtml`
  - `Index.cshtml`

Estos archivos permiten realizar operaciones CRUD completas desde la interfaz web o API.

---

## 📋 5. Vistas Incluidas (`Views/Soccer/`)

Todas las vistas Razor necesarias para crear, leer, actualizar y eliminar registros `Soccer`.

| Vista        | Función                         |
|--------------|----------------------------------|
| `Index`      | Listar equipos                   |
| `Create`     | Formulario para agregar          |
| `Edit`       | Editar datos de un equipo        |
| `Delete`     | Confirmar eliminación            |
| `Details`    | Ver información de un equipo     |

---

## 🧪 6. Probar en Navegador

Ejecuta la app con:

```bash
dotnet run
```

Y accede a:

```
https://localhost:[puerto]/Soccer
```

---

## 📝 Requisitos Previos

- ASP.NET Core 7.0 o superior
- EF Core instalado
- Configurada la cadena de conexión en `appsettings.json`
- Herramienta CLI de EF instalada:

```bash
dotnet tool install --global dotnet-ef
```

---

## 📌 Notas

- `Estado` indica si el equipo está activo (`true`) o inactivo (`false`).
- Puedes usar Swagger para probar el controlador `SoccerApiController`.

---

## Resultado de la tabla Soccer

# En el csharp
![alt text](images/image-3.png)

# En el swagger
![alt text](images/image-4.png)


