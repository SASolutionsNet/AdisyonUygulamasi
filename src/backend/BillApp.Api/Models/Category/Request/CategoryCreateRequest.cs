namespace BillApp.Api.Models.Category.Request
{
    public class CategoryCreateRequest
    {
        public required string Name { get; set; }
        public required string CategoryCode { get; set; }
    }
}
