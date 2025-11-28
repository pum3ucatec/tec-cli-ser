namespace MiProyectoActivos.Models
{
    public class Activo
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = "";
        public string Categoria { get; set; } = "";
        public string Descripcion { get; set; } = "";
        public DateTime FechaAdquisicion { get; set; }
    }
}
