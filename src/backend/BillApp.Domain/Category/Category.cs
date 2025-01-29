using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Domain.Category
{
    public class Category : BaseModel
    {
        [Required]
        public string CategoryCode { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
