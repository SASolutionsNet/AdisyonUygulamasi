using BillApp.Application.Interfaces.IRepositories;
using BillApp.Domain.Category;
using BillApp.Domain.Product;
using BillApp.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Product> CreateAsync(Product product)
        {
            _context.Products.Add(product);

            await _context.SaveChangesAsync();

            var createdCategory = await _context.Products.FirstOrDefaultAsync(c => c.Id == product.Id);

            return createdCategory ?? throw new Exception("Product not found after creation.");
        }

        public async Task<Product> DeleteAsync(Product product)
        {
            var existingProduct = await _context.Products.FindAsync(product.Id);
            if (existingProduct == null)
            {
                throw new KeyNotFoundException("Product not found.");
            }

            existingProduct.IsDel = true;
            await _context.SaveChangesAsync();
            return existingProduct;
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _context.Products.Include(p => p.Category).ToListAsync();
        }

        public IQueryable<Product> GetQueryable()
        {
            return _context.Products.AsQueryable();
        }

        public async Task<Product?> GetByIdAsync(Guid id)
        {
            return await _context.Products
                  .Include(p => p.Category) // Eager load the related Category
                  .FirstOrDefaultAsync(p => p.Id == id);
        }


        public async Task<Product> UpdateAsync(Product product)
        {
            var existingProduct = await _context.Products.FindAsync(product.Id);
            if (existingProduct == null)
            {
                throw new KeyNotFoundException("Product not found.");
            }

            _context.Entry(existingProduct).CurrentValues.SetValues(product);
            await _context.SaveChangesAsync();

            return existingProduct;
        }
    }
}
