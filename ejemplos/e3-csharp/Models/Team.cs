using System.ComponentModel.DataAnnotations;

namespace e3_csharp.Models
{
    public class Team
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public bool Status { get; set; }
    }
} 