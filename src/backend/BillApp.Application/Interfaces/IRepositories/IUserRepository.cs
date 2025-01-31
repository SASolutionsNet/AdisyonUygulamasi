using BillApp.Domain.User;
using Microsoft.AspNetCore.Identity;

namespace BillApp.Application.Interfaces.IRepositories
{
    public interface IUserRepository
    {
        Task<User?> GetUserByEmailAsync(string email);
        Task<User?> GetUserByIdAsync(string id);
        Task<IList<string>> GetUserRolesAsync(User user);
        Task<IdentityResult> CreateUserAsync(User user, string password);
        Task<bool> CheckUserPasswordAsync(User user, string password);
        Task<IdentityResult> ResetUserPasswordAsync(User user, string token, string newPassword);
        Task<string> GenerateUserPasswordResetTokenAsync(User user);
        Task<IdentityResult> ChangeUserPasswordAsync(User user, string oldPassword, string newPassword);
        Task<string> GenerateUserEmailConfirmationTokenAsync(User user);
        Task<IdentityResult> ConfirmUserEmailAsync(User user, string token);
        Task<bool> LogoutUserAsync(string userId, string token);
    }

}
