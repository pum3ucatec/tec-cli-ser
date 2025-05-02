using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using e3_csharp.Data;
using e3_csharp.Models;

namespace e3_csharp.Controllers
{
    public class VoleyballController : Controller
    {
        private readonly ApplicationDbContext _context;

        public VoleyballController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Voleyball
        public async Task<IActionResult> Index()
        {
            return View(await _context.Voleyballs.ToListAsync());
        }

        // GET: Voleyball/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var voleyball = await _context.Voleyballs
                .FirstOrDefaultAsync(m => m.Id == id);
            if (voleyball == null)
            {
                return NotFound();
            }

            return View(voleyball);
        }

        // GET: Voleyball/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Voleyball/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,TeamName,Coach,Schedule")] Voleyball voleyball)
        {
            if (ModelState.IsValid)
            {
                _context.Add(voleyball);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(voleyball);
        }

        // GET: Voleyball/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var voleyball = await _context.Voleyballs.FindAsync(id);
            if (voleyball == null)
            {
                return NotFound();
            }
            return View(voleyball);
        }

        // POST: Voleyball/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,TeamName,Coach,Schedule")] Voleyball voleyball)
        {
            if (id != voleyball.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(voleyball);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!VoleyballExists(voleyball.Id))
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
            return View(voleyball);
        }

        // GET: Voleyball/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var voleyball = await _context.Voleyballs
                .FirstOrDefaultAsync(m => m.Id == id);
            if (voleyball == null)
            {
                return NotFound();
            }

            return View(voleyball);
        }

        // POST: Voleyball/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var voleyball = await _context.Voleyballs.FindAsync(id);
            if (voleyball != null)
            {
                _context.Voleyballs.Remove(voleyball);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool VoleyballExists(int id)
        {
            return _context.Voleyballs.Any(e => e.Id == id);
        }
    }
}
