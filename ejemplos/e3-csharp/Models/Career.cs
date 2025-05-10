using System.ComponentModel.DataAnnotations;

namespace e3_csharp.Models
{
    public class Career
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;
    }
} 