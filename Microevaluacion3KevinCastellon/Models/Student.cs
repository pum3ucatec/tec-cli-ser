using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Microevaluacion3.Models
{
    public class Student
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

        [EmailAddress]
        [StringLength(100)]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Carrera obligatoria")]
        [StringLength(100)]
        [Display(Name = "Carrera")]
        public string Career { get; set; }

        [Display(Name = "Semestre")]
        public int Semester { get; set; }

        [Display(Name = "Activo")]
        public bool IsActive { get; set; } = true;

        [Display(Name = "Fecha Registro")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public ICollection<Defense>? Defenses { get; set; }
    }
}