namespace BillApp.Domain.Product
{
    public class Product : BaseModel
    {
        public required string Name { get; set; }
        public required Guid CategoryId { get; set; }
        public Domain.Category.Category Category { get; set; }
        public float Price { get; set; }
    }
}
