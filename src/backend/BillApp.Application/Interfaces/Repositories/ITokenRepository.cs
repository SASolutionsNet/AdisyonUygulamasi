using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Application.Interfaces.Repositories
{
    public interface ITokenRepository
    {
        Task<bool> RevokeToken(string userId, string token);
        Task<bool> IsTokenRevoked(string token);
    }
}
