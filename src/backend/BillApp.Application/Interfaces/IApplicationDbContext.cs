using BillApp.Domain.Bill;
using BillApp.Domain.Category;
using BillApp.Domain.Product;
using BillApp.Domain.RevokedToken;
using BillApp.Domain.User;
using Microsoft.EntityFrameworkCore;

namespace BillApp.Application.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<User> Users { get; }
        DbSet<Category> Categories { get; set; }
        DbSet<RevokedToken> RevokedTokens { get; set; }
        DbSet<Product> Products { get; set; }
        DbSet<Bill> Bills { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
