using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using e3_csharp.Data;
using e3_csharp.Models;

namespace YourProject.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThesisApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ThesisApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/thesis
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _context.Thesis
                .Include(t => t.Student)
                .ToListAsync();

            return Ok(list);
        }

        // GET: api/thesis/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var thesis = await _context.Thesis
                .Include(t => t.Student)
                .FirstOrDefaultAsync(t => t.ID == id);

            if (thesis == null) return NotFound();
            return Ok(thesis);
        }

        // POST: api/thesis
        [HttpPost]
        public async Task<IActionResult> Create(Thesis thesis)
        {
            _context.Thesis.Add(thesis);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = thesis.ID }, thesis);
        }

        // PUT: api/thesis/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Thesis thesis)
        {
            if (id != thesis.ID) return BadRequest();

            _context.Entry(thesis).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/thesis/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var thesis = await _context.Thesis.FindAsync(id);
            if (thesis == null) return NotFound();

            _context.Thesis.Remove(thesis);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
