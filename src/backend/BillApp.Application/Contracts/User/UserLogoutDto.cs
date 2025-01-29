using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Application.Contracts.User
{
    public class UserLogoutDto
    {
        public required string UserId { get; set; }
        public required string Token { get; set; }
    }
}
