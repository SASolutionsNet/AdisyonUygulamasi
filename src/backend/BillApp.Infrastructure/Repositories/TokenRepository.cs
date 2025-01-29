using BillApp.Application.Interfaces.Repositories;
using BillApp.Application.Utilities;
using BillApp.Domain.RevokedToken;
using BillApp.Domain.User;
using BillApp.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
