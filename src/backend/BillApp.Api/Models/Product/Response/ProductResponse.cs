namespace BillApp.Api.Models.Product.Response
{
    public class ProductResponse
    {
        public string Name { get; set; }
        public Guid CategoryId { get; set; }
        public float Price { get; set; }
    }
}
