using BillApp.Application.Utilities;

namespace BillApp.Application.Interfaces.IServices
{
    public interface IApplicationService<T>
    {
        Task<ServiceResponse<T>> Create(T dto);
        Task<ServiceResponse<T>> Update(T dto);
        Task<ServiceResponse<T>> Delete(Guid id);
        //Task<ServiceResponse<T>> Restore(T dto);
        Task<ServiceResponse<T>> GetById(Guid id);
        Task<ServiceResponse<IEnumerable<T>>> GetAll();

        Task<ServiceResponse<T>> SuccesResult()
        {
            return null;
        }

    }
}
