using System.ComponentModel.DataAnnotations;

namespace BillApp.Api.Models.Category.Response
{
    public class CategoryResponse
    {
        public Guid Id { get; set; }
        public string CategoryCode { get; set; }

        public string Name { get; set; }
    }
}
