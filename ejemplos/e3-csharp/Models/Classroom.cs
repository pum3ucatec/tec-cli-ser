using System.ComponentModel.DataAnnotations;

namespace e3_csharp.Models
{
    public class Classroom
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int Capacity { get; set; }

        [StringLength(200)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public bool IsActive { get; set; } = true;
    }
}
