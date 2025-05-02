using System.ComponentModel.DataAnnotations;

namespace e3_csharp.Models
{
    public class Soccer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string NombreEquipo { get; set; }

        public bool Estado { get; set; } = true;
    }
}
