using AutoMapper;
using BillApp.Api.Models.Bill.Request;
using BillApp.Api.Models.Bill.Response;
using BillApp.Application.Contracts.Bill;
using BillApp.Application.Interfaces.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BillApp.Api
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BillController : ControllerBase
    {
        private readonly IBillService _billService;
        private readonly IMapper _mapper;

        public BillController(IBillService billService, IMapper mapper)
        {
            _billService = billService;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _billService.GetAll();

            if (result.Success)
            {
                if (result.Data == null)
                    return NotFound("Bills not found.");

                return Ok(result.Data);
            }
            else
                return StatusCode(500, "Request Failed");
        }

        [Authorize]
        [HttpGet("get-by-id")]
        public async Task<IActionResult> GetById([FromBody] BillGetByIdAndDeleteRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _billService.GetById(model.Id);


            if (result.Success)
            {
                if (result.Data == null)
                    return NotFound("Bill not found.");

                var mappedResult = _mapper.Map<BillDto, BillResponse>(result.Data);
                return Ok(mappedResult);
            }

            return StatusCode(500, "Request Failed");

        }

        [HttpPost("create")]
        //[Authorize(Roles = "Admin")] 
        [Authorize()]
        public async Task<IActionResult> Create([FromBody] BillCreateRequest model)
        {
            if (!ModelState.IsValid || model == null)
                return BadRequest(ModelState);

            var mappedModel = _mapper.Map<BillCreateRequest, BillDto>(model);

            var result = await _billService.Create(mappedModel);

            if (result.Success)
            {
                var mappedResult = _mapper.Map<BillDto, BillResponse>(result.Data);
                return Ok(mappedResult);
            }
            return StatusCode(500, "Request Failed");
        }

        [HttpPut("update")]
        [Authorize()]
        public async Task<IActionResult> Update([FromBody] BillUpdateRequest model)
        {
            if (!ModelState.IsValid || model == null)
                return BadRequest(ModelState);

            var mappedModel = _mapper.Map<BillUpdateRequest, BillDto>(model);

            var result = await _billService.Update(mappedModel);

            if (result.Success)
            {
                var mappedResult = _mapper.Map<BillDto, BillResponse>(result.Data);
                return Ok(mappedResult);
            }

            return StatusCode(500, "Request Failed");
        }

        [HttpDelete("delete")]
        [Authorize()]
        public async Task<IActionResult> Delete([FromBody] BillGetByIdAndDeleteRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _billService.Delete(model.Id);

            if (result.Success)
            {
                if (result.Data == null)
                    return NotFound("Bill not found.");

                var mappedResult = _mapper.Map<BillDto, BillResponse>(result.Data);
                return Ok(mappedResult);
            }

            return StatusCode(500, "Request Failed");

        }


    }
}
