using System;
using System.ComponentModel.DataAnnotations;

namespace Microevaluacion3.Models
{
    public class Evaluator
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Código obligatorio")]
        [StringLength(50)]
        [Display(Name = "Código")]
        public string Code { get; set; }

        [Required(ErrorMessage = "Nombre obligatorio")]
        [StringLength(100)]
        [Display(Name = "Nombre")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Apellido obligatorio")]
        [StringLength(100)]
        [Display(Name = "Apellido")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Título obligatorio")]
        [StringLength(50)]
        [Display(Name = "Título")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Tipo obligatorio")]
        [StringLength(50)]
        [Display(Name = "Tipo")]
        public string Type { get; set; } // Internal, External

        [StringLength(100)]
        [Display(Name = "Departamento")]
        public string Department { get; set; }

        [Display(Name = "Activo")]
        public bool IsActive { get; set; } = true;

        [Display(Name = "Fecha Registro")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}