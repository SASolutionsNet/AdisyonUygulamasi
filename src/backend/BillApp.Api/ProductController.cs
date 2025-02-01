using AutoMapper;
using BillApp.Api.Models.Category.Request;
using BillApp.Api.Models.Category.Response;
using BillApp.Api.Models.Product.Request;
using BillApp.Api.Models.Product.Response;
using BillApp.Application.Contracts.Product;
using BillApp.Application.Interfaces.IServices;
using BillApp.Application.Models.Category;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BillApp.Api
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductController(IProductService productService, IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _productService.GetAll();

            if (result.Success)
            {
                if (result.Data == null)
                    return NotFound("Products not found.");

                return Ok(result.Data);
            }
            else
                return StatusCode(500, "Request Failed");
        }

        [Authorize]
        [HttpGet("get-by-id")]
        public async Task<IActionResult> GetById([FromBody] ProductGetByIdAndDeleteRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _productService.GetById(model.Id);


            if (result.Success)
            {
                if (result.Data == null)
                    return NotFound("Product not found.");

                var mappedResult = _mapper.Map<ProductDto, ProductResponse>(result.Data);
                return Ok(mappedResult);
            }

            return StatusCode(500, "Request Failed");

        }

        [HttpPost("create")]
        //[Authorize(Roles = "Admin")] 
        [Authorize()]
        public async Task<IActionResult> Create([FromBody] ProductCreateRequest model)
        {
            if (!ModelState.IsValid || model == null)
                return BadRequest(ModelState);

            var mappedModel = _mapper.Map<ProductCreateRequest, ProductDto>(model);

            var result = await _productService.Create(mappedModel);

            if (result.Success)
            {
                var mappedResult = _mapper.Map<ProductDto, ProductResponse>(result.Data);
                return Ok(mappedResult);
            }
            return StatusCode(500, "Request Failed");
        }

        [HttpPut("update")]
        [Authorize()]
        public async Task<IActionResult> Update([FromBody] ProductUpdateRequest model)
        {
            if (!ModelState.IsValid || model == null)
                return BadRequest(ModelState);

            var mappedModel = _mapper.Map<ProductUpdateRequest, ProductDto>(model);

            var result = await _productService.Update(mappedModel);

            if (result.Success)
            {
                var mappedResult = _mapper.Map<ProductDto, ProductResponse>(result.Data);
                return Ok(mappedResult);
            }

            return StatusCode(500, "Request Failed");
        }

        [HttpDelete("delete")]
        [Authorize()]
        public async Task<IActionResult> Delete([FromBody] ProductGetByIdAndDeleteRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _productService.Delete(model.Id);

            if (result.Success)
            {
                if (result.Data == null)
                    return NotFound("Product not found.");

                var mappedResult = _mapper.Map<ProductDto, ProductResponse>(result.Data);
                return Ok(mappedResult);
            }

            return StatusCode(500, "Request Failed");

        }
    }
}
