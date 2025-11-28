using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MiProyectoActivos.Models
{
    [Table("Activos")]
    public class Activo
    {
        [Key]
        public int Id { get; set; }                // ID - PK

        [Required]
        [MaxLength(200)]
        public string Nombre { get; set; }         // Nombre genérico del activo
        [Required]
        [MaxLength(100)]
        public string Categoria { get; set; }      // p.ej. Vehículo, Terreno, Electrónico, Mueble, etc.
        [Required]
        [MaxLength(500)]
        public string Descripcion { get; set; }    // detalles adicionales (modelo, marca, ubicacion, etc.)
        [Required]
        public DateTime FechaAdquisicion { get; set; } // fecha cuando se adquirió/el registro
    }
}
