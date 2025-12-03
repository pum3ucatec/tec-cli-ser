namespace MiProyectoMVC.Models;
public class Classroom
{
    public int ID { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Status { get; set; } = "AC";
}