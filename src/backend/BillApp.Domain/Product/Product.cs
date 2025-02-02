namespace BillApp.Domain.Product
{
    public class Product : BaseModel
    {
        public string Name { get; set; }
        public float Price { get; set; }
        public bool IsFavorite { get; set; }
        public Guid CategoryId { get; set; }
        public virtual Category.Category? Category { get; set; }
    }
}
