namespace BillApp.Api.Models.Product.Request
{
    public class ProductUpdateRequest
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public float? Price { get; set; }
        public bool? IsFavorite { get; set; }
        public Guid? CategoryId { get; set; }
    }
}
