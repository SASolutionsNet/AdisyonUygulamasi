using AutoMapper;
using BillApp.Api.Models.Product.Request;
using BillApp.Api.Models.Product.Response;
using BillApp.Application.Contracts.Product;

namespace BillApp.Api.Mappings
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            this.CreateMap<ProductDto, ProductResponse>().ReverseMap();
            this.CreateMap<ProductCreateRequest, ProductDto>().ReverseMap();
            this.CreateMap<ProductUpdateRequest, ProductDto>().ReverseMap();
        }
    }
}
