namespace e3_csharp.Models;

public class Clashroom
{
    public int ID { get; set; }
    public string Nombre { get; set; } = string.Empty;      // Inicializado
    public int Capacidad { get; set; }                      // Obligatorio
    public string Estado { get; set; } = "Disponible";      // Valor por defecto
}
