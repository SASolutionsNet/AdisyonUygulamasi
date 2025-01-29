using BillApp.Application.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Application.Interfaces.Services
{
    public interface IApplicationService<T>
    {
        Task<ServiceResponse<T>> Create(T dto);
        Task<ServiceResponse<T>> Update(T dto);
        Task<ServiceResponse<T>> Delete(T dto);
        Task<ServiceResponse<T>> GetById(T dto);
        Task<ServiceResponse<T>> GetAll(T dto);

    }
}
