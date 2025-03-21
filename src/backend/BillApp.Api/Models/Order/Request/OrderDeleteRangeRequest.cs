namespace BillApp.Api.Models.Order.Request
{
    public class OrderDeleteRangeRequest
    {
        public Guid BillId { get; set; }
        public List<Guid> ProductIdList { get; set; }
    }
}
