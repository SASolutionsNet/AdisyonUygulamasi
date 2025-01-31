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
        [Required]
        public Guid Id { get; set; }
        [Required]
        public required string CreatedUser { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public string? UpdatedUser { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsDel { get; set; } = false;
    }
}
