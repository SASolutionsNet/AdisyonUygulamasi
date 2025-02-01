using System;
using System.ComponentModel.DataAnnotations;

namespace BillApp.Domain
{
    public class BaseModel
    {
        public Guid Id { get; set; }
        public string CreatedUser { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public string? UpdatedUser { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsDel { get; set; } = false;
    }
}

