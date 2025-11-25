using Microsoft.EntityFrameworkCore;
using ActivosApp.Models;

namespace ActivosApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Activo> Activos { get; set; }
    }
}
