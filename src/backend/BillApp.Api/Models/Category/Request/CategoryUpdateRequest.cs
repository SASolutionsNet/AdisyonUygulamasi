namespace BillApp.Api.Models.Category.Request
{
    public class CategoryUpdateRequest
    {
        public  Guid Id { get; set; }
        public string? Name { get; set; }
        public string? CategoryCode { get; set; }
    }
}
