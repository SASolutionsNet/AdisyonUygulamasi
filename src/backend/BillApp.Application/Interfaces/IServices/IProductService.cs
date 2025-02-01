using BillApp.Application.Contracts.Product;
using BillApp.Application.Utilities;

namespace BillApp.Application.Interfaces.IServices
{
    public interface IProductService : IApplicationService<ProductDto>
    {
        Task<ServiceResponse<IEnumerable<ProductDto>>> GetFavoriteProducts();
    }
}
