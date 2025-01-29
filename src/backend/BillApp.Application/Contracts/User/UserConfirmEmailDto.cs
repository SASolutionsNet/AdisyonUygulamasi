namespace BillApp.Application.Models.User
{
    public class UserConfirmEmailDto
    {
        public string UserId { get; set; }
        public string Token { get; set; }
    }
}
