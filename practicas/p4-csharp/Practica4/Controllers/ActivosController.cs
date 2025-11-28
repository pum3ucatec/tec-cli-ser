using Microsoft.AspNetCore.Mvc;
using MiProyectoActivos.Data;

namespace MiProyectoActivos.Controllers
{
    public class ActivosController : Controller
    {
        private readonly AppDbContext _context;

        public ActivosController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var lista = _context.Activos.ToList();
            return View(lista);
        }
    }
}
