using System.ComponentModel.DataAnnotations;

namespace e3_csharp.Models;

public class Classroom
{
    public int ID { get; set; }

    [Required]
    public string Codigo { get; set; } = string.Empty;

    [Required]
    public string Nombre { get; set; } = string.Empty;

    [Required]
    public bool Estado { get; set; }
} 