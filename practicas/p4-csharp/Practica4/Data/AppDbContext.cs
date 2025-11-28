using Microsoft.EntityFrameworkCore;
using MiProyectoActivos.Models;

namespace MiProyectoActivos.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Activo> Activos { get; set; }
    }
}
