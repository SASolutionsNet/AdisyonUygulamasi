using AutoMapper;
using BillApp.Application.Contracts.Order;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Application.Contracts.Bill.BillMappings
{
    public class BillProfile : Profile
    {
        public BillProfile()
        {
            CreateMap<Domain.Bill.Bill, BillDto>()
        .ForMember(dest => dest.Orders, opt => opt.MapFrom(src => src.Orders));

            CreateMap<BillDto, Domain.Bill.Bill>()
                        .ForMember(dest => dest.Orders, opt => opt.MapFrom(src => src.Orders));


            CreateMap<Domain.Order.Order, OrderDto>().ReverseMap();

        }
    }
}
