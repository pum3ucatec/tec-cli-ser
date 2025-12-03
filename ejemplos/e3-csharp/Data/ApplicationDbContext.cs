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
<<<<<<< HEAD
=======
        public DbSet<Career> Careers { get; set; }
>>>>>>> c39066d9d6c1d01b3a2bf1fc75add312f9e3e5a5
    }
}