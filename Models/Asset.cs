using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CompanyAssets.Models
{
    public class Asset
    {
        [Key]
        [Column("id")]
        public int id { get; set; }

        [Required]
        [Column("Nombre")]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        [Column("Categoria")]
        [StringLength(50)]
        public string Categoria { get; set; } = string.Empty;

        [Required]
        [Column("Numero_de_serie")]
        [StringLength(50)]
        public string Numero_de_serie { get; set; } = string.Empty;

        [Column("Marca")]
        [StringLength(100)]
        public string Marca { get; set; } = string.Empty;

        [Column("Modelo")]
        [StringLength(100)]
        public string Modelo { get; set; } = string.Empty;

        [Column("Precio_de_compra", TypeName = "decimal(18,2)")]
        public decimal Precio_de_compra { get; set; }

        [Column("Fecha_de_compra")]
        public DateTime Fecha_de_compra { get; set; } = DateTime.Now;

        [Column("Estado")]
        [StringLength(20)]
        public string Estado { get; set; } = "Activo";

        [Column("Lugar")]
        [StringLength(200)]
        public string Lugar { get; set; } = string.Empty;
    }
}