namespace BillApp.Api.Models.Product.Response
{
    public class ProductResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid CategoryId { get; set; }
        public float Price { get; set; }
        public bool IsFavorite { get; set; }
    }
}
