namespace e3_csharp.Models;
public class Person
{
    public int ID { get; set; }
    public string FirstName { get; set; } = string.Empty;   // Inicializado
    public string LastName { get; set; } = string.Empty;    // Inicializado
    public string Status { get; set; } = "AC";          // Valor por defecto
}