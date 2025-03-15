using AutoMapper;
using BillApp.Api.Models.Bill.Request;
using BillApp.Api.Models.Bill.Response;
using BillApp.Api.Models.Category.Request;
using BillApp.Api.Models.Category.Response;
using BillApp.Api.Models.Order.Response;
using BillApp.Application.Contracts.Bill;
using BillApp.Application.Contracts.Order;
using BillApp.Application.Models.Category;

namespace BillApp.Api.Mappings
{
    public class BillProfile : Profile
    {
        public BillProfile()
        {
            this.CreateMap<BillCreateRequest, BillDto>().ReverseMap();
            this.CreateMap<BillUpdateRequest, BillDto>().ReverseMap();
            this.CreateMap<BillDto, BillResponse>().ReverseMap();

            CreateMap<BillDto, BillResponse>()
                .ForMember(dest => dest.Orders, opt => opt.MapFrom(src => src.Orders))
                .ReverseMap();

            CreateMap<OrderDto, OrderResponse>()
                .ForMember(dest => dest.Product, opt => opt.MapFrom(src => src.Product))
                .ReverseMap();

        }
    }
}
