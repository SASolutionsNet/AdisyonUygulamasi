namespace BillApp.Api.Models.Order.Request
{
    public class OrderUpdateRequest
    {
        public Guid Id { get; set; }
        public Guid? BillId { get; set; }
        public Guid? ProductId { get; set; }
        public int? Quantity { get; set; }


    }
}
