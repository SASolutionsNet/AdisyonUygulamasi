using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Application.Contracts.User
{
    public class UserLoginDto
    {
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public required string Email { get; set; }

        public required string Password { get; set; }
    }
}
