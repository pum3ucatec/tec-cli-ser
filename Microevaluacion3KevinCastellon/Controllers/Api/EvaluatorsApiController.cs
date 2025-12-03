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
            return await _context.Evaluators
                .Where(e => e.IsActive)
                .ToListAsync();
        }

        // GET: api/EvaluatorsApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Evaluator>> GetEvaluator(int id)
        {
            var evaluator = await _context.Evaluators.FindAsync(id);

            if (evaluator == null)
            {
                return NotFound();
            }

            return evaluator;
        }

        // POST: api/EvaluatorsApi
        [HttpPost]
        public async Task<ActionResult<Evaluator>> PostEvaluator(Evaluator evaluator)
        {
            evaluator.CreatedAt = DateTime.UtcNow;
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

            _context.Evaluators.Remove(evaluator);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/EvaluatorsApi/type/Internal
        [HttpGet("type/{type}")]
        public async Task<ActionResult<IEnumerable<Evaluator>>> GetEvaluatorsByType(string type)
        {
            return await _context.Evaluators
                .Where(e => e.Type == type && e.IsActive)
                .ToListAsync();
        }

        // GET: api/EvaluatorsApi/active
        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<Evaluator>>> GetActiveEvaluators()
        {
            return await _context.Evaluators
                .Where(e => e.IsActive)
                .ToListAsync();
        }

        private bool EvaluatorExists(int id)
        {
            return _context.Evaluators.Any(e => e.Id == id);
        }
    }
}