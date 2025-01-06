using BussinesApplication.WebAPI.Bussines.Services.Abstract;
using BussinesApplication.WebAPI.Bussines.Services.Concrete;
using BussinesApplication.WebAPI.Entities.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BussinesApplication.WebAPI.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IBaseService<Post> _service;

        public PostController(IBaseService<Post> service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var post = await _service.GetByIdAsync(id);
            if (post == null)
            {
                return NotFound("Post not found.");
            }
            return Ok(post);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var posts = await _service.GetAllAsync();
            return Ok(posts);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Post post)
        {
            if (post == null)
            {
                return BadRequest("Post data cannot be null.");
            }

            await _service.AddAsync(post);
            return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var post = await _service.GetByIdAsync(id);
            if (post == null)
            {
                return NotFound("Post not found.");
            }

            bool deleted = await _service.DeleteAsync(id);
            if (!deleted)
            {
                return BadRequest("Failed to delete the post.");
            }

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Post post)
        {
            if (post == null)
            {
                return BadRequest("Post data cannot be null.");
            }

            var existingPost = await _service.GetByIdAsync(id);
            if (existingPost == null)
            {
                return NotFound("Post not found.");
            }

            // Güncelleme işlemi
            existingPost.Title = post.Title;
            existingPost.ImgURL = post.ImgURL;
            existingPost.Text = post.Text;

            await _service.UpdateAsync(existingPost);
            return Ok(existingPost);
        }
    }

}
