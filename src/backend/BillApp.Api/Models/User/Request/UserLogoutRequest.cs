namespace BillApp.Api.Models.User.Request
{
    public class UserLogoutRequest
    {
        public required string UserId { get; set; }
        public required string Token { get; set; }
    }
}
