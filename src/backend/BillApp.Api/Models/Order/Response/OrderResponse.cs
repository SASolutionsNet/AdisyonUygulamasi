﻿namespace BillApp.Api.Models.Order.Response
{
    public class OrderResponse
    {
        public Guid Id { get; set; }
        public Guid BillId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
