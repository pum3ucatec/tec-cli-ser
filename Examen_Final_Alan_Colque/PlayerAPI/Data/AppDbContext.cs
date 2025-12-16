using Microsoft.EntityFrameworkCore;
using PlayerAPI.Models;

namespace PlayerAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Jugador> Jugadores { get; set; }
    }
}