using BillApp.Application.Interfaces.Repositories;
using BillApp.Application.Interfaces.Services;
using BillApp.Application.Utilities;
using BillApp.Domain.User;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BillApp.Application.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly ITokenRepository _tokenRepository;

        public TokenService(IConfiguration configuration, ITokenRepository tokenRepository)
        {
            _configuration = configuration;
            _tokenRepository = tokenRepository;
        }

        public ServiceResponse<string> GenerateToken(User user, IList<string> roles)
        {
            var claims = new[]
                      {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("Username", user.UserName)

        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["JwtSettings:Issuer"],
                _configuration["JwtSettings:Audience"],
                claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new ServiceResponse<string> { Data = new JwtSecurityTokenHandler().WriteToken(token), Message = "Generate token succesfully.", Success = true };
        }

        public async Task<ServiceResponse<bool>> RevokeToken(string token, string userId)
        {
            var result = await _tokenRepository.RevokeToken(userId, token);

            if (result)
                return new ServiceResponse<bool> { Data = result, Message = "Token revoked succesfully.", Success = true };
            return new ServiceResponse<bool> { Data = result, Message = "Token revoked failed.", Success = false };
        }

        public async Task<ServiceResponse<bool>> IsTokenRevoked(string token)
        {
            var result = await _tokenRepository.IsTokenRevoked(token);

            if (result)
                return new ServiceResponse<bool> { Data = result, Message = "Token is already revoked", Success = true };
            return new ServiceResponse<bool> { Data = result, Message = "Token is not revoked .", Success = true };
        }
    }
}
