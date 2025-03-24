using BillApp.Api.Models.Order.Response;

namespace BillApp.Api.Models.Bill.Response
{
    public class BillResponse
    {
        public Guid Id { get; set; }
        public string Table { get; set; }
        public bool IsClosed { get; set; }
        public float TotalPrice { get; set; }
        public float CashPaidTotalPrice { get; set; }
        public float CreditCardPaidTotalPrice { get; set; }
        public List<OrderResponse> Orders { get; set; } = new();


    }
}
