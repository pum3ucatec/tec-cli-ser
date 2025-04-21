# Documentación: Creación de la entidad Classroom en e3-csharp

## Pasos realizados

1. **Creación del modelo**
   - Se creó el archivo `Models/Classroom.cs` con los campos: `Id`, `Nombre` y `Estado` (todos en español).

2. **Registro en el contexto**
   - Se agregó `DbSet<Classroom> Classrooms` en `Data/ApplicationDbContext.cs` para mapear la nueva entidad.

3. **Migración y actualización de la base de datos**
   - Se ejecutaron los comandos:
     - `dotnet ef migrations add AddClassroom`
     - `dotnet ef database update`
   - Esto generó la tabla `Classrooms` en la base de datos.

4. **Controlador y vistas CRUD**
   - Se creó el controlador `ClassroomController` siguiendo el patrón de `PersonController` y `SubjectController`.
   - Se generaron las vistas en `Views/Classroom` para listar, crear, editar, ver detalles y eliminar aulas.

5. **Estilización con Bootstrap**
   - Se aplicaron estilos Bootstrap a las tablas y formularios para una mejor experiencia visual y de usuario.

## Resultado

- Ahora es posible administrar aulas (Classroom) desde la web, con formularios y tablas en español, y una interfaz moderna.
- El flujo es idéntico al de las entidades Person y Subject.

---

**Trabajo realizado en:** `ejemplos/e3-csharp`

**Fecha:** 21/04/2025

**Autoría:** Laboratorio2 + Asistente AI