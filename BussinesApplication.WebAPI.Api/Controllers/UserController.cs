using BussinesApplication.WebAPI.Bussines.Services.Abstract;
using BussinesApplication.WebAPI.Entities.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BussinesApplication.WebAPI.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IBaseService<User> _service;

        public UserController(IBaseService<User> service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var user = await _service.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound("Post not found.");
            }
            return Ok(user);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _service.GetAllAsync();
            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User data cannot be null.");
            }

            await _service.AddAsync(user);
            return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var user = await _service.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound("Post not found.");
            }

            bool deleted = await _service.DeleteAsync(id);
            if (!deleted)
            {
                return BadRequest("Failed to delete the user.");
            }

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("Post data cannot be null.");
            }

            var existingUser = await _service.GetByIdAsync(id);
            if (existingUser == null)
            {
                return NotFound("Post not found.");
            }

            // Güncelleme işlemi
            existingUser.FirstName = user.FirstName;
            existingUser.LastName = user.LastName;
            existingUser.ProfilePicURL=user.ProfilePicURL;
            existingUser.Job=user.Job;
            existingUser.Title = user.Title;
            existingUser.Adress = user.Adress;


            existingUser.Email = user.Email;
            existingUser.PhoneNumber = user.PhoneNumber;
            existingUser.PostalCode = user.PostalCode;

            existingUser.Instagram = user.Instagram;
            existingUser.Facebook = user.Facebook;
            existingUser.Linkedln   = user.Linkedln;

            existingUser.GraduatedYear = user.GraduatedYear;
            existingUser.UniversityName = user.UniversityName;

              await _service.UpdateAsync(existingUser);
            return Ok(existingUser);
        }
    }
}
