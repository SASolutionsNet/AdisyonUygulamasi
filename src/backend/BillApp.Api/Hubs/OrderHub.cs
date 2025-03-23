using Microsoft.AspNetCore.SignalR;

namespace BillApp.Api.Hubs
{
    public class OrderHub : Hub
    {
        public async Task SendOrderUpdate(string tableId)
        {
            // Aynı masayı gören herkese sipariş güncellemesi gönder
            await Clients.All.SendAsync("ReceiveOrderUpdate");
        }
    }
}
