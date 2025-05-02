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
    public class KickController : Controller
    {
        private readonly ApplicationDbContext _context;

        public KickController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Kick
        public async Task<IActionResult> Index()
        {
            return View(await _context.Kicks.ToListAsync());
        }

        // GET: Kick/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var kick = await _context.Kicks
                .FirstOrDefaultAsync(m => m.Id == id);
            if (kick == null)
            {
                return NotFound();
            }

            return View(kick);
        }

        // GET: Kick/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Kick/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Category,TrainingDate")] Kick kick)
        {
            if (ModelState.IsValid)
            {
                _context.Add(kick);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(kick);
        }

        // GET: Kick/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var kick = await _context.Kicks.FindAsync(id);
            if (kick == null)
            {
                return NotFound();
            }
            return View(kick);
        }

        // POST: Kick/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Category,TrainingDate")] Kick kick)
        {
            if (id != kick.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(kick);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!KickExists(kick.Id))
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
            return View(kick);
        }

        // GET: Kick/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var kick = await _context.Kicks
                .FirstOrDefaultAsync(m => m.Id == id);
            if (kick == null)
            {
                return NotFound();
            }

            return View(kick);
        }

        // POST: Kick/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var kick = await _context.Kicks.FindAsync(id);
            if (kick != null)
            {
                _context.Kicks.Remove(kick);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool KickExists(int id)
        {
            return _context.Kicks.Any(e => e.Id == id);
        }
    }
}
