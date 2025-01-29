using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BillApp.Application.Models.User;
using BillApp.Application.Contracts.User;
using BillApp.Application.Utilities;

namespace BillApp.Application.Interfaces.Services
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
