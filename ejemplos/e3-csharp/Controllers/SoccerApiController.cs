using Microsoft.AspNetCore.Mvc;
using e3_csharp.Models;
using e3_csharp.Data;
using System.Linq;

namespace e3_csharp.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class SoccerApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SoccerApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/soccer
        [HttpGet]
        public IActionResult GetSoccers()
        {
            var soccers = _context.Soccers.ToList();
            return Ok(soccers);
        }

        // GET: api/soccer/5
        [HttpGet("{id}")]
        public IActionResult GetSoccer(int id)
        {
            var soccer = _context.Soccers.FirstOrDefault(s => s.Id == id);
            if (soccer == null)
            {
                return NotFound();
            }
            return Ok(soccer);
        }

        // POST: api/soccer
        [HttpPost]
        public IActionResult PostSoccer([FromBody] Soccer soccer)
        {
            if (ModelState.IsValid)
            {
                _context.Soccers.Add(soccer);
                _context.SaveChanges();
                return CreatedAtAction("GetSoccer", new { id = soccer.Id }, soccer);
            }
            return BadRequest(ModelState);
        }

        // PUT: api/soccer/5
        [HttpPut("{id}")]
        public IActionResult PutSoccer(int id, [FromBody] Soccer soccer)
        {
            if (id != soccer.Id)
            {
                return BadRequest();
            }

            _context.Update(soccer);
            _context.SaveChanges();
            return NoContent();
        }

        // DELETE: api/soccer/5
        [HttpDelete("{id}")]
        public IActionResult DeleteSoccer(int id)
        {
            var soccer = _context.Soccers.FirstOrDefault(s => s.Id == id);
            if (soccer == null)
            {
                return NotFound();
            }

            _context.Soccers.Remove(soccer);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
