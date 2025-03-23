namespace BillApp.Api.Models.Order.Response
{
    public class OrderWithBillAndProductResponse
    {
        public Guid Id { get; set; }
        public string Table { get; set; }
        public Guid BillId { get; set; }
        public int Quantity { get; set; }
        public float Price { get; set; }
        public string ProductName { get; set; }
        public Guid ProductId { get; set; }

    }
}