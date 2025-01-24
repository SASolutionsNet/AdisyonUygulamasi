using Microsoft.AspNetCore.Identity;

namespace BillApp.Domain.User
{
    public class User : IdentityUser
    {
        public string? Role { get; set; }
        public int AppCode { get; set; }
    }
}
