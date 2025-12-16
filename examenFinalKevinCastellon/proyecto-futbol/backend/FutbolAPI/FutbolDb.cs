using Microsoft.EntityFrameworkCore;

public class FutbolDb : DbContext
{
    public FutbolDb(DbContextOptions<FutbolDb> options) : base(options) { }
    public DbSet<Jugador> Jugadores => Set<Jugador>();
}