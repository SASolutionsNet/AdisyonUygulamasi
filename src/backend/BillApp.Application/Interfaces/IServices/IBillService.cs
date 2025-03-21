using BillApp.Application.Contracts.Bill;
using BillApp.Application.Utilities;
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
        Task<ServiceResponse<IEnumerable<BillDto>>> GetAllOpenTables();
        Task<ServiceResponse<IEnumerable<BillDto>>> GetAllClosedTables();
        byte[] GenerateInvoicePdf(BillDto bill);
    }
}
