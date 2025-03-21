namespace BillApp.Api.Models.Order.Response
{
    public class OrderForBillResponse
    {
        public DateTime CreatedDate { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public float Cost { get; set; }
        public Guid ProductId { get; set; }
    }
}
