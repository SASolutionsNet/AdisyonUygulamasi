namespace BillApp.Api.Models.Order.Request
{
    public class OrderCreateRequest
    {
        public Guid BillId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
