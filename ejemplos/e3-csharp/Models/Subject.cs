namespace e3_csharp.Models;

public class Subject
{
    public int ID { get; set; }                       // Primary key
    public string Name { get; set; } = string.Empty;  // Subject name
    public string Description { get; set; } = string.Empty; // Description
    public string Status { get; set; } = "AC";        // Status (active by default)
}
