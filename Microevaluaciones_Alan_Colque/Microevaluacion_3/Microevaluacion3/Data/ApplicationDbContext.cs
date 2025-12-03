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
        public DbSet<DefenseEvaluator> DefenseEvaluators { get; set; } // ¡NUEVA!

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Defense configuration
            modelBuilder.Entity<Defense>(entity =>
            {
                entity.HasOne(d => d.Student)
                    .WithMany(s => s.Defenses)
                    .HasForeignKey(d => d.StudentId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Student unique code
            modelBuilder.Entity<Student>()
                .HasIndex(s => s.Code)
                .IsUnique();

            // Evaluator unique code
            modelBuilder.Entity<Evaluator>()
                .HasIndex(e => e.Code)
                .IsUnique();

            // DefenseEvaluator configuration (many-to-many)
            modelBuilder.Entity<DefenseEvaluator>(entity =>
            {
                entity.HasOne(de => de.Defense)
                    .WithMany()
                    .HasForeignKey(de => de.DefenseId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(de => de.Evaluator)
                    .WithMany()
                    .HasForeignKey(de => de.EvaluatorId)
                    .OnDelete(DeleteBehavior.Restrict);

                // Evitar asignaciones duplicadas
                entity.HasIndex(de => new { de.DefenseId, de.EvaluatorId })
                    .IsUnique();
            });
        }
    }
}