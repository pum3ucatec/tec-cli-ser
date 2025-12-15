// FutbolApp.Api/Data/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;
using FutbolApp.Api.Models;

namespace FutbolApp.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Definición de la tabla 'Players'
        public DbSet<Player> Players { get; set; }
    }
}