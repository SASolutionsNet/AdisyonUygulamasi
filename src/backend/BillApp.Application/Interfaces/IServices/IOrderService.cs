using BillApp.Application.Contracts.Order;
using BillApp.Application.Utilities;

namespace BillApp.Application.Interfaces.IServices
{
    public interface IOrderService : IApplicationService<OrderDto>
    {
        Task<ServiceResponse<List<OrderDto>>> CreateRange(IEnumerable<OrderDto> dtos);
        Task<ServiceResponse<List<OrderForBillDto>>> GetOrdersForBill(Guid billId);
        List<OrderDto> GetOrders(Guid billId);
        void AddOrder(OrderDto orderDto);

    }
}
