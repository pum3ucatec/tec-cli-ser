// FutbolApp.Api/Models/Player.cs
namespace FutbolApp.Api.Models
{
    public class Player
    {
        // 1. Clave Primaria
        public int Id { get; set; }

        // 2. Nombre del Jugador
        public string Name { get; set; } = string.Empty; // <-- CAMBIO AQUI

        // 3. Posición (Ej: Delantero, Centrocampista, Defensa)
        public string Position { get; set; } = string.Empty; // <-- CAMBIO AQUI

        // 4. Número de Camiseta
        public int JerseyNumber { get; set; }

        // 5. Equipo Actual
        public string Team { get; set; } = string.Empty; // <-- CAMBIO AQUI
    }
}