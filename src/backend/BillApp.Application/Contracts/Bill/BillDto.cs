using BillApp.Application.Contracts.Order;
using BillApp.Application.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Application.Contracts.Bill
{
    public class BillDto : BaseDto
    {
        public string Table { get; set; }
        public bool IsClosed { get; set; }
        public float TotalPrice { get; set; }
        public float CashPaidTotalPrice { get; set; }
        public float CreditCardPaidTotalPrice { get; set; }
        public List<OrderDto> Orders { get; set; } = new();


    }
}
