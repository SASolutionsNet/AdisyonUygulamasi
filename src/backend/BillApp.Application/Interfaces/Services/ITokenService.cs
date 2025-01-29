using BillApp.Application.Utilities;
using BillApp.Domain.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Application.Interfaces.Services
{
    public interface ITokenService
    {
        ServiceResponse<string> GenerateToken(User user, IList<string> roles);
        Task<ServiceResponse<bool>> RevokeToken(string token, string userId);
        Task<ServiceResponse<bool>> IsTokenRevoked(string token);
    }

}
