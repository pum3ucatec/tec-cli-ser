using Microsoft.AspNetCore.Mvc;
using Data;
using Models;


[ApiController]
[Route("api/[controller]")]
public class PlayersController : ControllerBase
{
private readonly AppDbContext _context;


public PlayersController(AppDbContext context)
{
_context = context;
}


[HttpGet]
public IActionResult Get() => Ok(_context.Players.ToList());


[HttpPost]
public IActionResult Post(Player player)
{
_context.Players.Add(player);
_context.SaveChanges();
return Ok(player);
}


[HttpPut("{id}")]
public IActionResult Put(int id, Player player)
{
var p = _context.Players.Find(id);
if (p == null) return NotFound();


p.Nombre = player.Nombre;
p.Numero = player.Numero;
p.Posicion = player.Posicion;
p.FechaUnion = player.FechaUnion;


_context.SaveChanges();
return Ok(p);
}


[HttpDelete("{id}")]
public IActionResult Delete(int id)
{
var p = _context.Players.Find(id);
if (p == null) return NotFound();


_context.Players.Remove(p);
_context.SaveChanges();
return Ok();
}
}