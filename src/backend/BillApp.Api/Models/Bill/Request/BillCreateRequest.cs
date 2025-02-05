namespace BillApp.Api.Models.Bill.Request
{
    public class BillCreateRequest
    {
        public string Table { get; set; }
        public float TotalPrice { get; set; }

    }
}
