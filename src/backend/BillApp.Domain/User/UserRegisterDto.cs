using System.ComponentModel.DataAnnotations;

namespace BillApp.Domain.User
{
    public class UserRegisterDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }
    }
}
