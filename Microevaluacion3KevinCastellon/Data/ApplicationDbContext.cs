using Microsoft.EntityFrameworkCore;
using Microevaluacion3.Models;

namespace Microevaluacion3.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Defense> Defenses { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Evaluator> Evaluators { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Defense configuration
            modelBuilder.Entity<Defense>()
                .HasOne(d => d.Student)
                .WithMany(s => s.Defenses)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            // Student unique code
            modelBuilder.Entity<Student>()
                .HasIndex(s => s.Code)
                .IsUnique();

            // Evaluator unique code
            modelBuilder.Entity<Evaluator>()
                .HasIndex(e => e.Code)
                .IsUnique();
        }
    }
}