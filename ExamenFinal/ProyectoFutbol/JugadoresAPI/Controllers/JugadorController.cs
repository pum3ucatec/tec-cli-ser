using Microsoft.AspNetCore.Mvc;
using JugadoresAPI.Models;

namespace JugadoresAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JugadorController : ControllerBase
    {

        private static List<Jugador> jugadores = new List<Jugador>
{
    new Jugador("Lionel Messi", 34, "Delantero", "PSG", new DateTime(1987, 6, 24), "Dribbling, Pase"),
    new Jugador("Cristiano Ronaldo", 36, "Delantero", "Manchester United", new DateTime(1985, 2, 5), "Tiros, Velocidad")
};



        [HttpGet]
        public ActionResult<IEnumerable<Jugador>> GetAllJugadores()
        {
            return Ok(jugadores);
        }


        [HttpGet("{id}")]
        public IActionResult GetJugadorById(int id)
        {
            var jugador = jugadores.FirstOrDefault(j => j.Id == id);
            if (jugador == null)
            {
                return NotFound(); 
            }
            return Ok(jugador); 
        }


        [HttpPost]
        public IActionResult CreateJugador([FromBody] Jugador nuevoJugador)
        {
            jugadores.Add(nuevoJugador);
            return CreatedAtAction(nameof(GetJugadorById), new { id = nuevoJugador.Id }, nuevoJugador);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateJugador(int id, [FromBody] Jugador jugador)
        {
            var jugadorExistente = jugadores.FirstOrDefault(j => j.Id == id);
            if (jugadorExistente == null)
            {
                return NotFound();
            }


            jugadorExistente.Nombre = jugador.Nombre;
            jugadorExistente.Posicion = jugador.Posicion;
            jugadorExistente.Equipo = jugador.Equipo;
            jugadorExistente.FechaNacimiento = jugador.FechaNacimiento;

            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteJugador(int id)
        {
            var jugador = jugadores.FirstOrDefault(j => j.Id == id);
            if (jugador == null)
            {
                return NotFound();
            }

            jugadores.Remove(jugador); 
            return NoContent();
        }
    }
}
