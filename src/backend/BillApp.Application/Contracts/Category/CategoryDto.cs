using BillApp.Application.Models.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Application.Models.Category
{
    public class CategoryDto : BaseDto
    {
        public string CategoryCode { get; set; }
        public string Name { get; set; }
    }
}
