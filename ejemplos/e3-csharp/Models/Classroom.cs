namespace e3_csharp.Models;

public class Classroom
{
    public int Id { get; set; } // Clave primaria
    public string Nombre { get; set; } = string.Empty; // Nombre del aula
    public string Estado { get; set; } = "AC"; // Estado (activo por defecto)
}
