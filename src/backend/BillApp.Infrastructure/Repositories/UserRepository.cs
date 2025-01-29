using BillApp.Application.Interfaces.Repositories;
using BillApp.Domain.RevokedToken;
using BillApp.Domain.User;
using BillApp.Infrastructure.Contexts;
using Microsoft.AspNetCore.Identity;
using System.Reflection.Metadata.Ecma335;

namespace BillApp.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenRepository _tokenRepository;

        public UserRepository(ApplicationDbContext context, UserManager<User> userManager, SignInManager<User> signInManager, ITokenRepository tokenRepository)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenRepository = tokenRepository;
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<User?> GetUserByIdAsync(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        public async Task<IList<string>> GetUserRolesAsync(User user)
        {
            return await _userManager.GetRolesAsync(user);
        }

        public async Task<IdentityResult> CreateUserAsync(User user, string password)
        {
            return await _userManager.CreateAsync(user, password);
        }

        public async Task<bool> CheckUserPasswordAsync(User user, string password)
        {
            return await _userManager.CheckPasswordAsync(user, password);
        }
        public async Task<IdentityResult> ResetUserPasswordAsync(User user, string token, string newPassword)
        {
            return await _userManager.ResetPasswordAsync(user, token, newPassword);
        }

        public async Task<string> GenerateUserPasswordResetTokenAsync(User user)
        {
            return await _userManager.GeneratePasswordResetTokenAsync(user);
        }

        public async Task<IdentityResult> ChangeUserPasswordAsync(User user, string oldPassword, string newPassword)
        {
            return await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);
        }
        public async Task<string> GenerateUserEmailConfirmationTokenAsync(User user)
        {
            return await _userManager.GenerateEmailConfirmationTokenAsync(user);
        }
        public async Task<IdentityResult> ConfirmUserEmailAsync(User user, string token)
        {
            return await _userManager.ConfirmEmailAsync(user, token);
        }
        public async Task<bool> LogoutUserAsync(string userId, string token)
        {
            return await _tokenRepository.RevokeToken(userId, token);
        }

    }
}
