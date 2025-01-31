using AutoMapper;
using BillApp.Api.Models.Category.Request;
using BillApp.Api.Models.Category.Response;
using BillApp.Application.Models.Category;

namespace BillApp.Api.Mappings
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            this.CreateMap<CategoryCreateRequest, CategoryDto>().ReverseMap();
            this.CreateMap<CategoryUpdateRequest, CategoryDto>().ReverseMap();
            this.CreateMap<CategoryDto, CategoryResponse>().ReverseMap();
        }
    }
}
