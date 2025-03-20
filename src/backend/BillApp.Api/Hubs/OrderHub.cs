using BillApp.Application.Contracts.Order;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace BillApp.Api.Hubs
{
    public class OrderHub : Hub
    {
        public async Task SendOrderUpdate(OrderDto order)
        {
            await Clients.All.SendAsync("ReceiveOrderUpdate", order);
        }
    }
}
