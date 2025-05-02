using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using e3_csharp.Data;
using e3_csharp.Models;

namespace e3_csharp.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // ✅ Ruta unificada
    public class VoleyballApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VoleyballApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Voleyball>>> GetAll()
        {
            return await _context.Voleyballs.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Voleyball>> Get(int id)
        {
            var item = await _context.Voleyballs.FindAsync(id);
            if (item == null) return NotFound();
            return item;
        }

        [HttpPost]
        public async Task<ActionResult<Voleyball>> Create(Voleyball voleyball)
        {
            _context.Voleyballs.Add(voleyball);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = voleyball.Id }, voleyball);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Voleyball voleyball)
        {
            if (id != voleyball.Id) return BadRequest();
            _context.Entry(voleyball).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Voleyballs.FindAsync(id);
            if (item == null) return NotFound();
            _context.Voleyballs.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
