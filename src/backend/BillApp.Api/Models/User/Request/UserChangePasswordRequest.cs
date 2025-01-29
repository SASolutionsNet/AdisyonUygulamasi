using System.ComponentModel.DataAnnotations;

namespace BillApp.Api.Models.User.Request
{
    public class UserChangePasswordRequest
    {
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public required string Email { get; set; }
        public required string OldPassword { get; set; }
        public required string NewPassword { get; set; }
    }
}
