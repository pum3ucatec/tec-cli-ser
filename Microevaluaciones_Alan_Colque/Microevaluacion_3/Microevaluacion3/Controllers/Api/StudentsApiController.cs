using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microevaluacion3.Data;
using Microevaluacion3.Models;

namespace Microevaluacion3.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudentsApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/StudentsApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await _context.Students.ToListAsync();
        }

        // GET: api/StudentsApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound(new { message = "Estudiante no encontrado" });
            }

            return student;
        }

        // GET: api/StudentsApi/code/CS2023001
        [HttpGet("code/{code}")]
        public async Task<ActionResult<Student>> GetStudentByCode(string code)
        {
            var student = await _context.Students
                .FirstOrDefaultAsync(s => s.Code == code);

            if (student == null)
            {
                return NotFound(new { message = "Estudiante no encontrado" });
            }

            return student;
        }

        // POST: api/StudentsApi
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(Student student)
        {
            // Validar código único
            var existingStudent = await _context.Students
                .FirstOrDefaultAsync(s => s.Code == student.Code);
                
            if (existingStudent != null)
            {
                return BadRequest(new { message = "El código de estudiante ya existe" });
            }

            student.CreatedAt = DateTime.UtcNow;
            student.IsActive = true;
            
            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudent", new { id = student.Id }, student);
        }

        // PUT: api/StudentsApi/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(int id, Student student)
        {
            if (id != student.Id)
            {
                return BadRequest();
            }

            // Validar código único (excluyendo el actual)
            var existingStudent = await _context.Students
                .FirstOrDefaultAsync(s => s.Code == student.Code && s.Id != id);
                
            if (existingStudent != null)
            {
                return BadRequest(new { message = "El código de estudiante ya existe" });
            }

            _context.Entry(student).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/StudentsApi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            // Verificar si tiene defensas asociadas
            var hasDefenses = await _context.Defenses.AnyAsync(d => d.StudentId == id);
            if (hasDefenses)
            {
                return BadRequest(new { message = "No se puede eliminar el estudiante porque tiene defensas asociadas" });
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/StudentsApi/5/deactivate
        [HttpPatch("{id}/deactivate")]
        public async Task<IActionResult> DeactivateStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            student.IsActive = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/StudentsApi/5/activate
        [HttpPatch("{id}/activate")]
        public async Task<IActionResult> ActivateStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            student.IsActive = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/StudentsApi/active
        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<Student>>> GetActiveStudents()
        {
            return await _context.Students
                .Where(s => s.IsActive)
                .ToListAsync();
        }

        // GET: api/StudentsApi/career/ComputerScience
        [HttpGet("career/{career}")]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudentsByCareer(string career)
        {
            return await _context.Students
                .Where(s => s.Career == career && s.IsActive)
                .ToListAsync();
        }

        // GET: api/StudentsApi/search?name=juan
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Student>>> SearchStudents(
            [FromQuery] string name = null, 
            [FromQuery] string career = null,
            [FromQuery] bool? active = null)
        {
            var query = _context.Students.AsQueryable();

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(s => 
                    s.FirstName.Contains(name) || 
                    s.LastName.Contains(name) ||
                    s.Code.Contains(name));
            }

            if (!string.IsNullOrEmpty(career))
            {
                query = query.Where(s => s.Career == career);
            }

            if (active.HasValue)
            {
                query = query.Where(s => s.IsActive == active.Value);
            }

            return await query.ToListAsync();
        }

        // GET: api/StudentsApi/5/defenses
        [HttpGet("{id}/defenses")]
        public async Task<ActionResult<IEnumerable<Defense>>> GetStudentDefenses(int id)
        {
            var studentExists = await _context.Students.AnyAsync(s => s.Id == id);
            if (!studentExists)
            {
                return NotFound(new { message = "Estudiante no encontrado" });
            }

            var defenses = await _context.Defenses
                .Where(d => d.StudentId == id)
                .ToListAsync();

            return defenses;
        }

        // GET: api/StudentsApi/stats
        [HttpGet("stats")]
        public async Task<ActionResult<object>> GetStudentsStats()
        {
            var totalStudents = await _context.Students.CountAsync();
            var activeStudents = await _context.Students.CountAsync(s => s.IsActive);
            var studentsByCareer = await _context.Students
                .GroupBy(s => s.Career)
                .Select(g => new
                {
                    Career = g.Key,
                    Count = g.Count(),
                    Active = g.Count(s => s.IsActive)
                })
                .ToListAsync();

            return new
            {
                TotalStudents = totalStudents,
                ActiveStudents = activeStudents,
                InactiveStudents = totalStudents - activeStudents,
                StudentsByCareer = studentsByCareer
            };
        }

        private bool StudentExists(int id)
        {
            return _context.Students.Any(e => e.Id == id);
        }
    }
}