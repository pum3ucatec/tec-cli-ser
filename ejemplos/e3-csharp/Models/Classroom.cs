namespace e3_csharp.Models;
public class Classroom
{
    public int ID { get; set; }
    public string Code { get; set; } = string.Empty;   // Inicializado
    public string Name { get; set; } = string.Empty;    // Inicializado
    public string Status { get; set; } = "AC";          // Valor por defecto
}