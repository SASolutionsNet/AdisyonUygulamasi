using BillApp.Domain.Category;
using BillApp.Domain.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Application.Interfaces.IRepositories
{
    public interface IApplicationRepository<T>
    {
        Task<T> CreateAsync(T category);
        Task<T> UpdateAsync(T category);
        Task<T> DeleteAsync(T category);
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(Guid id);
        IQueryable<T> GetQueryable();


    }
}
