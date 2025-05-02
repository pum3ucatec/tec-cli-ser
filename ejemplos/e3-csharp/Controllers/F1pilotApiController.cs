using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using e3_csharp.Data;
using e3_csharp.Models;

namespace e3_csharp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class F1pilotApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public F1pilotApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/F1pilotApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<F1pilot>>> GetF1pilots()
        {
            return await _context.F1pilots.ToListAsync();
        }

        // GET: api/F1pilotApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<F1pilot>> GetF1pilot(int id)
        {
            var pilot = await _context.F1pilots.FindAsync(id);

            if (pilot == null)
            {
                return NotFound();
            }

            return pilot;
        }

        // PUT: api/F1pilotApi/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutF1pilot(int id, F1pilot pilot)
        {
            if (id != pilot.ID)
            {
                return BadRequest();
            }

            _context.Entry(pilot).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!F1pilotExists(id))
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

        // POST: api/F1pilotApi
        [HttpPost]
        public async Task<ActionResult<F1pilot>> PostF1pilot(F1pilot pilot)
        {
            _context.F1pilots.Add(pilot);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetF1pilot", new { id = pilot.ID }, pilot);
        }

        // DELETE: api/F1pilotApi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteF1pilot(int id)
        {
            var pilot = await _context.F1pilots.FindAsync(id);
            if (pilot == null)
            {
                return NotFound();
            }

            _context.F1pilots.Remove(pilot);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool F1pilotExists(int id)
        {
            return _context.F1pilots.Any(e => e.ID == id);
        }
    }
}
