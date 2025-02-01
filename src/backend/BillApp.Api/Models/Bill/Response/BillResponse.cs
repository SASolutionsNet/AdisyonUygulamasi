namespace BillApp.Api.Models.Bill.Response
{
    public class BillResponse
    {
        public Guid Id { get; set; }
        public string Table { get; set; }
        public bool IsClosed { get; set; }
    }
}
