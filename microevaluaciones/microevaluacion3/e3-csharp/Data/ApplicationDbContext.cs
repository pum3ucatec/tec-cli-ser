using Microsoft.EntityFrameworkCore;
using e3_csharp.Models;

namespace e3_csharp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Career> Careers { get; set; }
        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<Subject> Subjects { get; set; }

        // New Thesis table
        public DbSet<Thesis> Thesis { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Career
            modelBuilder.Entity<Career>(entity =>
            {
                entity.ToTable("Careers");

                entity.HasKey(e => e.ID);

                entity.Property(e => e.Name)
                      .IsRequired();

                entity.Property(e => e.Description)
                      .IsRequired();

                entity.Property(e => e.Status)
                      .IsRequired();
            });

            // Classroom
            modelBuilder.Entity<Classroom>(entity =>
            {
                entity.ToTable("Classrooms");

                entity.HasKey(e => e.ID);

                entity.Property(e => e.Code)
                      .IsRequired();

                entity.Property(e => e.Name)
                      .IsRequired();

                entity.Property(e => e.Status)
                      .IsRequired();
            });

            // Person
            modelBuilder.Entity<Person>(entity =>
            {
                entity.ToTable("Persons");

                entity.HasKey(e => e.ID);

                entity.Property(e => e.FirstName)
                      .IsRequired();

                entity.Property(e => e.LastName)
                      .IsRequired();

                entity.Property(e => e.Status)
                      .IsRequired();
            });

            // Subject
            modelBuilder.Entity<Subject>(entity =>
            {
                entity.ToTable("Subjects");

                entity.HasKey(e => e.ID);

                entity.Property(e => e.Name)
                      .IsRequired();

                entity.Property(e => e.Description)
                      .IsRequired();

                entity.Property(e => e.Status)
                      .IsRequired();
            });

            modelBuilder.Entity<Thesis>(entity =>
            {
                entity.ToTable("Thesis");

                entity.HasKey(e => e.ID);

                entity.Property(e => e.Topic)
                      .IsRequired();

                entity.Property(e => e.Advisor)
                      .IsRequired();

                entity.Property(e => e.Status)
                      .IsRequired();

                entity.HasOne(e => e.Student)
                      .WithMany()
                      .HasForeignKey(e => e.StudentId)
                      .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
