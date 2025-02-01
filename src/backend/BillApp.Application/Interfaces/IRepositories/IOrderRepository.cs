using BillApp.Domain.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Application.Interfaces.IRepositories
{
    public interface IOrderRepository : IApplicationRepository<Order>
    {
    }
}
