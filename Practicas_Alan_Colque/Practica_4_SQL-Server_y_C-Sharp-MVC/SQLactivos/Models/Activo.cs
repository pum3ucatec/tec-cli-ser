using System.ComponentModel.DataAnnotations;

namespace SQLactivos.Models
{
    public class Activo
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Categoria { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public DateTime FechaAdquisicion { get; set; } = DateTime.Now;
    }
}