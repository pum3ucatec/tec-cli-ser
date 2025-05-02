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
    public class VolleyballApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VolleyballApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/VolleyballApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Voleyball>>> GetVolleyballs()
        {
            return await _context.Voleyballs.ToListAsync();
        }

        // GET: api/VolleyballApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Voleyball>> GetVolleyball(int id)
        {
            var volleyball = await _context.Voleyballs.FindAsync(id);

            if (volleyball == null)
            {
                return NotFound();
            }

            return volleyball;
        }

        // PUT: api/VolleyballApi/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVolleyball(int id, Voleyball volleyball)
        {
            if (id != volleyball.Id)
            {
                return BadRequest();
            }

            _context.Entry(volleyball).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VolleyballExists(id))
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

        // POST: api/VolleyballApi
        [HttpPost]
        public async Task<ActionResult<Voleyball>> PostVolleyball(Voleyball volleyball)
        {
            _context.Voleyballs.Add(volleyball);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVolleyball", new { id = volleyball.Id }, volleyball);
        }

        // DELETE: api/VolleyballApi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVolleyball(int id)
        {
            var volleyball = await _context.Voleyballs.FindAsync(id);
            if (volleyball == null)
            {
                return NotFound();
            }

            _context.Voleyballs.Remove(volleyball);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VolleyballExists(int id)
        {
            return _context.Voleyballs.Any(e => e.Id == id);
        }
    }
}
