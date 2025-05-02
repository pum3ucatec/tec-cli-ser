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
    public class F1pilotController : Controller
    {
        private readonly ApplicationDbContext _context;

        public F1pilotController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: F1pilot
        public async Task<IActionResult> Index()
        {
            return View(await _context.F1pilots.ToListAsync());
        }

        // GET: F1pilot/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var f1pilot = await _context.F1pilots
                .FirstOrDefaultAsync(m => m.ID == id);
            if (f1pilot == null)
            {
                return NotFound();
            }

            return View(f1pilot);
        }

        // GET: F1pilot/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: F1pilot/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Name,Number,Team")] F1pilot f1pilot)
        {
            if (ModelState.IsValid)
            {
                _context.Add(f1pilot);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(f1pilot);
        }

        // GET: F1pilot/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var f1pilot = await _context.F1pilots.FindAsync(id);
            if (f1pilot == null)
            {
                return NotFound();
            }
            return View(f1pilot);
        }

        // POST: F1pilot/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Name,Number,Team")] F1pilot f1pilot)
        {
            if (id != f1pilot.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(f1pilot);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!F1pilotExists(f1pilot.ID))
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
            return View(f1pilot);
        }

        // GET: F1pilot/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var f1pilot = await _context.F1pilots
                .FirstOrDefaultAsync(m => m.ID == id);
            if (f1pilot == null)
            {
                return NotFound();
            }

            return View(f1pilot);
        }

        // POST: F1pilot/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var f1pilot = await _context.F1pilots.FindAsync(id);
            if (f1pilot != null)
            {
                _context.F1pilots.Remove(f1pilot);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool F1pilotExists(int id)
        {
            return _context.F1pilots.Any(e => e.ID == id);
        }
    }
}
