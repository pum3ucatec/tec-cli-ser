using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using e3_csharp.Data;
using e3_csharp.Models;

namespace e3_csharp.Controllers
{
    public class ClassroomController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ClassroomController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Classroom
        public async Task<IActionResult> Index()
        {
            var classrooms = await _context.Classrooms.ToListAsync();
            return View(classrooms);
        }

        // GET: Classroom/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
                return NotFound();

            var classroom = await _context.Classrooms.FirstOrDefaultAsync(m => m.Id == id);

            if (classroom == null)
                return NotFound();

            return View(classroom);
        }

        // GET: Classroom/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Classroom/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Codigo,Nombre,Estado")] Classroom classroom)
        {
            if (_context.Classrooms.Any(c => c.Codigo == classroom.Codigo))
            {
                ModelState.AddModelError("Codigo", "El código ya existe.");
            }

            if (ModelState.IsValid)
            {
                _context.Add(classroom);
                await _context.SaveChangesAsync();
                TempData["SuccessMessage"] = "✅ Aula creada exitosamente.";
                return RedirectToAction(nameof(Index));
            }

            TempData["ErrorMessage"] = "❌ Error al crear el aula. Revisa los datos.";
            return View(classroom);
        }

        // GET: Classroom/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
                return NotFound();

            var classroom = await _context.Classrooms.FindAsync(id);

            if (classroom == null)
                return NotFound();

            return View(classroom);
        }

        // POST: Classroom/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Codigo,Nombre,Estado")] Classroom classroom)
        {
            if (id != classroom.Id)
                return NotFound();

            if (_context.Classrooms.Any(c => c.Codigo == classroom.Codigo && c.Id != classroom.Id))
            {
                ModelState.AddModelError("Codigo", "El código ya existe en otro aula.");
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(classroom);
                    await _context.SaveChangesAsync();
                    TempData["SuccessMessage"] = "✅ Aula editada exitosamente.";
                    return RedirectToAction(nameof(Index));
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ClassroomExists(classroom.Id))
                        return NotFound();
                    else
                        throw;
                }
            }

            TempData["ErrorMessage"] = "❌ Error al editar el aula. Revisa los datos.";
            return View(classroom);
        }

        // GET: Classroom/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
                return NotFound();

            var classroom = await _context.Classrooms.FirstOrDefaultAsync(m => m.Id == id);

            if (classroom == null)
                return NotFound();

            return View(classroom);
        }

        // POST: Classroom/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var classroom = await _context.Classrooms.FindAsync(id);

            if (classroom == null)
                return NotFound();

            _context.Classrooms.Remove(classroom);
            await _context.SaveChangesAsync();
            TempData["SuccessMessage"] = "✅ Aula eliminada exitosamente.";
            return RedirectToAction(nameof(Index));
        }

        private bool ClassroomExists(int id)
        {
            return _context.Classrooms.Any(e => e.Id == id);
        }
    }
}
