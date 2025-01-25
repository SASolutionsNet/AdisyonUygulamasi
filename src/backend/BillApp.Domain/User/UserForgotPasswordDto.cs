using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Domain.User
{
    public class UserForgotPasswordDto
    {
        [Required]
        public string Email { get; set; }

    }
}
