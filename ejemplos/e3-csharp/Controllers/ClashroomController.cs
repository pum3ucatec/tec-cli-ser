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
    public class ClashroomController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ClashroomController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Clashroom
        public async Task<IActionResult> Index()
        {
            return View(await _context.Clashrooms.ToListAsync());
        }

        // GET: Clashroom/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var clashroom = await _context.Clashrooms
                .FirstOrDefaultAsync(m => m.ID == id);
            if (clashroom == null)
            {
                return NotFound();
            }

            return View(clashroom);
        }

        // GET: Clashroom/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Clashroom/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Nombre,Capacidad,Estado")] Clashroom clashroom)
        {
            if (ModelState.IsValid)
            {
                _context.Add(clashroom);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(clashroom);
        }

        // GET: Clashroom/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var clashroom = await _context.Clashrooms.FindAsync(id);
            if (clashroom == null)
            {
                return NotFound();
            }
            return View(clashroom);
        }

        // POST: Clashroom/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Nombre,Capacidad,Estado")] Clashroom clashroom)
        {
            if (id != clashroom.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(clashroom);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ClashroomExists(clashroom.ID))
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
            return View(clashroom);
        }

        // GET: Clashroom/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var clashroom = await _context.Clashrooms
                .FirstOrDefaultAsync(m => m.ID == id);
            if (clashroom == null)
            {
                return NotFound();
            }

            return View(clashroom);
        }

        // POST: Clashroom/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var clashroom = await _context.Clashrooms.FindAsync(id);
            if (clashroom != null)
            {
                _context.Clashrooms.Remove(clashroom);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ClashroomExists(int id)
        {
            return _context.Clashrooms.Any(e => e.ID == id);
        }
    }
}
