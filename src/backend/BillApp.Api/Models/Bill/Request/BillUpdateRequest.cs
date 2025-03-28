﻿namespace BillApp.Api.Models.Bill.Request
{
    public class BillUpdateRequest
    {
        public Guid Id { get; set; }
        public string? Table { get; set; }
        public bool? IsClosed { get; set; }
        public float? TotalPrice { get; set; }
        public float? CashPaidTotalPrice { get; set; }
        public float? CreditCardPaidTotalPrice { get; set; }

    }
}
