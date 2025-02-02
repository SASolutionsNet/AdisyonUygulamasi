using AutoMapper;
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
            this.CreateMap<Domain.Bill.Bill, BillDto>().ReverseMap();
        }
    }
}
