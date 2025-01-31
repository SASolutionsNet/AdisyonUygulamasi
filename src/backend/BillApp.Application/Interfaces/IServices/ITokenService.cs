using BillApp.Application.Utilities;
using BillApp.Domain.User;

namespace BillApp.Application.Interfaces.IServices
{
    public interface ITokenService
    {
        ServiceResponse<string> GenerateToken(User user, IList<string> roles);
        Task<ServiceResponse<bool>> RevokeToken(string token, string userId);
        Task<ServiceResponse<bool>> IsTokenRevoked(string token);
    }

}
