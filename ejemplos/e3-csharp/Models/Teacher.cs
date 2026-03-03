namespace e3_csharp.Models;

public class Teacher
{
    public int ID { get; set; }   // PK
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public DateTime HireDate { get; set; }
}
