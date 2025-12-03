namespace e3_csharp.Models;

public class Career
{
    public int ID { get; set; }
    public string Name { get; set; } = string.Empty;    // Inicializado
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "AC";          // Valor por defecto
}