using BillApp.Application.Contracts.Product;
using BillApp.Application.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Application.Contracts.Order
{
    public class OrderDto : BaseDto
    {
        public Guid BillId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
