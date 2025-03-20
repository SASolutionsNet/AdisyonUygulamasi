using BillApp.Application.Interfaces.IRepositories;
using BillApp.Domain.Order;
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
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _context;

        public OrderRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Order> CreateAsync(Order order)
        {
            _context.Orders.Add(order);

            await _context.SaveChangesAsync();

            var createdOrder = await _context.Orders.FirstOrDefaultAsync(c => c.Id == order.Id);

            return createdOrder ?? throw new Exception("Bill not found after creation.");
        }

        public async Task<List<Order>> CreateRangeAsync(List<Order> orders)
        {
            if (orders == null || orders.Count == 0)
            {
                throw new ArgumentException("Order list cannot be null or empty.");
            }

            _context.Orders.AddRange(orders);
            await _context.SaveChangesAsync();

            var createdOrders = await _context.Orders
                .Where(o => orders.Select(order => order.Id).Contains(o.Id))
                .ToListAsync();

            if (createdOrders.Count != orders.Count)
            {
                throw new Exception("Some orders were not found after creation.");
            }

            return createdOrders;
        }

        public async Task<Order> DeleteAsync(Order order)
        {
            var existingOrder = await _context.Orders.FindAsync(order.Id);
            if (existingOrder == null)
            {
                throw new KeyNotFoundException("Order not found.");
            }

            existingOrder.IsDel = true;
            await _context.SaveChangesAsync();
            return existingOrder;
        }

        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            return await _context.Orders
                .Include(p => p.Bill)
                .Include(x => x.Product)
                .ToListAsync();
        }

        public IQueryable<Order> GetQueryable()
        {
            return _context.Orders.AsQueryable();
        }

        public async Task<Order?> GetByIdAsync(Guid id)
        {
            return await _context.Orders
                  .Include(p => p.Bill)
                  .Include(p => p.Product)
                  .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Order> UpdateAsync(Order order)
        {
            var existingOrder = await _context.Orders.FindAsync(order.Id);
            if (existingOrder == null)
            {
                throw new KeyNotFoundException("Order not found.");
            }

            _context.Entry(existingOrder).CurrentValues.SetValues(order);
            await _context.SaveChangesAsync();

            return existingOrder;
        }

        public async Task<bool> HardDeleteAsync(Guid id)
        {
            var order = await GetByIdAsync(id).ConfigureAwait(false);

            if (order == null)
                throw new KeyNotFoundException("Order not found.");

            _context.Orders.Remove(order);

            return true;
        }
    }
}
