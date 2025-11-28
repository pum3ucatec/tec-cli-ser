using Microsoft.EntityFrameworkCore;
using CompanyAssets.Models;

namespace CompanyAssets.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Asset> Assets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurar el modelo para que coincida con la base de datos existente
            modelBuilder.Entity<Asset>(entity =>
            {
                entity.ToTable("Assets");
                entity.HasKey(e => e.id);
                
                // Mapear exactamente a las columnas existentes
                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("Nombre");
                    
                entity.Property(e => e.Categoria)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("Categoria");
                    
                entity.Property(e => e.Numero_de_serie)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("Numero_de_serie");
                    
                entity.Property(e => e.Marca)
                    .HasMaxLength(100)
                    .HasColumnName("Marca");
                    
                entity.Property(e => e.Modelo)
                    .HasMaxLength(100)
                    .HasColumnName("Modelo");
                    
                entity.Property(e => e.Precio_de_compra)
                    .HasColumnType("decimal(18,2)")
                    .HasColumnName("Precio_de_compra");
                    
                entity.Property(e => e.Fecha_de_compra)
                    .HasColumnName("Fecha_de_compra");
                    
                entity.Property(e => e.Estado)
                    .HasMaxLength(20)
                    .HasColumnName("Estado");
                    
                entity.Property(e => e.Lugar)
                    .HasMaxLength(200)
                    .HasColumnName("Lugar");
            });
        }
    }
}