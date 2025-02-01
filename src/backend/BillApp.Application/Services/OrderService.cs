using AutoMapper;
using BillApp.Application.Contracts.Order;
using BillApp.Application.Interfaces.IRepositories;
using BillApp.Application.Interfaces.IServices;
using BillApp.Application.Utilities;
using BillApp.Domain.Order;


namespace BillApp.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, ICurrentUserService currentUserService, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<OrderDto>> Create(OrderDto dto)
        {
            if (dto == null)
                return new ServiceResponse<OrderDto> { Data = null, Message = "Invalid Model", Success = false };

            var mappedModel = _mapper.Map<OrderDto, Order>(dto);

            var existingProduct = _orderRepository.GetQueryable().Where(p => p.BillId == dto.BillId && p.ProductId == dto.ProductId).ToList();

            if (existingProduct != null && existingProduct.Count != 0)
            {
                dto.Id = existingProduct[0].Id;
                dto.Quantity = existingProduct[0].Quantity + 1;
                return await Update(dto);
            }

            mappedModel.CreatedUser = _currentUserService.Username ?? "";

            var createdOrder = await _orderRepository.CreateAsync(mappedModel);

            var mappedReturnModel = _mapper.Map<Order, OrderDto>(createdOrder);

            return new ServiceResponse<OrderDto>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Order created successfully."
            };
        }
        public async Task<ServiceResponse<OrderDto>> Delete(Guid id)
        {
            if (id == Guid.Empty)
                return new ServiceResponse<OrderDto> { Message = "Invalid Model", Success = false };

            var order = await _orderRepository.GetByIdAsync(id);

            if (order == null)
            {
                return new ServiceResponse<OrderDto>
                {
                    Success = false,
                    Message = "Order not found."
                };
            }

            order.UpdatedUser = _currentUserService.Username ?? "";
            order.UpdatedDate = DateTime.UtcNow;

            var deletedProduct = await _orderRepository.DeleteAsync(order);

            var mappedReturnModel = _mapper.Map<Order, OrderDto>(deletedProduct);

            return new ServiceResponse<OrderDto>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Order deleted (soft delete applied)."
            };
        }

        public async Task<ServiceResponse<IEnumerable<OrderDto>>> GetAll()
        {
            var orders = await _orderRepository.GetAllAsync();

            var mappedReturnModel = _mapper.Map<IEnumerable<Order>, IEnumerable<OrderDto>>(orders);
            return new ServiceResponse<IEnumerable<OrderDto>>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Orders retrieved successfully."
            };
        }

        public async Task<ServiceResponse<OrderDto>> GetById(Guid id)
        {
            if (id == Guid.Empty)
                return new ServiceResponse<OrderDto> { Message = "Invalid Model", Success = false };

            var product = await _orderRepository.GetByIdAsync(id);

            if (product == null)
            {
                return new ServiceResponse<OrderDto>
                {
                    Success = true,
                    Message = "Order not found."
                };
            }

            var mappedReturnModel = _mapper.Map<Order, OrderDto>(product);

            return new ServiceResponse<OrderDto>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Order retrieved successfully."
            };
        }

        public async Task<ServiceResponse<OrderDto>> Update(OrderDto dto)
        {
            if (dto == null)
                return new ServiceResponse<OrderDto> { Message = "Invalid Model", Success = false };

            var order = await _orderRepository.GetByIdAsync(dto.Id);

            if (order == null)
            {
                return new ServiceResponse<OrderDto>
                {
                    Success = false,
                    Message = "Order not found."
                };
            }

            if (!dto.BillId.Equals(Guid.Empty))
                order.BillId = dto.BillId;
            if (!dto.ProductId.Equals(Guid.Empty))
                order.ProductId = dto.ProductId;
            if (!dto.Quantity.Equals(order.Quantity))
                order.Quantity = dto.Quantity;

            order.UpdatedDate = DateTime.UtcNow;
            order.UpdatedUser = _currentUserService.Username ?? "";

            var updatedOrder = await _orderRepository.UpdateAsync(order);

            var mappedReturnModel = _mapper.Map<Order, OrderDto>(updatedOrder);

            return new ServiceResponse<OrderDto>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Order updated successfully."
            };
        }
    }
}
