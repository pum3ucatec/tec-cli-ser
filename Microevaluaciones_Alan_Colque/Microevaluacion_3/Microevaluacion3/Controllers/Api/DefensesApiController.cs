using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microevaluacion3.Data;
using Microevaluacion3.Models;

namespace Microevaluacion3.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class DefensesApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DefensesApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DefensesApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Defense>>> GetDefenses()
        {
            return await _context.Defenses
                .Include(d => d.Student)
                .ToListAsync();
        }

        // GET: api/DefensesApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Defense>> GetDefense(int id)
        {
            var defense = await _context.Defenses
                .Include(d => d.Student)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (defense == null)
            {
                return NotFound();
            }

            return defense;
        }

        // PUT: api/DefensesApi/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDefense(int id, Defense defense)
        {
            if (id != defense.Id)
            {
                return BadRequest();
            }

            _context.Entry(defense).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DefenseExists(id))
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

        // POST: api/DefensesApi
        [HttpPost]
        public async Task<ActionResult<Defense>> PostDefense(Defense defense)
        {
            defense.CreatedAt = DateTime.UtcNow;
            _context.Defenses.Add(defense);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDefense", new { id = defense.Id }, defense);
        }

        // DELETE: api/DefensesApi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDefense(int id)
        {
            var defense = await _context.Defenses.FindAsync(id);
            if (defense == null)
            {
                return NotFound();
            }

            _context.Defenses.Remove(defense);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/DefensesApi/today
        [HttpGet("today")]
        public async Task<ActionResult<IEnumerable<Defense>>> GetTodayDefenses()
        {
            var today = DateTime.Today;
            return await _context.Defenses
                .Include(d => d.Student)
                .Where(d => d.DefenseDate.Date == today)
                .ToListAsync();
        }

        // GET: api/DefensesApi/career/{career}
        [HttpGet("career/{career}")]
        public async Task<ActionResult<IEnumerable<Defense>>> GetDefensesByCareer(string career)
        {
            return await _context.Defenses
                .Include(d => d.Student)
                .Where(d => d.Career == career)
                .ToListAsync();
        }

        private bool DefenseExists(int id)
        {
            return _context.Defenses.Any(e => e.Id == id);
        }
    }
}