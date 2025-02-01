namespace BillApp.Api.Models.Product.Request
{
    public class ProductCreateRequest
    {
        public string Name { get; set; }
        public float Price { get; set; }
        public Guid CategoryId { get; set; }
    }
}
