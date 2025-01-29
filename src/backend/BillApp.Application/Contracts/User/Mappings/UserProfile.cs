using AutoMapper;
using BillApp.Domain.User;
namespace BillApp.Application.Contracts.User.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            this.CreateMap<Domain.User.User, UserDto>().ReverseMap();
        }
    }
}
