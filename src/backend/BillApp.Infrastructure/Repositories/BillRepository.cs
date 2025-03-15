using BillApp.Application.Interfaces;
using BillApp.Application.Interfaces.IRepositories;
using BillApp.Domain.Bill;
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
    public class BillRepository : IBillRepository
    {
        private readonly ApplicationDbContext _context;

        public BillRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IQueryable<Bill> GetQueryable()
        {
            return _context.Bills.AsQueryable(); // Base query for products
        }
        public async Task<Bill> CreateAsync(Bill bill)
        {
            _context.Bills.Add(bill);

            await _context.SaveChangesAsync();

            var createdBill = await _context.Bills.FirstOrDefaultAsync(c => c.Id == bill.Id);

            return createdBill ?? throw new Exception("Bill not found after creation.");
        }

        public async Task<Bill> DeleteAsync(Bill bill)
        {
            var existingBill = await _context.Bills.FindAsync(bill.Id);
            if (existingBill == null)
            {
                throw new KeyNotFoundException("Bill not found.");
            }

            existingBill.IsDel = true;

            await _context.SaveChangesAsync();
            return existingBill;
        }

        public async Task<IEnumerable<Bill>> GetAllAsync()
        {
            return await _context.Bills.AsQueryable()
                .Include(p => p.Orders)
                .ThenInclude(p => p.Product)
                .ToListAsync();
        }

        public async Task<Bill?> GetByIdAsync(Guid id)
        {
            return _context.Bills.AsQueryable().Where(x => x.Id.Equals(id)).Include(p => p.Orders).ThenInclude(p => p.Product).First();

        }


        public async Task<Bill> UpdateAsync(Bill bill)
        {
            var existingBill = await _context.Bills.FindAsync(bill.Id);
            if (existingBill == null)
            {
                throw new KeyNotFoundException("Category not found.");
            }

            _context.Entry(existingBill).CurrentValues.SetValues(bill);
            await _context.SaveChangesAsync();

            return existingBill;
        }
    }
}
