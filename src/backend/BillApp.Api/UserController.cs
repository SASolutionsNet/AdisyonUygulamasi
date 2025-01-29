using AutoMapper;
using BillApp.Api.Models.User.Request;
using BillApp.Application.Contracts.User;
using BillApp.Application.Interfaces.Services;
using BillApp.Application.Models.User;
using BillApp.Application.Services;
using BillApp.Application.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;


namespace BillApp.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ICurrentUserService _currentUserService;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, ICurrentUserService currentUserService, IMapper mapper, ITokenService tokenService)
        {
            _userService = userService;
            _currentUserService = currentUserService;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        [Authorize]
        [HttpGet("current-user")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var isTokenRevoked = await _tokenService.IsTokenRevoked(token);

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


            if (isTokenRevoked.Data || userId == null)
            {
                return Unauthorized("User is not authenticated.");
            }

            var user = await _userService.GetUserById(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(new
            {
                Username = user.Data.UserName,
                Email = user.Data.Email,
                Role = user.Data.Role
            });
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterRequest request)
        {

            var mappedRequest = _mapper.Map<UserRegisterRequest, UserRegisterDto>(request);

            var result = await _userService.RegisterAsync(mappedRequest);

            if (result.Succeeded)
            {
                return Ok("User registered successfully.");
            }

            return BadRequest(result.Errors);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequest request)
        {
            var mappedRequest = _mapper.Map<UserLoginRequest, UserLoginDto>(request);

            var result = await _userService.LoginAsync(mappedRequest);
            if (string.IsNullOrEmpty(result.Data))
            {
                return Unauthorized(result.Message);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(token) || string.IsNullOrEmpty(userId))
            {
                return BadRequest("Invalid request.");
            }

            var request = new UserLogoutDto { Token = token, UserId = userId };
            var result = await _userService.LogoutAsync(request);

            if (result.Data)
                return Ok(result.Message);
            return BadRequest(result.Message);
        }
        /// <summary>
        /// Not working for now, will wait until SMTP configuration
        /// </summary>   
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            var token = await _userService.GenerateResetPasswordTokenAsync(request.Email);
            if (string.IsNullOrEmpty(token))
            {
                return BadRequest("Invalid email address");
            }

            var result = await _userService.ResetPasswordAsync(request.Email, request.NewPassword, token);
            if (result.Succeeded)
            {
                return Ok("Password reset successful");
            }

            return BadRequest(result.Errors);
        }

        // Change Password
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] UserChangePasswordRequest request)
        {
            var mappedRequest = _mapper.Map<UserChangePasswordRequest, UserChangePasswordDto>(request);

            var result = await _userService.ChangePasswordAsync(mappedRequest);
            if (result.Succeeded)
            {
                return Ok("Password changed successfully");
            }

            return BadRequest(result.Errors);
        }

        /// <summary>
        /// Not working for now, will wait until SMTP configuration
        /// </summary>
        [HttpPost("confirm-email")]
        public async Task<IActionResult> ConfirmEmail([FromBody] UserConfirmEmailRequest request)
        {
            var mappedRequest = _mapper.Map<UserConfirmEmailRequest, UserConfirmEmailDto>(request);

            var result = await _userService.ConfirmEmailAsync(mappedRequest);
            if (result.Succeeded)
            {
                return Ok("Email confirmed successfully");
            }

            return BadRequest(result.Errors);
        }
    }
}
