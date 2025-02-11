using AutoMapper;
using BillApp.Api.Models.Category.Request;
using BillApp.Api.Models.Category.Response;
using BillApp.Application.Interfaces.IServices;
using BillApp.Application.Models.Category;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BillApp.Api
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryService categoryService, IMapper mapper)
        {
            _categoryService = categoryService;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _categoryService.GetAll();

            if (result.Success)
            {
                if (result.Data == null)
                    return NotFound("Categories not found.");

                return Ok(result.Data);
            }
            else
                return StatusCode(500, "Request Failed");
        }

        [Authorize]
        [HttpGet("get-by-id")]
        public async Task<IActionResult> GetById([FromQuery] Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _categoryService.GetById(id);


            if (result.Success)
            {
                if (result.Data == null)
                    return NotFound("Category not found.");

                var mappedResult = _mapper.Map<CategoryDto, CategoryResponse>(result.Data);
                return Ok(mappedResult);
            }

            return StatusCode(500, "Request Failed");

        }

        [HttpPost("create")]
        //[Authorize(Roles = "Admin")] 
        [Authorize()]
        public async Task<IActionResult> Create([FromBody] CategoryCreateRequest model)
        {
            if (!ModelState.IsValid || model == null)
                return BadRequest(ModelState);

            var mappedModel = _mapper.Map<CategoryCreateRequest, CategoryDto>(model);

            var result = await _categoryService.Create(mappedModel);

            if (result.Success)
            {
                var mappedResult = _mapper.Map<CategoryDto, CategoryResponse>(result.Data);
                return Ok(mappedResult);
            }
            return StatusCode(500, "Request Failed");
        }

        [HttpPut("update")]
        [Authorize()]
        public async Task<IActionResult> Update([FromBody] CategoryUpdateRequest model)
        {
            if (!ModelState.IsValid || model == null)
                return BadRequest(ModelState);

            var mappedModel = _mapper.Map<CategoryUpdateRequest, CategoryDto>(model);

            var result = await _categoryService.Update(mappedModel);

            if (result.Success)
            {
                var mappedResult = _mapper.Map<CategoryDto, CategoryResponse>(result.Data);
                return Ok(mappedResult);
            }

            return StatusCode(500, "Request Failed");
        }

        [HttpDelete("delete")]
        [Authorize()]
        public async Task<IActionResult> Delete([FromBody] CategoryGetByIdAndDeleteRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _categoryService.Delete(model.Id);

            if (result.Success)
            {
                if (result.Data == null)
                    return NotFound("Category not found.");

                var mappedResult = _mapper.Map<CategoryDto, CategoryResponse>(result.Data);
                return Ok(mappedResult);
            }

            return StatusCode(500, "Request Failed");

        }
    }
}
