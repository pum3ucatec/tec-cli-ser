using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microevaluacion3.Data;

namespace Microevaluacion3.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<HomeController> _logger;

        public HomeController(ApplicationDbContext context, ILogger<HomeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IActionResult> Index()
        {
            // Estadísticas para mostrar en el dashboard
            var totalDefenses = await _context.Defenses.CountAsync();
            var totalStudents = await _context.Students.CountAsync();
            var totalEvaluators = await _context.Evaluators.CountAsync();
            
            var todayDefenses = await _context.Defenses
                .Where(d => d.DefenseDate.Date == DateTime.Today)
                .CountAsync();
                
            var completedDefenses = await _context.Defenses
                .Where(d => d.Status == "Completed")
                .CountAsync();

            ViewData["TotalDefenses"] = totalDefenses;
            ViewData["TotalStudents"] = totalStudents;
            ViewData["TotalEvaluators"] = totalEvaluators;
            ViewData["TodayDefenses"] = todayDefenses;
            ViewData["CompletedDefenses"] = completedDefenses;

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View();
        }
    }
}