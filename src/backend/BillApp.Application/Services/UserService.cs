using AutoMapper;
using BillApp.Application.Contracts.User;
using BillApp.Application.Interfaces.Repositories;
using BillApp.Application.Interfaces.Services;
using BillApp.Application.Models.User;
using BillApp.Application.Utilities;
using BillApp.Domain.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.Dynamic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;

        public UserService(IUserRepository repository, IConfiguration configuration, IMapper mapper, ITokenService tokenService)
        {
            _repository = repository;
            _tokenService = tokenService;
            _configuration = configuration;
            _mapper = mapper;
        }

        public async Task<IdentityResult> RegisterAsync(UserRegisterDto dto)
        {
            var emailAddressValid = new EmailAddressAttribute();
            if (!emailAddressValid.IsValid(dto.Email))
            {
                return IdentityResult.Failed(new IdentityError
                {
                    Code = "InvalidEmail",
                    Description = "Email format is invalid"
                });
            }

            if (await _repository.GetUserByEmailAsync(dto.Email) != null)
            {
                return IdentityResult.Failed(new IdentityError
                {
                    Code = "EmailConflict",
                    Description = "Email is already taken."
                });
            }

            var user = new User
            {
                UserName = dto.UserName,
                Email = dto.Email,
            };

            return await _repository.CreateUserAsync(user, dto.Password);


        }

        public async Task<ServiceResponse<string>> LoginAsync(UserLoginDto dto)
        {
            var user = await _repository.GetUserByEmailAsync(dto.Email);

            if (user == null || !await _repository.CheckUserPasswordAsync(user, dto.Password))
            {
                return new ServiceResponse<string> { Message = "Invalid password or email.", Success = false };

            }
            var tokenResult = _tokenService.GenerateToken(user, new List<string> { }); // in the empty list there will be user roles

            if (tokenResult.Success)
                return new ServiceResponse<string> { Data = tokenResult.Data, Message = "Login is succesfull.", Success = true };

            return new ServiceResponse<string> { Message = "Error occured while login", Success = false };
        }

        public async Task<ServiceResponse<bool>> LogoutAsync(UserLogoutDto dto)
        {
            var isTokenRevoked = await _tokenService.IsTokenRevoked(dto.Token);

            if (isTokenRevoked.Data)
                return new ServiceResponse<bool> { Message = isTokenRevoked.Message, Success = false };

            var result = await _repository.LogoutUserAsync(dto.UserId, dto.Token);

            return new ServiceResponse<bool> { Data = result, Message = "Logged out succesfullt", Success = true };
        }

        //Won't be used until smtp server included
        public async Task<IdentityResult> ResetPasswordAsync(string email, string newPassword, string token)
        {
            var user = await _repository.GetUserByEmailAsync(email);
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "User not found" });
            }

            var result = await _repository.ResetUserPasswordAsync(user, token, newPassword);
            return result;
        }

        //Won't be used until smtp server included
        public async Task<string> GenerateResetPasswordTokenAsync(string email)
        {
            var user = await _repository.GetUserByEmailAsync(email);
            if (user == null)
            {
                return "User not found.";
            }

            var token = await _repository.GenerateUserPasswordResetTokenAsync(user);
            return token;
        }

        public async Task<IdentityResult> ChangePasswordAsync(UserChangePasswordDto dto)
        {
            var user = await _repository.GetUserByEmailAsync(dto.Email);
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Code = "UserNotExists", Description = "User not found" });
            }

            var result = await _repository.ChangeUserPasswordAsync(user, dto.OldPassword, dto.NewPassword);
            return result;
        }

        //Won't be used until smtp server included
        public async Task<string> GenerateEmailConfirmationTokenAsync(string userId)
        {
            var user = await _repository.GetUserByEmailAsync(userId);
            if (user == null)
            {
                return null; // Or handle error
            }

            var token = await _repository.GenerateUserEmailConfirmationTokenAsync(user);
            return token;
        }

        //Won't be used until smtp server included
        public async Task<IdentityResult> ConfirmEmailAsync(UserConfirmEmailDto dto)
        {
            var user = await _repository.GetUserByEmailAsync(dto.UserId);
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Code = "UserNotExists", Description = "User not found" });
            }

            var result = await _repository.ConfirmUserEmailAsync(user, dto.Token);
            return result;
        }

        public async Task<ServiceResponse<UserDto>> GetUserById(string id)
        {
            var user = await _repository.GetUserByIdAsync(id);

            if (user == null)
            {
                return new ServiceResponse<UserDto> { Message = "User not found", Success = false };
            }

            var mappedUser = _mapper.Map<UserDto>(user);
            return new ServiceResponse<UserDto> { Data = mappedUser, Message = "User found", Success = false };
        }

    }
}

