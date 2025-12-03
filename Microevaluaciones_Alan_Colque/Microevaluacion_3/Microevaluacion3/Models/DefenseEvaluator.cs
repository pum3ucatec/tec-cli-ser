using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Microevaluacion3.Models
{
    public class DefenseEvaluator
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int DefenseId { get; set; }

        [Required]
        public int EvaluatorId { get; set; }

        [Required]
        [StringLength(50)]
        public string Role { get; set; } // Presidente, Secretario, Vocal

        [Range(0, 100)]
        public decimal? Grade { get; set; }

        [StringLength(500)]
        public string Comments { get; set; }

        public DateTime AssignedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        [ForeignKey("DefenseId")]
        public virtual Defense Defense { get; set; }

        [ForeignKey("EvaluatorId")]
        public virtual Evaluator Evaluator { get; set; }
    }
}