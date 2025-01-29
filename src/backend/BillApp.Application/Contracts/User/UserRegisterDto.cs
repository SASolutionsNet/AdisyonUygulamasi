
using System.ComponentModel.DataAnnotations;

namespace BillApp.Application.Contracts.User
{
    public class UserRegisterDto
    {
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public required string Email { get; set; }
        public required string UserName { get; set; }

        public required string Password { get; set; }
    }
}
