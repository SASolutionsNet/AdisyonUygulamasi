namespace BillApp.Api.Models.Category.Request
{
    public class CategoryUpdateRequest
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public required string CategoryCode { get; set; }
    }
}
