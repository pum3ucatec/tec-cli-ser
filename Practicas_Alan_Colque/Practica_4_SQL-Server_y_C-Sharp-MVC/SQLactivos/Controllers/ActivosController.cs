using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLactivos.Data;
using SQLactivos.Models;

namespace SQLactivos.Controllers
{
    public class ActivosController : Controller
    {
        private readonly AppDbContext _context;

        public ActivosController(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            try
            {
                var lista = await _context.Activos.ToListAsync();
                return View(lista);
            }
            catch (Exception ex)
            {
                // En desarrollo, mostrar el error
                ViewBag.Error = $"Error al cargar los activos: {ex.Message}";
                return View(new List<Activo>());
            }
        }
    }
}