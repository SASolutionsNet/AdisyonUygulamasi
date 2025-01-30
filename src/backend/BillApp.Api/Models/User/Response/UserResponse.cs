using Microsoft.AspNetCore.Identity;

namespace BillApp.Api.Models.User.Response
{
    public class UserResponse
    {
        public string? Role { get; set; }
        public int AppCode { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
    }
}
