using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace e3_csharp.Models
{
    public class Thesis
    {
        public int ID { get; set; }

        [Required]
        public string Topic { get; set; }

        [Required]
        [Display(Name = "Student")]
        public int StudentId { get; set; }

        [ForeignKey("StudentId")]
        public Person Student { get; set; }

        [Required]
        public string Advisor { get; set; }

        [Required]
        public string Status { get; set; }
    }
}
