using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinesApplication.WebAPI.Bussines.Services.Abstract
{
    public interface IBaseService<T> where T : class
    {
        Task<T?> GetByIdAsync(Guid id);

        Task<IEnumerable<T>> GetAllAsync();

        Task<T> AddAsync(T entity);
        Task<bool> DeleteAsync(Guid id);
        Task<T> UpdateAsync(T entity);
    }
}
