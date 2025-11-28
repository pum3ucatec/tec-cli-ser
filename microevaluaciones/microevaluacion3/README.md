# Crear Vista y Controlador en base al Modelo Classroom

Este documento describe paso a paso cómo crear una **vista** y un **controlador** automáticamente en ASP.NET MVC usando el modelo `Classroom`.

---

## 1. Crear el Modelo `Classroom`

Crea el archivo `Models/Classroom.cs` con el siguiente contenido:

```csharp
using System.ComponentModel.DataAnnotations;

namespace e3_csharp.Models
{
    public class Classroom
    {
        public int ID { get; set; }

        [Required]
        public string Codigo { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        public bool Estado { get; set; }
    }
}
```

---

## 2. Agregar el modelo al `DbContext`

En el archivo `Data/ApplicationDbContext.cs`, agrega:

```csharp
public DbSet<Classroom> Classrooms { get; set; }
```

dentro de la clase `ApplicationDbContext`.

---

## 3. Crear la migración

Ejecuta el siguiente comando en la terminal:

```bash
dotnet ef migrations add AddClassroom
```

Esto crea una migración para agregar la tabla `Classrooms` a la base de datos.

---

## 4. Actualizar la base de datos

Aplica la migración a tu base de datos:

```bash
dotnet ef database update
```

Esto crea físicamente la tabla en la base de datos.

---

## 5. Instalar el generador de código (si no está instalado)

Instala `dotnet-aspnet-codegenerator` globalmente:

```bash
dotnet tool install --global dotnet-aspnet-codegenerator
```

---

## 6. Generar el Controlador y las Vistas para `Classroom`

Usa el siguiente comando:

```bash
dotnet aspnet-codegenerator controller -name ClassroomController -m Classroom -dc ApplicationDbContext -outDir Controllers -scripts
```

Este comando:
- Crea el controlador `ClassroomController` en la carpeta `Controllers`
- Genera las vistas en `Views/Classroom`
- Agrega los scripts necesarios para validaciones

---

## 7. Acceder a la Vista en el Navegador

Levanta el proyecto y accede a la ruta:

```
http://localhost:5134/Classroom
```

Deberías ver el CRUD (Crear, Leer, Actualizar, Eliminar) para `Classroom` funcionando.

---

# 📈 Resultado Final
- Modelo `Classroom` creado
- Tabla `Classrooms` en la base de datos
- Controlador `ClassroomController`
- Vistas de `Classroom` generadas automáticamente

---

¡Listo! Ahora podés administrar aulas (Classrooms) desde tu aplicación ASP.NET MVC.

PRESENTAR

Un documento `Respuesta.md` con las evidendias en una nueva rama `GastonQuelali/Microevaluacion3` y `GastonQuelali/Practica4`