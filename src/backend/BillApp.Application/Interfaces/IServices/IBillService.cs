using BillApp.Application.Contracts.Bill;
using BillApp.Domain.Bill;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Application.Interfaces.IServices
{
    public interface IBillService : IApplicationService<BillDto>
    {
    }
}
