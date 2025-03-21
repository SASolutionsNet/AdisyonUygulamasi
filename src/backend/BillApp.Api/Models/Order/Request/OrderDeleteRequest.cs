namespace BillApp.Api.Models.Order.Request
{
    public class OrderDeleteRequest
    {
        public Guid ProductId { get; set; }
        public Guid BillId { get; set; }
    }
}
