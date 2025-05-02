## EXAMEN FINAL - AMERICO LOVERA

## Pregunta - 2 - Creación y pruebas de la tabla Book en .NET (e3)

### 1. Creación del modelo Book
El modelo Book se define en `Models/Book.cs`:

```csharp
public class Book
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string Author { get; set; } = string.Empty;

    [Required]
    public int Year { get; set; }

    [StringLength(500)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public bool IsAvailable { get; set; } = true;
}
```

### 2. Registro en el DbContext
En `Data/ApplicationDbContext.cs` se agrega:

```csharp
public DbSet<Book> Books { get; set; }
```

### 3. Creación de la migración y actualización de la base de datos
Para crear la migración y aplicar los cambios ejecuta:

```bash
dotnet ef migrations add AddBookTable
dotnet ef database update
```

Esto genera la tabla `Books` en la base de datos.

### 4. Pruebas de los endpoints Book con Swagger
Con el backend en modo desarrollo, accede a:

```
http://localhost:5134/swagger
```

Ahí puedes probar los endpoints:
- `GET /api/BookApi` (listar libros)
- `POST /api/BookApi` (crear libro)
- `PUT /api/BookApi/{id}` (actualizar libro)
- `DELETE /api/BookApi/{id}` (eliminar libro)

Swagger permite enviar datos, ver respuestas y validar el correcto funcionamiento de la API Book.

---
![alt text](image.png)
---
**Resumen:**
- Se creó el modelo Book y se registró en el DbContext.
- Se generó la migración y se actualizó la base de datos.
- Se probaron los endpoints de Book usando Swagger UI.
