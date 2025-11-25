using System;
using System.ComponentModel.DataAnnotations;

namespace ActivosApp.Models
{
    public class Activo
    {
        public int ActivoId { get; set; }

        [Required]
        [StringLength(150)]
        public string Nombre { get; set; }

        [StringLength(100)]
        public string Categoria { get; set; }

        public DateTime? FechaAdquisicion { get; set; }

        [Required]
        [DataType(DataType.Currency)]
        public decimal Valor { get; set; }

        [StringLength(50)]
        public string Estado { get; set; }
    }
}
