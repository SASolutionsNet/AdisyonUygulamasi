using Microsoft.AspNetCore.Identity;
using BillApp.Application.Models.User;
using BillApp.Application.Contracts.User;
using BillApp.Application.Utilities;

namespace BillApp.Application.Interfaces.IServices
{
    public interface IUserService
    {
        Task<IdentityResult> RegisterAsync(UserRegisterDto dto);
        Task<ServiceResponse<string>> LoginAsync(UserLoginDto dto);
        Task<ServiceResponse<bool>> LogoutAsync(UserLogoutDto dto);
        Task<IdentityResult> ResetPasswordAsync(string email, string newPassword, string token);
        Task<string> GenerateResetPasswordTokenAsync(string email);
        Task<IdentityResult> ChangePasswordAsync(UserChangePasswordDto dto);
        Task<string> GenerateEmailConfirmationTokenAsync(string userId);
        Task<IdentityResult> ConfirmEmailAsync(UserConfirmEmailDto dto);
        Task<ServiceResponse<UserDto>> GetUserById(string id);





    }
}
