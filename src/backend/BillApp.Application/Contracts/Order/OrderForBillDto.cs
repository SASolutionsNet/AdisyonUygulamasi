using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Application.Contracts.Order
{
    public class OrderForBillDto
    {
        public DateTime CreatedDate { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public float Cost { get; set; }
    }
}
