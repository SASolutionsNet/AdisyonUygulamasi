using System.ComponentModel.DataAnnotations;

namespace BillApp.Api.Models.User.Request
{
    public class UserConfirmEmailRequest
    {
        public required string UserId { get; set; }
        public required string Token { get; set; }
    }
}
