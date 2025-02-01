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
    }
}
