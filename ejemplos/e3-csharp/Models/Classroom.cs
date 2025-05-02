using System.ComponentModel.DataAnnotations;

namespace e3_csharp.Models
{
    public class Classroom
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string Codigo { get; set; }

        [Required]
        public required string Nombre { get; set; }

        public bool Estado { get; set; }
    }
}
