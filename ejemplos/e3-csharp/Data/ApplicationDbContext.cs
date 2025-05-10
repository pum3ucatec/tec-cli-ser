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

        public DbSet<Person> Persons { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Career> Careers { get; set; }
    }
}