using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Domain.Order
{
    public class Order : BaseModel
    {
        public Guid BillId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }

        public virtual Bill.Bill? Bill { get; set; }
        public virtual Product.Product? Product { get; set; }
    }
}
