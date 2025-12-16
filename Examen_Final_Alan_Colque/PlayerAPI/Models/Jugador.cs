namespace PlayerAPI.Models
{
    public class Jugador
    {
        public int Id { get; set; }
        public string NombreCompleto { get; set; } = string.Empty;
        public string Posicion { get; set; } = string.Empty;
        public int Dorsal { get; set; }
        public string Equipo { get; set; } = string.Empty;
    }
}