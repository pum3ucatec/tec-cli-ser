using Microsoft.AspNetCore.Mvc;
using e3_csharp.Models;
using e3_csharp.Data;
using System.Linq;

namespace e3_csharp.Controllers
{
    public class SoccerController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SoccerController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Index
        public IActionResult Index()
        {
            var equipos = _context.Soccers.ToList();
            return View(equipos);
        }

        // Details
        public IActionResult Details(int id)
        {
            var equipo = _context.Soccers.FirstOrDefault(s => s.Id == id);
            if (equipo == null)
            {
                return NotFound();
            }
            return View(equipo);
        }

        // Create - GET
        public IActionResult Create()
        {
            return View();
        }

        // Create - POST
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Soccer soccer)
        {
            if (ModelState.IsValid)
            {
                _context.Soccers.Add(soccer);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            return View(soccer);
        }

        // Edit - GET
        public IActionResult Edit(int id)
        {
            var equipo = _context.Soccers.FirstOrDefault(s => s.Id == id);
            if (equipo == null)
            {
                return NotFound();
            }
            return View(equipo);
        }

        // Edit - POST
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Soccer soccer)
        {
            if (id != soccer.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                _context.Update(soccer);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            return View(soccer);
        }

        // Delete - GET
        public IActionResult Delete(int id)
        {
            var equipo = _context.Soccers.FirstOrDefault(s => s.Id == id);
            if (equipo == null)
            {
                return NotFound();
            }
            return View(equipo);
        }

        // Delete - POST
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            var equipo = _context.Soccers.FirstOrDefault(s => s.Id == id);
            if (equipo != null)
            {
                _context.Soccers.Remove(equipo);
                _context.SaveChanges();
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
