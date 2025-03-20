using BillApp.Application.Contracts.Order;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace BillApp.Api.Hubs
{
    public class SalesHub : Hub
    {
        public async Task SendOrderUpdate(string orderJson)
        {
            // Bağlı olan tüm istemcilere sipariş güncellemesini gönder
            await Clients.All.SendAsync("ReceiveOrderUpdate", orderJson);
        }
    }
}
