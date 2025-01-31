using BillApp.Application.Interfaces.IRepositories;
using BillApp.Domain.Category;
using BillApp.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BillApp.Infrastructure.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;
        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Category> CreateAsync(Category category)
        {
            _context.Categories.Add(category);

            await _context.SaveChangesAsync();

            var createdCategory = await _context.Categories.FirstOrDefaultAsync(c => c.Id == category.Id);

            return createdCategory ?? throw new Exception("Category not found after creation.");
        }

        public async Task<Category> DeleteAsync(Category category)
        {
            var existingCategory = await _context.Categories.FindAsync(category.Id);
            if (existingCategory == null)
            {
                throw new KeyNotFoundException("Category not found.");
            }

            existingCategory.IsDel = true;

            await _context.SaveChangesAsync();
            return existingCategory;
        }

        public async Task<Category> RestoreAsync(Guid id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                throw new KeyNotFoundException("Category not found.");
            }

            category.IsDel = false;
            await _context.SaveChangesAsync();

            return category;
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(Guid id)
        {
            return await _context.Categories.FindAsync(id);
        }


        public async Task<Category> UpdateAsync(Category category)
        {
            var existingCategory = await _context.Categories.FindAsync(category.Id);
            if (existingCategory == null)
            {
                throw new KeyNotFoundException("Category not found.");
            }

            _context.Entry(existingCategory).CurrentValues.SetValues(category);
            await _context.SaveChangesAsync();

            return existingCategory;
        }
    }
}
