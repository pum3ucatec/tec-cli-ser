using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microevaluacion3.Data;
using Microevaluacion3.Models;

namespace Microevaluacion3.Controllers
{
    public class DefensesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DefensesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Defenses
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Defenses.Include(d => d.Student);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Defenses/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var defense = await _context.Defenses
                .Include(d => d.Student)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (defense == null)
            {
                return NotFound();
            }

            return View(defense);
        }

        // GET: Defenses/Create
        public IActionResult Create()
        {
            ViewData["StudentId"] = new SelectList(_context.Students, "Id", "Career");
            return View();
        }

        // POST: Defenses/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Title,Description,Career,DefenseType,Status,DefenseDate,StartTime,EndTime,Location,Classroom,Grade,StudentId,CreatedAt")] Defense defense)
        {
            if (ModelState.IsValid)
            {
                _context.Add(defense);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["StudentId"] = new SelectList(_context.Students, "Id", "Career", defense.StudentId);
            return View(defense);
        }

        // GET: Defenses/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var defense = await _context.Defenses.FindAsync(id);
            if (defense == null)
            {
                return NotFound();
            }
            ViewData["StudentId"] = new SelectList(_context.Students, "Id", "Career", defense.StudentId);
            return View(defense);
        }

        // POST: Defenses/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Title,Description,Career,DefenseType,Status,DefenseDate,StartTime,EndTime,Location,Classroom,Grade,StudentId,CreatedAt")] Defense defense)
        {
            if (id != defense.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(defense);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DefenseExists(defense.Id))
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
            ViewData["StudentId"] = new SelectList(_context.Students, "Id", "Career", defense.StudentId);
            return View(defense);
        }

        // GET: Defenses/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var defense = await _context.Defenses
                .Include(d => d.Student)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (defense == null)
            {
                return NotFound();
            }

            return View(defense);
        }

        // POST: Defenses/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var defense = await _context.Defenses.FindAsync(id);
            if (defense != null)
            {
                _context.Defenses.Remove(defense);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool DefenseExists(int id)
        {
            return _context.Defenses.Any(e => e.Id == id);
        }
    }
}
