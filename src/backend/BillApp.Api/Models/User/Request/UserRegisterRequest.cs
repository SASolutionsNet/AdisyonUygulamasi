using System.ComponentModel.DataAnnotations;

namespace BillApp.Api.Models.User.Request
{
    public class UserRegisterRequest
    {
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public required string Email { get; set; }
        public required string UserName { get; set; }

        public required string Password { get; set; }
    }
}
