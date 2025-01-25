using BillApp.Domain.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BillApp.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(string email, string password, string username)
        {
            // Check if email already exists
            if (await _userManager.FindByEmailAsync(email) != null)
            {
                return BadRequest("Email is already taken.");
            }

            // Check if username already exists
            if (await _userManager.FindByNameAsync(username) != null)
            {
                return BadRequest("Username is already taken.");
            }

            // Create a new user
            var user = new User
            {
                UserName = username,
                Email = email
            };

            var result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                return Ok("User registered successfully.");
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
            {
                return Unauthorized("Invalid login attempt.");
            }

            var token = GenerateJwtToken(user);
            return Ok(new { Token = token });
        }

        /// <summary>
        /// Not working for now, will wait until SMTP configuration
        /// </summary>
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(string email, string newPassword, string token)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var result = await _userManager.ResetPasswordAsync(user, token, newPassword);
            if (result.Succeeded)
            {
                return Ok("Password has been reset.");
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(string email, string currentPassword, string newPassword)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var result = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);
            if (result.Succeeded)
            {
                return Ok("Password has been changed.");
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            _signInManager.SignOutAsync();
            return Ok("Logged out successfully.");
        }

        /// <summary>
        /// Not working for now, will wait until SMTP configuration
        /// </summary>        
        [HttpPost("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string email, string token)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return Ok("Email confirmed successfully.");
            }

            return BadRequest(result.Errors);
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["JwtSettings:Issuer"],
                _configuration["JwtSettings:Audience"],
                claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
