using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using e3_csharp.Data;
using e3_csharp.Models;

namespace e3_csharp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KickApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public KickApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Kick
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Kick>>> GetAll()
        {
            return await _context.Kicks.ToListAsync();
        }

        // GET: api/Kick/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Kick>> Get(int id)
        {
            var item = await _context.Kicks.FindAsync(id);
            if (item == null)
                return NotFound();

            return item;
        }

        // POST: api/Kick
        [HttpPost]
        public async Task<ActionResult<Kick>> Create(Kick kick)
        {
            _context.Kicks.Add(kick);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = kick.Id }, kick);
        }

        // PUT: api/Kick/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Kick kick)
        {
            if (id != kick.Id)
                return BadRequest();

            _context.Entry(kick).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KickExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Kick/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var kick = await _context.Kicks.FindAsync(id);
            if (kick == null)
                return NotFound();

            _context.Kicks.Remove(kick);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool KickExists(int id)
        {
            return _context.Kicks.Any(e => e.Id == id);
        }
    }
}