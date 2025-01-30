namespace BillApp.Application.Interfaces.IRepositories
{
    public interface ITokenRepository
    {
        Task<bool> RevokeToken(string userId, string token);
        Task<bool> IsTokenRevoked(string token);
    }
}
