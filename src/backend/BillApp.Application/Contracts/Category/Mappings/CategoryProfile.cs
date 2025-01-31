using AutoMapper;
using BillApp.Application.Models.Category;

namespace BillApp.Application.Contracts.Category.Mappings
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            this.CreateMap<Domain.Category.Category, CategoryDto>().ReverseMap();
        }
    }
}
