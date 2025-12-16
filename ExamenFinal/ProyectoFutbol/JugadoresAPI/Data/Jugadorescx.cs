using Microsoft.EntityFrameworkCore;
using JugadoresAPI.Models;

namespace JugadoresAPI.Data
{
    public class JugadoresContext : DbContext
    {
        public JugadoresContext(DbContextOptions<JugadoresContext> options) : base(options)
        { }

        public DbSet<Jugador> Jugadores { get; set; }
        public DbSet<Equipo> Equipos { get; set; }
    }
}
