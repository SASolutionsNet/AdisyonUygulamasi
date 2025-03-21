using AutoMapper;
using BillApp.Api.Models.Order.Request;
using BillApp.Api.Models.Order.Response;
using BillApp.Application.Contracts.Order;
using BillApp.Application.Interfaces.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BillApp.Api
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrderController : ControllerBase
    {

        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrderController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _orderService.GetAll();

            if (result.Success)
            {
                if (result.Data == null)
                    return NotFound("Orders not found.");

                return Ok(result.Data);
            }
            else
                return StatusCode(500, "Request Failed");
        }

        [Authorize]
        [HttpGet("get-by-id")]
        public async Task<IActionResult> GetById([FromBody] OrderGetByIdRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _orderService.GetById(model.Id);


            if (result.Success)
            {
                if (result.Data == null)
                    return NotFound("Order not found.");

                var mappedResult = _mapper.Map<OrderDto, OrderResponse>(result.Data);
                return Ok(mappedResult);
            }

            return StatusCode(500, "Request Failed");

        }

        [HttpPost("create")]
        //[Authorize(Roles = "Admin")] 
        [Authorize()]
        public async Task<IActionResult> Create([FromBody] OrderCreateRequest model)
        {
            if (!ModelState.IsValid || model == null)
                return BadRequest(ModelState);

            var mappedModel = _mapper.Map<OrderCreateRequest, OrderDto>(model);

            var result = await _orderService.Create(mappedModel);

            if (result.Success)
            {
                var mappedResult = _mapper.Map<OrderDto, OrderResponse>(result.Data);
                return Ok(mappedResult);
            }
            return StatusCode(500, "Request Failed");
        }

        [HttpPost("create-range")]
        //[Authorize(Roles = "Admin")] 
        [Authorize()]
        public async Task<IActionResult> CreateRange([FromBody] List<OrderCreateRequest> model)
        {
            if (!ModelState.IsValid || model == null)
                return BadRequest(ModelState);

            var mappedModel = _mapper.Map<List<OrderCreateRequest>, List<OrderDto>>(model);

            var result = await _orderService.CreateRange(mappedModel);

            if (result.Success)
            {
                var mappedResult = _mapper.Map<List<OrderDto>, List<OrderResponse>>(result.Data);
                return Ok(mappedResult);
            }
            return StatusCode(500, "Request Failed");
        }

        [HttpPut("update")]
        [Authorize()]
        public async Task<IActionResult> Update([FromBody] OrderUpdateRequest model)
        {
            if (!ModelState.IsValid || model == null)
                return BadRequest(ModelState);

            var mappedModel = _mapper.Map<OrderUpdateRequest, OrderDto>(model);

            var result = await _orderService.Update(mappedModel);

            if (result.Success)
            {
                var mappedResult = _mapper.Map<OrderDto, OrderResponse>(result.Data);
                return Ok(mappedResult);
            }

            return StatusCode(500, "Request Failed");
        }

        [HttpDelete("delete")]
        [Authorize()]
        public async Task<IActionResult> Delete([FromBody] OrderDeleteRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _orderService.DeleteOrder(model.BillId, model.ProductId);

            if (result.Success)
            {
                var mappedResult = _mapper.Map<OrderDto, OrderResponse>(result.Data);
                return Ok(mappedResult);
            }

            return StatusCode(500, "Request Failed");

        }

        [HttpDelete("delete-range")]
        [Authorize()]
        public async Task<IActionResult> DeleteRange([FromQuery] List<Guid> model)
        {
            if (!ModelState.IsValid && model.Count == 0)
                return BadRequest(ModelState);

            var result = await _orderService.DeleteRangeAsync(model);

            if (result.Success)
            {
                return Ok();
            }

            return StatusCode(500, "Request Failed");

        }

        [HttpGet("get-orders-for-bill")]
        [Authorize()]
        public async Task<IActionResult> GetOrdersForBill([FromQuery] Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _orderService.GetOrdersForBill(id);

            if (result.Success)
            {
                if (result.Data == null)
                    return NotFound("Orders for the bill not found.");

                var mappedResult = _mapper.Map<List<OrderForBillDto>, List<OrderForBillResponse>>(result.Data);
                return Ok(mappedResult);
            }

            return StatusCode(500, "Request Failed");

        }

    }
}
