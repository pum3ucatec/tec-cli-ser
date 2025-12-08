using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using e3_csharp.Data;
using e3_csharp.Models;

namespace YourProject.Controllers
{
    public class ThesisController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ThesisController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Thesis
        public async Task<IActionResult> Index()
        {
            var list = await _context.Thesis
                .Include(t => t.Student)
                .ToListAsync();
            return View(list);
        }

        // GET: Thesis/Create
        public IActionResult Create()
        {
            ViewBag.Students = _context.Persons.ToList();
            return View();
        }

        // POST: Thesis/Create
        [HttpPost]
        public async Task<IActionResult> Create(Thesis thesis)
        {
            if (ModelState.IsValid)
            {
                _context.Add(thesis);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(thesis);
        }

        // GET: Thesis/Edit/5
        public async Task<IActionResult> Edit(int id)
        {
            var thesis = await _context.Thesis.FindAsync(id);
            if (thesis == null) return NotFound();

            ViewBag.Students = _context.Persons.ToList();
            return View(thesis);
        }

        // POST: Thesis/Edit
        [HttpPost]
        public async Task<IActionResult> Edit(Thesis thesis)
        {
            if (ModelState.IsValid)
            {
                _context.Update(thesis);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(thesis);
        }

        // GET: Thesis/Delete/5
        public async Task<IActionResult> Delete(int id)
        {
            var thesis = await _context.Thesis
                .Include(t => t.Student)
                .FirstOrDefaultAsync(t => t.ID == id);

            if (thesis == null) return NotFound();
            return View(thesis);
        }

        // POST: Thesis/Delete
        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var thesis = await _context.Thesis.FindAsync(id);
            if (thesis != null)
            {
                _context.Thesis.Remove(thesis);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
