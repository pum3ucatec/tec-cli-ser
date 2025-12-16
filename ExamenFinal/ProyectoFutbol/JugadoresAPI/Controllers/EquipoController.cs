using Microsoft.AspNetCore.Mvc;
using JugadoresAPI.Models;

namespace JugadoresAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipoController : ControllerBase
    {

        private static List<Equipo> equipos = new List<Equipo>
        {
            new Equipo("Real Madrid", "Madrid")
,
            new Equipo ("Barcelona", "Barcelona")
        };

        
        [HttpGet]
        public IActionResult GetEquipos()
        {
            return Ok(equipos);
        }

        
        [HttpPost]
        public IActionResult CreateEquipo([FromBody] Equipo equipo)
        {
            equipos.Add(equipo);
            return CreatedAtAction(nameof(GetEquipos), new { id = equipo.Id }, equipo);
        }

        
        [HttpPut("{id}")]
        public IActionResult UpdateEquipo(int id, [FromBody] Equipo equipo)
        {
            var existingEquipo = equipos.FirstOrDefault(e => e.Id == id);
            if (existingEquipo == null)
            {
                return NotFound();
            }

            existingEquipo.Nombre = equipo.Nombre;
            existingEquipo.Ciudad = equipo.Ciudad;
            return NoContent();
        }

        
        [HttpDelete("{id}")]
        public IActionResult DeleteEquipo(int id)
        {
            var equipo = equipos.FirstOrDefault(e => e.Id == id);
            if (equipo == null)
            {
                return NotFound();
            }

            equipos.Remove(equipo);
            return NoContent();
        }
    }
}
