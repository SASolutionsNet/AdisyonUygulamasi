using AutoMapper;
using BillApp.Application.Contracts.Order;
using BillApp.Application.Interfaces.IRepositories;
using BillApp.Application.Interfaces.IServices;
using BillApp.Application.Utilities;
using BillApp.Domain.Order;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System.Collections.Concurrent;

namespace BillApp.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IBillService _billService;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;
        private readonly IMemoryCache _cache;
        private const string CacheKey = "Orders";

        public OrderService(IOrderRepository orderRepository, IBillService billService, ICurrentUserService currentUserService, IMapper mapper, IMemoryCache cache)
        {
            _orderRepository = orderRepository;
            _billService = billService;
            _currentUserService = currentUserService;
            _mapper = mapper;
            _cache = cache;
        }

        private async Task<bool> UpdateTotalPriceForBill(Guid billId)
        {
            var billResult = await _billService.GetById(billId);
            if (!billResult.Success || billResult.Data == null)
            {
                return false;
            }

            var ordersForBill = await _orderRepository.GetQueryable()
                .Where(o => o.BillId == billId)
                .Include(o => o.Product)
                .ToListAsync();

            float totalPrice = ordersForBill.Sum(order => order.Quantity * order.Product.Price);

            billResult.Data.TotalPrice = totalPrice;

            var updateResult = await _billService.Update(billResult.Data);

            return updateResult.Success;
        }


        public async Task<ServiceResponse<OrderDto>> Create(OrderDto dto)
        {
            if (dto == null)
            {
                return new ServiceResponse<OrderDto>
                {
                    Data = null,
                    Message = "Invalid Model",
                    Success = false
                };
            }


            var newOrder = _mapper.Map<Order>(dto);
            newOrder.CreatedUser = _currentUserService.Username ?? string.Empty;

            var createdOrder = await _orderRepository.CreateAsync(newOrder);
            var mappedReturnModel = _mapper.Map<OrderDto>(createdOrder);
            return new ServiceResponse<OrderDto>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Order created successfully."
            };
        }

        private List<OrderDto> ArrangeMultipleProductInOrder(IEnumerable<OrderDto> orders)
        {
            return orders
            .GroupBy(o => o.ProductId)
            .Select(g => new OrderDto { ProductId = g.Key, Quantity = g.Sum(o => o.Quantity), BillId = g.First().BillId })
            .ToList();
        }

        public async Task<ServiceResponse<List<OrderDto>>> CreateRange(IEnumerable<OrderDto> dtos)
        {

            if (dtos == null)
            {
                return new ServiceResponse<List<OrderDto>>
                {
                    Data = null,
                    Message = "Invalid Model",
                    Success = false
                };
            }
            dtos = ArrangeMultipleProductInOrder(dtos);

            var newOrdersList = _mapper.Map<List<Order>>(dtos);

            newOrdersList.ForEach(x => x.CreatedUser = _currentUserService.Username ?? string.Empty);

            var createdOrders = await _orderRepository.CreateRangeAsync(newOrdersList);

            var mappedReturnModel = _mapper.Map<List<OrderDto>>(createdOrders);


            return new ServiceResponse<List<OrderDto>>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Orders created successfully."
            };
        }

        public async Task<ServiceResponse<OrderDto>> Delete(Guid id)
        {
            if (id == Guid.Empty)
            {
                return new ServiceResponse<OrderDto>
                {
                    Message = "Invalid Model",
                    Success = false
                };
            }

            var order = await _orderRepository.GetByIdAsync(id);
            if (order == null)
            {
                return new ServiceResponse<OrderDto>
                {
                    Success = false,
                    Message = "Order not found."
                };
            }

            // Set audit fields
            order.UpdatedUser = _currentUserService.Username ?? "";
            order.UpdatedDate = DateTime.UtcNow;

            // Scenario 1: If the order quantity is 1, soft-delete the order.
            if (order.Quantity <= 1)
            {
                var deletedOrder = await _orderRepository.DeleteAsync(order);

                bool totalPriceUpdated = await UpdateTotalPriceForBill(order.BillId);
                if (!totalPriceUpdated)
                {
                    // Rollback soft delete by marking the order as not deleted.
                    deletedOrder.IsDel = false;
                    deletedOrder.UpdatedUser = _currentUserService.Username ?? "";
                    deletedOrder.UpdatedDate = DateTime.UtcNow;

                    var rollbackResult = await _orderRepository.UpdateAsync(deletedOrder);
                    if (rollbackResult == null)
                    {
                        return new ServiceResponse<OrderDto>
                        {
                            Data = _mapper.Map<OrderDto>(deletedOrder),
                            Success = false,
                            Message = "Rollback failed: Unable to restore order after bill update failure."
                        };
                    }

                    return new ServiceResponse<OrderDto>
                    {
                        Data = _mapper.Map<OrderDto>(deletedOrder),
                        Success = false,
                        Message = "Order delete rolled back due to failure updating bill total price."
                    };
                }

                var mappedReturnModel = _mapper.Map<OrderDto>(deletedOrder);
                return new ServiceResponse<OrderDto>
                {
                    Data = mappedReturnModel,
                    Success = true,
                    Message = "Order deleted (soft delete applied) and bill total updated successfully."
                };
            }
            else // Scenario 2: If the order's quantity is more than 1, decrease the quantity by one.
            {
                // Save the original quantity in case rollback is needed.
                int originalQuantity = order.Quantity;
                order.Quantity = originalQuantity - 1;
                order.UpdatedUser = _currentUserService.Username ?? "";
                order.UpdatedDate = DateTime.UtcNow;

                var updatedOrder = await _orderRepository.UpdateAsync(order);

                bool totalPriceUpdated = await UpdateTotalPriceForBill(order.BillId);
                if (!totalPriceUpdated)
                {
                    // Rollback the quantity update if the bill update fails.
                    order.Quantity = originalQuantity;
                    order.UpdatedUser = _currentUserService.Username ?? "";
                    order.UpdatedDate = DateTime.UtcNow;

                    var rollbackResult = await _orderRepository.UpdateAsync(order);
                    if (rollbackResult == null)
                    {
                        return new ServiceResponse<OrderDto>
                        {
                            Data = _mapper.Map<OrderDto>(order),
                            Success = false,
                            Message = "Rollback failed: Unable to restore order after bill update failure."
                        };
                    }

                    return new ServiceResponse<OrderDto>
                    {
                        Data = _mapper.Map<OrderDto>(order),
                        Success = false,
                        Message = "Order update rolled back due to failure updating bill total price."
                    };
                }

                var mappedReturnModel = _mapper.Map<OrderDto>(order);
                return new ServiceResponse<OrderDto>
                {
                    Data = mappedReturnModel,
                    Success = true,
                    Message = "Order quantity decreased successfully and bill total updated."
                };
            }
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

        public async Task<ServiceResponse<List<OrderForBillDto>>> GetOrdersForBill(Guid billId)
        {
            var bill = await _billService.GetById(billId);

            if (bill.Data == null)
                return new ServiceResponse<List<OrderForBillDto>> { Message = "Bill not found", Success = false };

            var result = bill.Data.Orders.Select(x => new OrderForBillDto
            {
                CreatedDate = x.CreatedDate,
                ProductName = x.Product != null ? x.Product.Name : "",
                Quantity = x.Quantity,
                Cost = x.Product != null ? x.Quantity * x.Product.Price : 0,
            }).ToList();

            return new ServiceResponse<List<OrderForBillDto>> { Data = result, Message = "Orders found for the bill", Success = true };

        }

        public List<OrderDto> GetOrders(Guid billId)
        {
            var orders = _cache.Get<ConcurrentDictionary<Guid, List<OrderDto>>>(CacheKey);
            if (orders != null && orders.TryGetValue(billId, out var orderList))
            {
                return orderList;
            }
            return new List<OrderDto>();
        }

        public void AddOrder(OrderDto orderDto)
        {
            var orders = _cache.GetOrCreate(CacheKey, entry =>
            {
                entry.SlidingExpiration = TimeSpan.FromHours(2);
                return new ConcurrentDictionary<Guid, List<OrderDto>>();
            });

            if (!orders.ContainsKey(orderDto.BillId))
            {
                orders[orderDto.BillId] = new List<OrderDto>();
            }

            orders[orderDto.BillId].Add(orderDto);
            _cache.Set(CacheKey, orders);
        }
    }
}
