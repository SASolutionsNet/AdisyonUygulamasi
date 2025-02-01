using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Domain.Bill
{
    public class Bill : BaseModel
    {
        public string Table { get; set; }
        public bool IsClosed { get; set; }

        public List<Order.Order> Orders { get; set; } = new();
    }
}
