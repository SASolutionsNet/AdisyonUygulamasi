using Microsoft.AspNetCore.Identity;


namespace BillApp.Application.Contracts.User
{
    public class UserDto : IdentityUser
    {
        public string? Role { get; set; }
        public int AppCode { get; set; }
    }
}
