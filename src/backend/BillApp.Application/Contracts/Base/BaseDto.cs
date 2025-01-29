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
        public string CreatedUser { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public string UpdatedUser { get; set; }
        [Required]
        public DateTime UpdatedDate { get; set; }
        [Required]
        public bool IsDel { get; set; }
    }
}
