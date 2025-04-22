using System.ComponentModel.DataAnnotations;

namespace e3_csharp.Models
{
    public class Classroom
    {
        public int ID { get; set; }

        [Required]
        public string Codigo { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        public bool Estado { get; set; }
    }
}