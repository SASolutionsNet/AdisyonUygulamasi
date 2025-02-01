using BillApp.Application.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Application.Contracts.Product
{
    public class ProductDto : BaseDto
    {
        public string Name { get; set; }
        public float Price { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
