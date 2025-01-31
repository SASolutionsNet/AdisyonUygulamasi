namespace BillApp.Application.Interfaces.IServices
{
    public interface ICurrentUserService
    {
        string? UserId { get; }
        string? Username { get; }
        string? Email { get; }
    }
}
