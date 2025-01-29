using BillApp.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BillApp.Api
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CategoryController : ControllerBase
    {
        private readonly IApplicationDbContext _context;

        public CategoryController(IApplicationDbContext context)
        {
            _context = context;
        }


        // GET: api/Category
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _context.Categories.ToListAsync();
            return Ok(categories);
        }

        // GET: api/Category/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound("Category not found.");

            return Ok(category);
        }

        //// POST: api/Category
        //[HttpPost]
        //[Authorize(Roles = "Admin")] // Restrict to Admins
        //public async Task<IActionResult> Create(Category category)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);

        //    _context.Categories.Add(category);
        //    await _context.SaveChangesAsync();
        //    return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
        //}

        //// PUT: api/Category/{id}
        //[HttpPut("{id}")]
        //[Authorize(Roles = "Admin")]
        //public async Task<IActionResult> Update(int id, Category category)
        //{
        //    if (id != category.Id)
        //        return BadRequest("Category ID mismatch.");

        //    var existingCategory = await _context.Categories.FindAsync(id);
        //    if (existingCategory == null)
        //        return NotFound("Category not found.");

        //    existingCategory.Name = category.Name;
        //    existingCategory.Description = category.Description;

        //    await _context.SaveChangesAsync();
        //    return NoContent();
        //}

        //// DELETE: api/Category/{id}
        //[HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        //public async Task<IActionResult> Delete(int id)
        //{
        //    var category = await _context.Categories.FindAsync(id);
        //    if (category == null)
        //        return NotFound("Category not found.");

        //    _context.Categories.Remove(category);
        //    await _context.SaveChangesAsync();
        //    return NoContent();
        //}
    }
}
