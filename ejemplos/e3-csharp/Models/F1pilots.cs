namespace e3_csharp.Models;
public class F1pilot
{
    public int ID { get; set; }
    public string Name { get; set; } = string.Empty;   // Inicializado
    public string Number { get; set; } = string.Empty;    // Inicializado
    public string Team { get; set; } = "AC";          // Valor por defecto
}