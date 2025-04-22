namespace e3_csharp.Models
{
    public class Classroom
    {
        public int Id { get; set; }
        public required string Codigo { get; set; }
        public required string Nombre { get; set; }
        public required bool Estado { get; set; }
    }
}
