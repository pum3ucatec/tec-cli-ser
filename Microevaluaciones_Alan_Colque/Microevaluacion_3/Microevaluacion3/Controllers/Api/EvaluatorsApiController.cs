using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microevaluacion3.Data;
using Microevaluacion3.Models;

namespace Microevaluacion3.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvaluatorsApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EvaluatorsApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/EvaluatorsApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Evaluator>>> GetEvaluators()
        {
            return await _context.Evaluators.ToListAsync();
        }

        // GET: api/EvaluatorsApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Evaluator>> GetEvaluator(int id)
        {
            var evaluator = await _context.Evaluators.FindAsync(id);

            if (evaluator == null)
            {
                return NotFound(new { message = "Evaluador no encontrado" });
            }

            return evaluator;
        }

        // GET: api/EvaluatorsApi/code/PROF001
        [HttpGet("code/{code}")]
        public async Task<ActionResult<Evaluator>> GetEvaluatorByCode(string code)
        {
            var evaluator = await _context.Evaluators
                .FirstOrDefaultAsync(e => e.Code == code);

            if (evaluator == null)
            {
                return NotFound(new { message = "Evaluador no encontrado" });
            }

            return evaluator;
        }

        // POST: api/EvaluatorsApi
        [HttpPost]
        public async Task<ActionResult<Evaluator>> PostEvaluator(Evaluator evaluator)
        {
            // Validar código único
            var existingEvaluator = await _context.Evaluators
                .FirstOrDefaultAsync(e => e.Code == evaluator.Code);
                
            if (existingEvaluator != null)
            {
                return BadRequest(new { message = "El código de evaluador ya existe" });
            }

            evaluator.CreatedAt = DateTime.UtcNow;
            evaluator.IsActive = true;
            
            _context.Evaluators.Add(evaluator);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEvaluator", new { id = evaluator.Id }, evaluator);
        }

        // PUT: api/EvaluatorsApi/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvaluator(int id, Evaluator evaluator)
        {
            if (id != evaluator.Id)
            {
                return BadRequest();
            }

            // Validar código único (excluyendo el actual)
            var existingEvaluator = await _context.Evaluators
                .FirstOrDefaultAsync(e => e.Code == evaluator.Code && e.Id != id);
                
            if (existingEvaluator != null)
            {
                return BadRequest(new { message = "El código de evaluador ya existe" });
            }

            _context.Entry(evaluator).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EvaluatorExists(id))
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

        // DELETE: api/EvaluatorsApi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvaluator(int id)
        {
            var evaluator = await _context.Evaluators.FindAsync(id);
            if (evaluator == null)
            {
                return NotFound();
            }

            // COMENTADO porque no tienes DefenseEvaluators
            // Si necesitas esta validación, necesitas crear la tabla intermedia
            /*
            var hasDefenses = await _context.DefenseEvaluators.AnyAsync(de => de.EvaluatorId == id);
            if (hasDefenses)
            {
                return BadRequest(new { message = "No se puede eliminar el evaluador porque está asignado a defensas" });
            }
            */

            _context.Evaluators.Remove(evaluator);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/EvaluatorsApi/5/deactivate
        [HttpPatch("{id}/deactivate")]
        public async Task<IActionResult> DeactivateEvaluator(int id)
        {
            var evaluator = await _context.Evaluators.FindAsync(id);
            if (evaluator == null)
            {
                return NotFound();
            }

            evaluator.IsActive = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/EvaluatorsApi/5/activate
        [HttpPatch("{id}/activate")]
        public async Task<IActionResult> ActivateEvaluator(int id)
        {
            var evaluator = await _context.Evaluators.FindAsync(id);
            if (evaluator == null)
            {
                return NotFound();
            }

            evaluator.IsActive = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/EvaluatorsApi/active
        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<Evaluator>>> GetActiveEvaluators()
        {
            return await _context.Evaluators
                .Where(e => e.IsActive)
                .ToListAsync();
        }

        // GET: api/EvaluatorsApi/type/Internal
        [HttpGet("type/{type}")]
        public async Task<ActionResult<IEnumerable<Evaluator>>> GetEvaluatorsByType(string type)
        {
            return await _context.Evaluators
                .Where(e => e.Type == type && e.IsActive)
                .ToListAsync();
        }

        // GET: api/EvaluatorsApi/department/Computer Science
        [HttpGet("department/{department}")]
        public async Task<ActionResult<IEnumerable<Evaluator>>> GetEvaluatorsByDepartment(string department)
        {
            return await _context.Evaluators
                .Where(e => e.Department == department && e.IsActive)
                .ToListAsync();
        }

        // GET: api/EvaluatorsApi/search?name=john&type=Internal
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Evaluator>>> SearchEvaluators(
            [FromQuery] string name = null, 
            [FromQuery] string type = null,
            [FromQuery] string department = null,
            [FromQuery] bool? active = null)
        {
            var query = _context.Evaluators.AsQueryable();

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(e => 
                    e.FirstName.Contains(name) || 
                    e.LastName.Contains(name) ||
                    e.Code.Contains(name));
            }

            if (!string.IsNullOrEmpty(type))
            {
                query = query.Where(e => e.Type == type);
            }

            if (!string.IsNullOrEmpty(department))
            {
                query = query.Where(e => e.Department == department);
            }

            if (active.HasValue)
            {
                query = query.Where(e => e.IsActive == active.Value);
            }

            return await query.ToListAsync();
        }

        // COMENTADO porque necesitas DefenseEvaluators
        /*
        // GET: api/EvaluatorsApi/5/defenses
        [HttpGet("{id}/defenses")]
        public async Task<ActionResult<IEnumerable<Defense>>> GetEvaluatorDefenses(int id)
        {
            var evaluatorExists = await _context.Evaluators.AnyAsync(e => e.Id == id);
            if (!evaluatorExists)
            {
                return NotFound(new { message = "Evaluador no encontrado" });
            }

            var defenses = await _context.DefenseEvaluators
                .Where(de => de.EvaluatorId == id)
                .Include(de => de.Defense)
                .Select(de => de.Defense)
                .ToListAsync();

            return defenses;
        }
        */

        // GET: api/EvaluatorsApi/stats
        [HttpGet("stats")]
        public async Task<ActionResult<object>> GetEvaluatorsStats()
        {
            var totalEvaluators = await _context.Evaluators.CountAsync();
            var activeEvaluators = await _context.Evaluators.CountAsync(e => e.IsActive);
            var evaluatorsByType = await _context.Evaluators
                .GroupBy(e => e.Type)
                .Select(g => new
                {
                    Type = g.Key,
                    Count = g.Count(),
                    Active = g.Count(e => e.IsActive)
                })
                .ToListAsync();

            var evaluatorsByDepartment = await _context.Evaluators
                .Where(e => !string.IsNullOrEmpty(e.Department))
                .GroupBy(e => e.Department)
                .Select(g => new
                {
                    Department = g.Key,
                    Count = g.Count(),
                    Active = g.Count(e => e.IsActive)
                })
                .OrderByDescending(g => g.Count)
                .Take(10)
                .ToListAsync();

            return new
            {
                TotalEvaluators = totalEvaluators,
                ActiveEvaluators = activeEvaluators,
                InactiveEvaluators = totalEvaluators - activeEvaluators,
                EvaluatorsByType = evaluatorsByType,
                TopDepartments = evaluatorsByDepartment
            };
        }

        private bool EvaluatorExists(int id)
        {
            return _context.Evaluators.Any(e => e.Id == id);
        }
    }
}