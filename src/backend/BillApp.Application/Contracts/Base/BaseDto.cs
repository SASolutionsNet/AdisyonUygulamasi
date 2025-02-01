using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Application.Models.Base
{
    public class BaseDto
    {
        public Guid Id { get; set; }
        public string CreatedUser { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public string? UpdatedUser { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsDel { get; set; } = false;
    }
}
