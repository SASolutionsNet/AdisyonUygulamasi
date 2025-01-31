using BillApp.Application.Interfaces.IRepositories;
using BillApp.Domain.RevokedToken;
using BillApp.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BillApp.Infrastructure.Repositories
{
    public class TokenRepository : ITokenRepository
    {
        private readonly ApplicationDbContext _context;

        public TokenRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> RevokeToken(string userId, string token)
        {
            var revokedToken = new RevokedToken
            {
                UserId = userId,
                Token = token
            };

            _context.RevokedTokens.Add(revokedToken);

            var result = await _context.SaveChangesAsync();

            if (result == 1)
                return true;
            return false;
        }

        public async Task<bool> IsTokenRevoked(string token)
        {

            return await _context.RevokedTokens.AnyAsync(rt => rt.Token == token);
        }
    }
}
