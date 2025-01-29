using BillApp.Domain.Category;
using BillApp.Domain.User;
using Microsoft.EntityFrameworkCore;

namespace BillApp.Application.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<User> Users { get; }

        DbSet<Category> Categories { get; } 

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
