using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using e3_csharp.Data;
using e3_csharp.Models;
using System.Threading.Tasks;

namespace e3_csharp.Controllers
{
    public class CareerController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CareerController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Career
        public async Task<IActionResult> Index()
        {
            return View(await _context.Careers.ToListAsync());
        }

        // GET: Career/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var career = await _context.Careers
                .FirstOrDefaultAsync(m => m.Id == id);
            if (career == null)
            {
                return NotFound();
            }

            return View(career);
        }

        // GET: Career/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Career/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Name,Description")] Career career)
        {
            if (ModelState.IsValid)
            {
                _context.Add(career);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(career);
        }

        // GET: Career/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var career = await _context.Careers.FindAsync(id);
            if (career == null)
            {
                return NotFound();
            }
            return View(career);
        }

        // POST: Career/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Description")] Career career)
        {
            if (id != career.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(career);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CareerExists(career.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(career);
        }

        // GET: Career/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var career = await _context.Careers
                .FirstOrDefaultAsync(m => m.Id == id);
            if (career == null)
            {
                return NotFound();
            }

            return View(career);
        }

        // POST: Career/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var career = await _context.Careers.FindAsync(id);
            if (career == null)
            {
                return NotFound();
            }

            if (career != null)
            {
                _context.Careers.Remove(career);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        private bool CareerExists(int id)
        {
            return _context.Careers.Any(e => e.Id == id);
        }
    }
} 