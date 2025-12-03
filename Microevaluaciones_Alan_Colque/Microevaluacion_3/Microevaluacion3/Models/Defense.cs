using System;
using System.ComponentModel.DataAnnotations;

namespace Microevaluacion3.Models
{
    public class Defense
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "El título es obligatorio")]
        [StringLength(200)]
        [Display(Name = "Título")]
        public string Title { get; set; }

        [StringLength(1000)]
        [Display(Name = "Descripción")]
        public string Description { get; set; }

        [Required(ErrorMessage = "La carrera es obligatoria")]
        [StringLength(100)]
        [Display(Name = "Carrera")]
        public string Career { get; set; }

        [Required(ErrorMessage = "El tipo es obligatorio")]
        [StringLength(50)]
        [Display(Name = "Tipo")]
        public string DefenseType { get; set; }

        [Display(Name = "Estado")]
        public string Status { get; set; } = "Scheduled";

        [Required(ErrorMessage = "La fecha es obligatoria")]
        [Display(Name = "Fecha")]
        [DataType(DataType.Date)]
        public DateTime DefenseDate { get; set; }

        [Required(ErrorMessage = "Hora inicio obligatoria")]
        [Display(Name = "Hora Inicio")]
        public TimeSpan StartTime { get; set; }

        [Required(ErrorMessage = "Hora fin obligatoria")]
        [Display(Name = "Hora Fin")]
        public TimeSpan EndTime { get; set; }

        [StringLength(100)]
        [Display(Name = "Ubicación")]
        public string Location { get; set; }

        [StringLength(50)]
        [Display(Name = "Aula")]
        public string Classroom { get; set; }

        [Range(0, 100)]
        [Display(Name = "Calificación")]
        public decimal? Grade { get; set; }

        [Display(Name = "Estudiante")]
        public int StudentId { get; set; }

        [Display(Name = "Estudiante")]
        public Student? Student { get; set; }

        [Display(Name = "Fecha Creación")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}