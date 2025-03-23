using AutoMapper;
using BillApp.Api.Models.Order.Request;
using BillApp.Api.Models.Order.Response;
using BillApp.Application.Contracts.Order;

namespace BillApp.Api.Mappings
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            this.CreateMap<OrderDto, OrderResponse>().ReverseMap();
            this.CreateMap<OrderForBillDto, OrderForBillResponse>().ReverseMap();
            this.CreateMap<OrderWithBillDto, OrderWithBillAndProductResponse>().ReverseMap();
            this.CreateMap<OrderCreateRequest, OrderDto>().ReverseMap();
            this.CreateMap<OrderUpdateRequest, OrderDto>().ReverseMap();
        }
    }
}
