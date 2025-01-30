using AutoMapper;
using BillApp.Api.Models.User.Request;
using BillApp.Api.Models.User.Response;
using BillApp.Application.Contracts.User;
using BillApp.Application.Models.User;

namespace BillApp.Api.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            this.CreateMap<UserChangePasswordRequest, UserChangePasswordDto>().ReverseMap();
            this.CreateMap<UserConfirmEmailRequest, UserConfirmEmailDto>().ReverseMap();
            this.CreateMap<UserRegisterRequest, UserRegisterDto>().ReverseMap();
            this.CreateMap<UserLoginRequest, UserLoginDto>().ReverseMap();
            this.CreateMap<UserLogoutDto, UserLogoutDto>().ReverseMap();
            this.CreateMap<UserDto, UserResponse>().ReverseMap();
        }
    }
}
